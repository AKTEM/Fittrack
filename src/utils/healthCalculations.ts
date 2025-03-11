export function calculateCalories(steps: number): number {
  // Average calories burned per step (varies by person)
  const caloriesPerStep = 0.04;
  return Math.round(steps * caloriesPerStep);
}

export function checkVitalStatus(type: string, value: string): boolean {
  switch (type) {
    case 'Blood Pressure': {
      const [systolic, diastolic] = value.split('/').map(Number);
      return systolic <= 120 && systolic >= 90 && diastolic <= 80 && diastolic >= 60;
    }
    case 'Heart Rate': {
      const rate = Number(value);
      return rate >= 60 && rate <= 100;
    }
    case 'Blood Oxygen': {
      const oxygen = Number(value);
      return oxygen >= 95 && oxygen <= 100;
    }
    case 'Temperature': {
      const temp = Number(value);
      return temp >= 36.1 && temp <= 37.2;
    }
    case 'Respiratory Rate': {
      const rate = Number(value);
      return rate >= 12 && rate <= 20;
    }
    case 'BMI': {
      const bmi = Number(value);
      return bmi >= 18.5 && bmi <= 24.9;
    }
    case 'Blood Sugar': {
      const sugar = Number(value);
      return sugar >= 70 && sugar <= 100;
    }
    case 'Hydration': {
      const hydration = Number(value);
      return hydration >= 60 && hydration <= 70;
    }
    default:
      return false;
  }
}