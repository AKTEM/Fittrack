import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { checkVitalStatus } from '../../utils/healthCalculations';

interface VitalReading {
  type: string;
  value: string;
  unit: string;
  normalRange: string;
  icon: string;
  description: string;
}

export function VitalStats() {
  const [vitals, setVitals] = useState<VitalReading[]>([
    { 
      type: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      normalRange: '90/60 - 120/80',
      icon: '❤️',
      description: 'Systolic/Diastolic pressure'
    },
    {
      type: 'Heart Rate',
      value: '75',
      unit: 'bpm',
      normalRange: '60-100',
      icon: '💓',
      description: 'Resting heart rate'
    },
    {
      type: 'Blood Oxygen',
      value: '98',
      unit: '%',
      normalRange: '95-100',
      icon: '🫁',
      description: 'Oxygen saturation level'
    },
    {
      type: 'Temperature',
      value: '37',
      unit: '°C',
      normalRange: '36.1-37.2',
      icon: '🌡️',
      description: 'Body temperature'
    },
    {
      type: 'Respiratory Rate',
      value: '16',
      unit: 'breaths/min',
      normalRange: '12-20',
      icon: '🫧',
      description: 'Breaths per minute'
    },
    {
      type: 'BMI',
      value: '22.5',
      unit: 'kg/m²',
      normalRange: '18.5-24.9',
      icon: '⚖️',
      description: 'Body Mass Index'
    },
    {
      type: 'Blood Sugar',
      value: '95',
      unit: 'mg/dL',
      normalRange: '70-100',
      icon: '🩸',
      description: 'Fasting blood glucose'
    },
    {
      type: 'Hydration',
      value: '65',
      unit: '%',
      normalRange: '60-70',
      icon: '💧',
      description: 'Body hydration level'
    }
  ]);

  const [activeVital, setActiveVital] = useState<number | null>(null);

  const handleVitalChange = (index: number, value: string) => {
    setVitals(prev => prev.map((vital, i) => 
      i === index ? { ...vital, value } : vital
    ));
    setActiveVital(index);
  };

  useEffect(() => {
    if (activeVital !== null) {
      const timer = setTimeout(() => setActiveVital(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [activeVital]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8"
    >
      <h3 className="text-2xl font-bold mb-6">Vital Statistics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vitals.map((vital, index) => (
          <motion.div
            key={vital.type}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.02 }}
            animate={activeVital === index ? {
              scale: [1, 1.02, 1],
              transition: { duration: 0.3 }
            } : {}}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{vital.icon}</span>
              <div>
                <h4 className="text-lg font-semibold">{vital.type}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{vital.description}</p>
              </div>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={vital.value}
                onChange={(e) => handleVitalChange(index, e.target.value)}
                className="w-full px-3 py-2 rounded border dark:bg-gray-600 dark:border-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Unit: {vital.unit}</span>
                <motion.span
                  key={`${vital.value}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`font-medium ${
                    checkVitalStatus(vital.type, vital.value)
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {checkVitalStatus(vital.type, vital.value) ? 'Normal' : 'Abnormal'}
                </motion.span>
              </div>
              <p className="text-sm text-gray-500">
                Normal range: {vital.normalRange}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}