import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { generateReceipt } from '../../utils/receipt';

interface DeliveryFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export function DeliveryForm() {
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState<DeliveryFormData>({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateReceipt({
      customer: formData,
      items,
      total,
      orderDate: new Date().toISOString(),
    });
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Delivery Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Delivery Address</label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg transition-colors"
            >
              Generate Receipt & Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}