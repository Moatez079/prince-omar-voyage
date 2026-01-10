import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { Bed, Tv, Wind, Bath, Eye, Wifi, Coffee, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

import room1 from '@/assets/room-1.jpg';
import room2 from '@/assets/room-2.jpg';
import room3 from '@/assets/room-3.jpg';
import room4 from '@/assets/room-4.jpg';

const accommodations = [
  {
    type: 'Standard Cabin',
    count: '70 Cabins',
    images: [room1, room2, room3],
    size: '~18 sqm',
    bedding: 'Twin or Double Bed',
    description: 'Our Standard Cabins offer a perfect blend of comfort and elegance. Each cabin features panoramic windows with stunning Nile views, creating a serene retreat after a day of exploration.',
    amenities: [
      { icon: Bed, text: 'Premium bedding' },
      { icon: Eye, text: 'Panoramic Nile view' },
      { icon: Bath, text: 'Private en-suite bathroom' },
      { icon: Wind, text: 'Individual air conditioning' },
      { icon: Tv, text: 'Flat-screen TV' },
      { icon: Wifi, text: 'Wi-Fi access' },
      { icon: Coffee, text: 'Tea/Coffee facilities' },
      { icon: ShieldCheck, text: 'In-room safe' },
    ],
  },
  {
    type: 'Royal Suite',
    count: '2 Suites',
    images: [room4],
    size: '~35 sqm',
    bedding: 'King Size Bed',
    description: 'Experience the pinnacle of luxury in our Royal Suites. Featuring a separate living area, private balcony, and premium amenities, these suites offer an unparalleled Nile cruise experience.',
    amenities: [
      { icon: Bed, text: 'King-size premium bed' },
      { icon: Eye, text: 'Private balcony' },
      { icon: Bath, text: 'Luxury bathroom with tub' },
      { icon: Wind, text: 'Climate control' },
      { icon: Tv, text: 'Large flat-screen TV' },
      { icon: Wifi, text: 'High-speed Wi-Fi' },
      { icon: Coffee, text: 'Mini bar & refreshments' },
      { icon: ShieldCheck, text: 'VIP amenities' },
    ],
    highlight: true,
  },
];

const Accommodations = () => {
  useVisitorTracking();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-6 text-center">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Accommodations</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-4 mb-6">
              Luxury Cabins & Suites
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              72 meticulously designed accommodations combining timeless elegance with modern comfort.
            </p>
          </div>
        </section>

        {/* Accommodations */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            {accommodations.map((room, index) => (
              <div 
                key={index} 
                className={`mb-16 ${room.highlight ? 'bg-muted rounded-2xl p-8' : ''}`}
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Images */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="grid gap-4">
                      {room.images.length === 1 ? (
                        <img 
                          src={room.images[0]} 
                          alt={room.type}
                          className="w-full h-80 object-cover rounded-lg shadow-luxury"
                        />
                      ) : (
                        <>
                          <img 
                            src={room.images[0]} 
                            alt={room.type}
                            className="w-full h-64 object-cover rounded-lg shadow-luxury"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            {room.images.slice(1).map((img, idx) => (
                              <img 
                                key={idx}
                                src={img} 
                                alt={`${room.type} ${idx + 2}`}
                                className="w-full h-40 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    {room.highlight && (
                      <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                        Premium Experience
                      </span>
                    )}
                    <h2 className="font-display text-3xl font-bold text-foreground mb-2">{room.type}</h2>
                    <p className="text-accent font-medium mb-4">{room.count}</p>
                    
                    <div className="flex gap-6 mb-6 text-muted-foreground text-sm">
                      <span>Size: {room.size}</span>
                      <span>•</span>
                      <span>{room.bedding}</span>
                    </div>

                    <p className="text-muted-foreground mb-8">{room.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {room.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <amenity.icon className="w-5 h-5 text-accent" />
                          <span className="text-foreground">{amenity.text}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="bg-primary hover:bg-primary/90" asChild>
                      <a href="https://wa.me/201023723245">Inquire About This Room</a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Accommodations;
