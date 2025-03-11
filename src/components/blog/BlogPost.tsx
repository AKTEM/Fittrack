import { motion } from 'framer-motion';

interface BlogPostProps {
  id: number | string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  content?: string;
}

export function BlogPost({ title, excerpt, image, date, author, category, content }: BlogPostProps) {
  const handleReadMore = () => {
    const blogContent = content || excerpt;
    const blogWindow = window.open('', '_blank');
    if (blogWindow) {
      blogWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body class="bg-gray-50 dark:bg-gray-900">
            <article class="max-w-4xl mx-auto px-4 py-12">
              <img src="${image}" alt="${title}" class="w-full h-64 object-cover rounded-lg mb-8">
              <div class="prose dark:prose-dark max-w-none">
                <h1 class="text-4xl font-bold mb-4">${title}</h1>
                <div class="flex items-center gap-4 text-sm text-gray-600 mb-8">
                  <span>${date}</span>
                  <span>•</span>
                  <span>${category}</span>
                  <span>•</span>
                  <span>By ${author}</span>
                </div>
                <div class="text-lg leading-relaxed">
                  ${blogContent}
                </div>
              </div>
            </article>
          </body>
        </html>
      `);
      blogWindow.document.close();
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span>{date}</span>
          <span>•</span>
          <span>{category}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">By {author}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReadMore}
            className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
          >
            Read More <span aria-hidden="true">→</span>
          </motion.button>
        </div>
      </div>
    </article>
  );
}