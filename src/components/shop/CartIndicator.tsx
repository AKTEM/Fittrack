import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useState } from 'react';
import { CartModal } from './CartModal';

export function CartIndicator() {
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
      >
        <ShoppingCart className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}