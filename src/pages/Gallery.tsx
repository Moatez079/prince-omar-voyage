import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { X } from 'lucide-react';

// Exterior
import cruiseExterior from '@/assets/cruise-exterior.jpg';
import cruiseNight from '@/assets/cruise-night.jpg';

// Interior - Lobby & Bar
import lobby from '@/assets/lobby.jpg';
import barLounge from '@/assets/bar-lounge.jpg';
import barSeating from '@/assets/bar-seating.jpg';
import corridor from '@/assets/corridor.jpg';

// Dining
import restaurant from '@/assets/restaurant.jpg';
import restaurantPrivate from '@/assets/restaurant-private.jpg';

// Deck
import pool from '@/assets/pool.jpg';
import sundeck from '@/assets/sundeck.jpg';
import sundeckSeating from '@/assets/sundeck-seating.jpg';

// Cabins
import room1 from '@/assets/room-1.jpg';
import room2 from '@/assets/room-2.jpg';
import room3 from '@/assets/room-3.jpg';
import room4 from '@/assets/room-4.jpg';
import suite from '@/assets/suite.jpg';

const categories = ['All', 'Exterior', 'Interior', 'Cabins', 'Dining', 'Deck'];

const images = [
  // Exterior
  { src: cruiseExterior, alt: 'Prince Omar Cruise Exterior', category: 'Exterior' },
  { src: cruiseNight, alt: 'Cruise at Night', category: 'Exterior' },
  
  // Interior - Lobby & Bar
  { src: lobby, alt: 'Grand Lobby with Bar', category: 'Interior' },
  { src: barLounge, alt: 'Bar Lounge Area', category: 'Interior' },
  { src: barSeating, alt: 'Bar Seating Area', category: 'Interior' },
  { src: corridor, alt: 'Cabin Corridor', category: 'Interior' },
  
  // Dining
  { src: restaurant, alt: 'Main Restaurant', category: 'Dining' },
  { src: restaurantPrivate, alt: 'Private Dining Room', category: 'Dining' },
  
  // Deck
  { src: pool, alt: 'Swimming Pool & Sun Deck', category: 'Deck' },
  { src: sundeck, alt: 'Sun Deck with Nile View', category: 'Deck' },
  { src: sundeckSeating, alt: 'Sun Deck Seating Area', category: 'Deck' },
  
  // Cabins
  { src: room1, alt: 'Standard Twin Cabin', category: 'Cabins' },
  { src: room2, alt: 'Standard Twin Cabin View', category: 'Cabins' },
  { src: room3, alt: 'Standard Double Cabin', category: 'Cabins' },
  { src: room4, alt: 'Deluxe Double Cabin', category: 'Cabins' },
  { src: suite, alt: 'Royal Suite', category: 'Cabins' },
];

const Gallery = () => {
  useVisitorTracking();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-6 text-center">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Gallery</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-4 mb-6">
              Experience Prince Omar
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Browse through our collection of images showcasing the beauty and elegance of our luxury Nile cruise.
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div 
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setLightboxImage(image.src)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity font-medium text-sm text-center px-2">
                      {image.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-primary-foreground hover:text-accent transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={lightboxImage} 
              alt="Gallery image"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
