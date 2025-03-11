import { useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, total } = useCart();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-teal-600 text-white p-4 rounded-full shadow-lg"
      >
        <ShoppingBag className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
            {items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t mt-auto">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => window.location.href = '/checkout'}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}