import { motion } from 'framer-motion';

export function Hero() {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05
      }
    }
  };

  const letter = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0
    }
  };

  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 tracking-wide"
              variants={sentence}
              initial="hidden"
              animate="visible"
            >
              <span className="text-gray-900 dark:text-white">Track Your Fitness Journey</span>{' '}
              <span className="text-teal-600 dark:text-teal-400">Like Never Before</span>
            </motion.h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-left">
              Achieve your fitness goals with our professional tracking tools, personalized workouts,
              and nutrition guidance.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=1000"
              alt="Fitness Training"
              className="rounded-lg shadow-xl animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
