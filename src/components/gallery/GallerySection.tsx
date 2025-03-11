import { EquipmentGallery } from './EquipmentGallery';
import { DietGallery } from './DietGallery';

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="space-y-20">
          <EquipmentGallery />
          <DietGallery />
        </div>
      </div>
    </section>
  );
}