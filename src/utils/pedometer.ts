export class Pedometer {
  private static instance: Pedometer;
  private stepCount: number = 0;
  private accelerometer: DeviceMotionEventAcceleration | null = null;
  private lastUpdate: number = 0;
  private threshold: number = 10; // Sensitivity threshold
  private onStepCallback: ((steps: number) => void) | null = null;

  private constructor() {
    this.handleMotion = this.handleMotion.bind(this);
  }

  static getInstance(): Pedometer {
    if (!Pedometer.instance) {
      Pedometer.instance = new Pedometer();
    }
    return Pedometer.instance;
  }

  start(callback: (steps: number) => void): Promise<void> {
    this.onStepCallback = callback;
    
    return new Promise((resolve, reject) => {
      if (typeof DeviceMotionEvent !== 'undefined' && 
          typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        // iOS 13+ requires permission
        (DeviceMotionEvent as any).requestPermission()
          .then((response: string) => {
            if (response === 'granted') {
              window.addEventListener('devicemotion', this.handleMotion);
              resolve();
            } else {
              reject(new Error('Permission denied'));
            }
          })
          .catch(reject);
      } else {
        // Non-iOS devices
        window.addEventListener('devicemotion', this.handleMotion);
        resolve();
      }
    });
  }

  stop(): void {
    window.removeEventListener('devicemotion', this.handleMotion);
    this.onStepCallback = null;
  }

  getSteps(): number {
    return this.stepCount;
  }

  reset(): void {
    this.stepCount = 0;
    if (this.onStepCallback) {
      this.onStepCallback(this.stepCount);
    }
  }

  private handleMotion(event: DeviceMotionEvent): void {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - this.lastUpdate;

    if (timeDiff > 100) { // Update every 100ms
      this.lastUpdate = currentTime;
      const acceleration = event.accelerationIncludingGravity;

      if (!acceleration) return;

      if (!this.accelerometer) {
        this.accelerometer = acceleration;
        return;
      }

      const deltaX = Math.abs(this.accelerometer.x! - acceleration.x!);
      const deltaY = Math.abs(this.accelerometer.y! - acceleration.y!);
      const deltaZ = Math.abs(this.accelerometer.z! - acceleration.z!);

      if ((deltaX + deltaY + deltaZ) > this.threshold) {
        this.stepCount++;
        if (this.onStepCallback) {
          this.onStepCallback(this.stepCount);
        }
      }

      this.accelerometer = acceleration;
    }
  }
}