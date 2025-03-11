import { AccelerometerProcessor } from './accelerometer';
import { StepDetector } from './stepDetector';
import { PedometerConfig, PedometerCallbacks, StepData } from './types';

export class Pedometer {
  private static instance: Pedometer;
  private isTracking: boolean = false;
  private stepCount: number = 0;
  private lastUpdate: number = 0;
  private accelerometerProcessor: AccelerometerProcessor;
  private stepDetector: StepDetector;
  private callbacks: PedometerCallbacks = {};

  private readonly defaultConfig: PedometerConfig = {
    sampleRate: 100,
    threshold: 1.2,
    timeThreshold: 250,
    confidenceThreshold: 0.6
  };

  private constructor(config?: Partial<PedometerConfig>) {
    this.accelerometerProcessor = new AccelerometerProcessor();
    this.stepDetector = new StepDetector({
      ...this.defaultConfig,
      ...config
    });
    this.handleMotion = this.handleMotion.bind(this);
  }

  static getInstance(config?: Partial<PedometerConfig>): Pedometer {
    if (!Pedometer.instance) {
      Pedometer.instance = new Pedometer(config);
    }
    return Pedometer.instance;
  }

  start(callbacks: PedometerCallbacks): Promise<void> {
    this.callbacks = callbacks;
    
    return new Promise((resolve, reject) => {
      if (typeof DeviceMotionEvent !== 'undefined' && 
          typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        // iOS 13+ requires permission
        (DeviceMotionEvent as any).requestPermission()
          .then((response: string) => {
            if (response === 'granted') {
              this.startTracking();
              resolve();
            } else {
              reject(new Error('Motion sensor permission denied'));
            }
          })
          .catch(reject);
      } else {
        // Non-iOS devices
        this.startTracking();
        resolve();
      }
    });
  }

  private startTracking(): void {
    window.addEventListener('devicemotion', this.handleMotion);
    this.isTracking = true;
    this.callbacks.onStateChange?.(true);
  }

  stop(): void {
    window.removeEventListener('devicemotion', this.handleMotion);
    this.isTracking = false;
    this.callbacks.onStateChange?.(false);
  }

  reset(): void {
    this.stepCount = 0;
    this.callbacks.onStep?.({
      timestamp: Date.now(),
      steps: 0,
      confidence: 1
    });
  }

  getSteps(): number {
    return this.stepCount;
  }

  private handleMotion(event: DeviceMotionEvent): void {
    try {
      const currentTime = Date.now();
      if (currentTime - this.lastUpdate < this.defaultConfig.sampleRate) {
        return;
      }
      this.lastUpdate = currentTime;

      const accelerometerData = this.accelerometerProcessor.process(
        event.accelerationIncludingGravity!
      );

      if (!accelerometerData) return;

      const stepData = this.stepDetector.detect(accelerometerData);
      
      if (stepData) {
        this.stepCount += stepData.steps;
        this.callbacks.onStep?.({
          ...stepData,
          steps: this.stepCount
        });
      }
    } catch (error) {
      this.callbacks.onError?.(error as Error);
    }
  }
}