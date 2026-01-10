import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import cruiseExterior from '@/assets/cruise-exterior.jpg';
import lobby from '@/assets/lobby.jpg';
import restaurant from '@/assets/restaurant.jpg';
import pool from '@/assets/pool.jpg';
import room1 from '@/assets/room-1.jpg';
import sundeck from '@/assets/sundeck.jpg';

const images = [
  { src: cruiseExterior, alt: 'Prince Omar Cruise Exterior', span: 'col-span-2 row-span-2' },
  { src: lobby, alt: 'Lobby with Stained Glass' },
  { src: restaurant, alt: 'Restaurant & Dining' },
  { src: pool, alt: 'Swimming Pool' },
  { src: room1, alt: 'Luxury Cabin' },
  { src: sundeck, alt: 'Sun Deck' },
];

const GalleryPreview = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Gallery</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Experience the Beauty
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a glimpse into the world of Prince Omar Nile Cruise through our gallery.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden rounded-lg ${image.span || ''}`}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            asChild
          >
            <Link to="/gallery">
              View Full Gallery <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
