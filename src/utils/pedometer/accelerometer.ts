import { AccelerometerData } from './types';

export class AccelerometerProcessor {
  private static readonly GRAVITY = 9.81;
  private readonly windowSize = 10;
  private readonly samples: AccelerometerData[] = [];

  process(acceleration: DeviceMotionEventAcceleration): AccelerometerData | null {
    if (!acceleration?.x || !acceleration?.y || !acceleration?.z) {
      return null;
    }

    const data: AccelerometerData = {
      x: acceleration.x / this.GRAVITY,
      y: acceleration.y / this.GRAVITY,
      z: acceleration.z / this.GRAVITY,
      magnitude: Math.sqrt(
        Math.pow(acceleration.x / this.GRAVITY, 2) +
        Math.pow(acceleration.y / this.GRAVITY, 2) +
        Math.pow(acceleration.z / this.GRAVITY, 2)
      )
    };

    this.samples.push(data);
    if (this.samples.length > this.windowSize) {
      this.samples.shift();
    }

    return this.smoothData(data);
  }

  private smoothData(currentData: AccelerometerData): AccelerometerData {
    if (this.samples.length < this.windowSize) {
      return currentData;
    }

    const smoothed: AccelerometerData = {
      x: 0,
      y: 0,
      z: 0,
      magnitude: 0
    };

    this.samples.forEach(sample => {
      smoothed.x += sample.x;
      smoothed.y += sample.y;
      smoothed.z += sample.z;
      smoothed.magnitude += sample.magnitude;
    });

    smoothed.x /= this.samples.length;
    smoothed.y /= this.samples.length;
    smoothed.z /= this.samples.length;
    smoothed.magnitude /= this.samples.length;

    return smoothed;
  }
}