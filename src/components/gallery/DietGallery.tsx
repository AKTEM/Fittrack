import { motion } from 'framer-motion';
import { dietItems } from '../../data/galleryData';

export function DietGallery() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Healthy <span className="text-teal-600">Diet</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dietItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative overflow-hidden rounded-lg shadow-lg"
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-200">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}