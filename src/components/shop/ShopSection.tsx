import { ProductGrid } from './ProductGrid';

export function ShopSection() {
  return (
    <section id="shop" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Shop <span className="text-teal-600">Equipment</span>
        </h2>
        <ProductGrid />
      </div>
    </section>
  );
}