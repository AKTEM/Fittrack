import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertCircle } from 'lucide-react';
import { Pedometer } from '../../utils/pedometer';
import { calculateDistance } from '../../utils/distanceCalculations';

export function PedometerWidget() {
  const [steps, setSteps] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [distance, setDistance] = useState({ kilometers: 0, miles: 0 });

  const toggleTracking = async () => {
    const pedometer = Pedometer.getInstance();
    
    if (!isTracking) {
      try {
        await pedometer.start((newSteps) => {
          setSteps(newSteps);
          setDistance(calculateDistance(newSteps));
        });
        setIsTracking(true);
        setError(null);
      } catch (err) {
        setError('Unable to access motion sensors. Please ensure you have granted the necessary permissions.');
        console.error('Pedometer error:', err);
      }
    } else {
      pedometer.stop();
      setIsTracking(false);
    }
  };

  const handleReset = () => {
    const pedometer = Pedometer.getInstance();
    pedometer.reset();
    setSteps(0);
    setDistance({ kilometers: 0, miles: 0 });
  };

  useEffect(() => {
    return () => {
      if (isTracking) {
        const pedometer = Pedometer.getInstance();
        pedometer.stop();
      }
    };
  }, [isTracking]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <Activity className={`w-6 h-6 ${isTracking ? 'text-orange-500' : 'text-teal-600'}`} />
        <h3 className="text-xl font-bold">Real-time Step Counter</h3>
      </div>

      <div className="text-center py-6">
        <motion.div
          key={steps}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`text-4xl font-bold mb-2 ${isTracking ? 'text-orange-500' : 'text-teal-600'}`}
        >
          {steps.toLocaleString()}
        </motion.div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">steps</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Distance (km)</p>
            <p className="text-xl font-semibold">{distance.kilometers}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Distance (mi)</p>
            <p className="text-xl font-semibold">{distance.miles}</p>
          </div>
        </div>

        <div className="space-x-4">
          <button
            onClick={toggleTracking}
            className={`px-6 py-2 rounded-lg transition-colors ${
              isTracking 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'bg-teal-600 hover:bg-teal-700'
            } text-white`}
          >
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </button>
          <button
            onClick={handleReset}
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm mt-4">
            <AlertCircle className="w-4 h-4" />
            <p>{error}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}