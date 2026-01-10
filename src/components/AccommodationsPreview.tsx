import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import room1 from '@/assets/room-1.jpg';
import room4 from '@/assets/room-4.jpg';

const AccommodationsPreview = () => {
  const { t } = useLanguage();

  const rooms = [
    {
      type: t('accommodations.standardRoom'),
      count: `70 ${t('accommodations.roomsAvailable')}`,
      image: room1,
      features: ['Twin or Double Bed', 'River View', 'En-suite Bathroom', 'Air Conditioning'],
      description: 'Elegantly appointed rooms featuring premium bedding and stunning Nile views.',
    },
    {
      type: t('accommodations.royalSuite'),
      count: `2 ${t('accommodations.suitesAvailable')}`,
      image: room4,
      features: ['King Size Bed', 'Private Balcony', 'Living Area', 'Premium Amenities'],
      description: 'Indulge in our most luxurious accommodation with spacious living areas and exclusive services.',
    },
  ];

  return (
    <section className="py-24 bg-navy-gradient text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">{t('accommodations.tagline')}</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6">
            {t('accommodations.title')}
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            {t('accommodations.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {rooms.map((room, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.type}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-accent text-sm font-medium">{room.count}</span>
                <h3 className="font-display text-2xl font-bold mb-2">{room.type}</h3>
                <p className="text-primary-foreground/70 text-sm mb-4">{room.description}</p>
                <div className="flex flex-wrap gap-3">
                  {room.features.slice(0, 3).map((feature, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-3 py-1 bg-primary-foreground/10 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <Link to="/accommodations">
              {t('accommodations.viewAll')} <ArrowRight className="ms-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AccommodationsPreview;
