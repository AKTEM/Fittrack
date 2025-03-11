import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export function ProductCard({ id, name, description, price, image }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-teal-600">${price}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}