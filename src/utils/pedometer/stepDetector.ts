import { AccelerometerData, PedometerConfig, StepData } from './types';

export class StepDetector {
  private lastStepTime: number = 0;
  private peakDetected: boolean = false;
  private valleyDetected: boolean = false;
  private lastPeakValue: number = 0;
  private lastValleyValue: number = 0;

  constructor(private config: PedometerConfig) {}

  detect(data: AccelerometerData): StepData | null {
    const currentTime = Date.now();
    const timeSinceLastStep = currentTime - this.lastStepTime;

    if (timeSinceLastStep < this.config.timeThreshold) {
      return null;
    }

    // Peak detection
    if (data.magnitude > this.lastPeakValue) {
      this.lastPeakValue = data.magnitude;
      this.peakDetected = true;
    }

    // Valley detection
    if (data.magnitude < this.lastValleyValue) {
      this.lastValleyValue = data.magnitude;
      this.valleyDetected = true;
    }

    // Step detection
    if (this.peakDetected && this.valleyDetected) {
      const stepMagnitude = this.lastPeakValue - this.lastValleyValue;
      
      if (stepMagnitude > this.config.threshold) {
        const confidence = this.calculateConfidence(stepMagnitude);
        
        if (confidence >= this.config.confidenceThreshold) {
          this.lastStepTime = currentTime;
          this.resetDetection();
          
          return {
            timestamp: currentTime,
            steps: 1,
            confidence
          };
        }
      }
    }

    return null;
  }

  private calculateConfidence(magnitude: number): number {
    // Normalize confidence between 0 and 1
    const minMagnitude = this.config.threshold;
    const maxMagnitude = this.config.threshold * 2;
    
    return Math.min(Math.max(
      (magnitude - minMagnitude) / (maxMagnitude - minMagnitude),
      0
    ), 1);
  }

  private resetDetection(): void {
    this.peakDetected = false;
    this.valleyDetected = false;
    this.lastPeakValue = 0;
    this.lastValleyValue = Infinity;
  }
}