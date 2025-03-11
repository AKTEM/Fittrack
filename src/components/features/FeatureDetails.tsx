import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { featureDetails } from '../../data/featureDetails';

interface FeatureDetailsProps {
  featureId: string;
  onBack: () => void;
}

export function FeatureDetails({ featureId, onBack }: FeatureDetailsProps) {
  const feature = featureDetails[featureId];
  if (!feature) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        
        <h1 className="text-4xl font-bold mb-8">{feature.title}</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <img
              src={feature.image}
              alt={feature.title}
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          
          <div className="space-y-6">
            {feature.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}