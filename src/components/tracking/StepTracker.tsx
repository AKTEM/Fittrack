import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { calculateCalories } from '../../utils/healthCalculations';
import { Calendar } from './Calendar';
import { PedometerWidget } from './PedometerWidget';

// Generate some mock data for the past month
const generateMockStepData = () => {
  const data: Record<string, number> = {};
  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data[date.toISOString().split('T')[0]] = Math.floor(Math.random() * 5000) + 5000;
  }
  return data;
};

const mockStepData = generateMockStepData();

export function StepTracker() {
  const [dailyTarget] = useState(10000);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todaySteps, setTodaySteps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const calories = calculateCalories(todaySteps);
  const progress = (todaySteps / dailyTarget) * 100;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, [todaySteps]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const dateStr = date.toISOString().split('T')[0];
    setTodaySteps(mockStepData[dateStr] || 0);
  };

  return (
    <div className="space-y-8">
      <PedometerWidget />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h3 className="text-2xl font-bold mb-6">Step Tracking</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
            animate={isAnimating ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-2">Today's Steps</h4>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-teal-600">{todaySteps}</span>
              <span className="text-sm text-gray-500">/ {dailyTarget}</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-teal-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          <motion.div 
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
            animate={isAnimating ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-2">Calories Burned</h4>
            <motion.span 
              className="text-3xl font-bold text-orange-500"
              key={calories}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {calories}
            </motion.span>
          </motion.div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Add Steps</h4>
            <input
              type="number"
              value={todaySteps}
              onChange={(e) => setTodaySteps(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 rounded border dark:bg-gray-600 dark:border-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={Object.entries(mockStepData).slice(-7).map(([date, steps]) => ({ date, steps }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  padding: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="steps" 
                stroke="#0d9488" 
                strokeWidth={2}
                dot={{ fill: '#0d9488' }}
                activeDot={{ r: 8, fill: '#0d9488' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <Calendar onDateSelect={handleDateSelect} stepData={mockStepData} />
    </div>
  );
}