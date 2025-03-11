import { motion } from 'framer-motion';
import { BlogPost } from './BlogPost';
import { useState, useEffect } from 'react';
import { fetchHealthArticles } from '../../utils/blogApi';

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      const articles = await fetchHealthArticles();
      setBlogPosts(articles);
      setLoading(false);
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Health & Fitness <span className="text-teal-600">Blog</span>
          </h2>
          <div className="flex justify-center">
            <div className="animate-pulse w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Health & Fitness <span className="text-teal-600">Blog</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <BlogPost {...post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}