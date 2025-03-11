export interface StepData {
  timestamp: number;
  steps: number;
  confidence: number;
}

export interface AccelerometerData {
  x: number;
  y: number;
  z: number;
  magnitude: number;
}

export interface PedometerConfig {
  sampleRate: number;        // How often to sample (ms)
  threshold: number;         // Minimum acceleration for step
  timeThreshold: number;     // Minimum time between steps (ms)
  confidenceThreshold: number; // Minimum confidence for step detection
}

export interface PedometerCallbacks {
  onStep?: (stepData: StepData) => void;
  onError?: (error: Error) => void;
  onStateChange?: (isTracking: boolean) => void;
}