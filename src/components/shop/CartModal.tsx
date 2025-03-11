import { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import { DeliveryForm } from '../checkout/DeliveryForm';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeFromCart, total } = useCart();
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);

  const handleGoBack = () => {
    if (showDeliveryForm) {
      setShowDeliveryForm(false);
    } else {
      window.history.back();
    }
  };

  if (showDeliveryForm) {
    return (
      <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50">
        <div className="absolute inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DeliveryForm onBack={() => setShowDeliveryForm(false)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <button onClick={handleGoBack} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={onClose}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {items.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t mt-auto bg-white dark:bg-gray-800">
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowDeliveryForm(true)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => setShowDeliveryForm(true)}
                    className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 rounded-lg transition-colors"
                  >
                    Pay on Delivery
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}