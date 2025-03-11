export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1000"
              alt="About Us"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Your Journey to a
              <span className="text-teal-600 dark:text-teal-400"> Healthier Life</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We believe that everyone deserves to live a healthy and active lifestyle. Our platform
              is designed to make fitness tracking simple, intuitive, and effective.
            </p>
            <ul className="space-y-4">
              {[
                'Expert-designed workout programs',
                'Nutrition tracking and meal planning',
                'Progress tracking and analytics',
                'Community support and motivation',
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}