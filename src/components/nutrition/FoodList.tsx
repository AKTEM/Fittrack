import { useState } from 'react';
import { nigerianFoods } from '../../data/nigerianFoods';

interface Props {
  onCaloriesChange: (calories: number) => void;
}

export function FoodList({ onCaloriesChange }: Props) {
  const [selectedFoods, setSelectedFoods] = useState<Array<{ id: number; servings: number }>>([]);

  const addFood = (foodId: number) => {
    setSelectedFoods(prev => {
      const existing = prev.find(f => f.id === foodId);
      if (existing) {
        return prev.map(f => f.id === foodId ? { ...f, servings: f.servings + 1 } : f);
      }
      return [...prev, { id: foodId, servings: 1 }];
    });
    
    const totalCalories = selectedFoods.reduce((acc, food) => {
      const foodItem = nigerianFoods.find(f => f.id === food.id);
      return acc + (foodItem?.calories || 0) * food.servings;
    }, 0);
    
    onCaloriesChange(totalCalories);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Nigerian Foods</h3>
      <div className="space-y-4">
        {nigerianFoods.map(food => (
          <div key={food.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-semibold">{food.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {food.calories} cal per {food.portion}
              </p>
            </div>
            <button
              onClick={() => addFood(food.id)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-lg text-sm"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}