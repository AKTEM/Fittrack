import { useState } from 'react';
import { FoodList } from './FoodList';
import { DailyIntake } from './DailyIntake';
import { NutritionAdvice } from './NutritionAdvice';

export function NutritionSection() {
  const [dailyCalories, setDailyCalories] = useState(0);

  return (
    <section id="nutrition" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Track Your <span className="text-teal-600">Nutrition</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FoodList onCaloriesChange={setDailyCalories} />
          <DailyIntake calories={dailyCalories} />
          <NutritionAdvice />
        </div>
      </div>
    </section>
  );
}