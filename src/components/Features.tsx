import { Activity, Heart, Trophy, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FeatureDetails } from './features/FeatureDetails';

const features = [
  {
    id: 'workout',
    icon: Activity,
    title: 'Workout Tracking',
    description: 'Log and monitor your workouts with detailed analytics and progress tracking.',
  },
  {
    id: 'health',
    icon: Heart,
    title: 'Health Metrics',
    description: 'Track vital health metrics including heart rate, sleep quality, and more.',
  },
  {
    id: 'nutrition',
    icon: Utensils,
    title: 'Nutrition Planning',
    description: 'Get personalized meal plans and track your daily caloric intake.',
  },
  {
    id: 'goals',
    icon: Trophy,
    title: 'Goal Setting',
    description: 'Set and achieve your fitness goals with our smart goal-tracking system.',
  },
];

export function Features() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  if (selectedFeature) {
    return (
      <FeatureDetails 
        featureId={selectedFeature} 
        onBack={() => setSelectedFeature(null)} 
      />
    );
  }

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Everything You Need to <span className="text-teal-600 dark:text-teal-400">Succeed</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="mb-4">
                <feature.icon className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
              <button
                onClick={() => setSelectedFeature(feature.id)}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Learn More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}