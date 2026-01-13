import { Clock, MapPin, Ship, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import BookingForm from '@/components/BookingForm';
import lobby from '@/assets/lobby.jpg';
import pool from '@/assets/pool.jpg';

const CruisesSection = () => {
  const { t, language } = useLanguage();

  const cruises = [
    {
      id: 'luxor-aswan' as const,
      title: t('cruises.luxorToAswan'),
      duration: `4 ${t('cruises.nights')} / 5 ${t('cruises.days')}`,
      departure: t('cruises.everyMonday'),
      image: lobby,
      highlights: [
        'Karnak Temple',
        'Valley of the Kings',
        'Edfu Temple',
        'Kom Ombo Temple',
        'Philae Temple'
      ],
      description: t('cruises.luxorDesc'),
    },
    {
      id: 'aswan-luxor' as const,
      title: t('cruises.aswanToLuxor'),
      duration: `3 ${t('cruises.nights')} / 4 ${t('cruises.days')}`,
      departure: t('cruises.everyFriday'),
      image: pool,
      highlights: [
        'Philae Temple',
        'High Dam',
        'Kom Ombo Temple',
        'Edfu Temple',
        'Luxor Temple'
      ],
      description: t('cruises.aswanDesc'),
    },
  ];

  return (
    <section id="cruises" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">{t('cruises.tagline')}</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            {t('cruises.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('cruises.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cruises.map((cruise) => (
            <Card key={cruise.id} className="overflow-hidden group hover:shadow-luxury transition-all duration-500 border-0">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={cruise.image} 
                  alt={cruise.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-bold text-primary-foreground">{cruise.title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-accent" />
                    {cruise.duration}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-accent" />
                    {cruise.departure}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{cruise.description}</p>
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    {t('cruises.highlights')}
                  </h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {cruise.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Ship className="w-3 h-3 text-accent" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <BookingForm 
                  cruiseType={cruise.id}
                  trigger={
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                      <Ship className="w-4 h-4" />
                      {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CruisesSection;
