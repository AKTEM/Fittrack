import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: Array<{ label: string; href: string; }>;
  onClose: () => void;
}

export function MobileMenu({ isOpen, navItems, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-x-0 top-16 bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg z-50"
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <motion.li
                  key={item.href}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={item.href}
                    className="block text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    onClick={onClose}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}