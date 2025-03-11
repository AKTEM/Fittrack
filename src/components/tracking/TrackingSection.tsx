import { StepTracker } from './StepTracker';
import { VitalStats } from './VitalStats';

export function TrackingSection() {
  return (
    <section id="tracking" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Track Your <span className="text-teal-600">Progress</span>
        </h2>
        <StepTracker />
        <VitalStats />
      </div>
    </section>
  );
}