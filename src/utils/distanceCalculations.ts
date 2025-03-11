export function calculateDistance(steps: number, strideLength: number = 0.762) { // Default stride length of 0.762m (30 inches)
  const distanceInMeters = steps * strideLength;
  
  return {
    kilometers: Number((distanceInMeters / 1000).toFixed(2)),
    miles: Number((distanceInMeters / 1609.34).toFixed(2))
  };
}