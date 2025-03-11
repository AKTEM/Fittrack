import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { generateReceipt } from '../../utils/receipt';

interface CheckoutFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Delivery Address</label>
          <textarea
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}