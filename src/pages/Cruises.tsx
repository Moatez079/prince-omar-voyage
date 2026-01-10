import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import BookingForm from '@/components/BookingForm';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { cruiseData } from '@/data/cruiseData';
import { Calendar, Clock, MapPin, ArrowRight, Ship } from 'lucide-react';
import { Button } from '@/components/ui/button';
import lobby from '@/assets/lobby.jpg';
import pool from '@/assets/pool.jpg';

const Cruises = () => {
  useVisitorTracking();
  const { language, t } = useLanguage();

  const cruises = [
    {
      ...cruiseData['luxor-aswan'],
      image: lobby,
      highlights: ['Karnak Temple', 'Valley of the Kings', 'Edfu Temple', 'Kom Ombo Temple', 'Philae Temple'],
    },
    {
      ...cruiseData['aswan-luxor'],
      image: pool,
      highlights: ['Philae Temple', 'High Dam', 'Kom Ombo Temple', 'Edfu Temple', 'Luxor Temple'],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-6 text-center">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">
              {t('cruises.tagline')}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-4 mb-6">
              {t('cruises.title')}
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              {t('cruises.description')}
            </p>
          </div>
        </section>

        {/* Cruises */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            {cruises.map((cruise, index) => (
              <div 
                key={cruise.id} 
                className={`mb-16 ${index === cruises.length - 1 ? '' : 'pb-16 border-b border-border'}`}
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Image */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="relative rounded-lg overflow-hidden shadow-luxury group">
                      <img 
                        src={cruise.image} 
                        alt={cruise.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-medium text-sm">
                        {language === 'ar' ? cruise.departureAr : cruise.departure}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full">
                        <span className="text-sm">{language === 'ar' ? 'من' : 'From'}</span>
                        <span className="text-xl font-bold ms-2">${cruise.pricing.double}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                      {language === 'ar' ? cruise.titleAr : cruise.title}
                    </h2>
                    <div className="flex flex-wrap gap-6 mb-6 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-accent" />
                        {cruise.duration.nights} {t('cruises.nights')} / {cruise.duration.days} {t('cruises.days')}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-accent" />
                        {language === 'ar' ? cruise.departureAr : cruise.departure}
                      </span>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-4 gap-2 mb-6 text-sm">
                      <div className="bg-muted p-3 rounded text-center">
                        <div className="text-muted-foreground text-xs">
                          {language === 'ar' ? 'مزدوجة' : 'Double'}
                        </div>
                        <div className="font-bold text-accent">${cruise.pricing.double}</div>
                      </div>
                      <div className="bg-muted p-3 rounded text-center">
                        <div className="text-muted-foreground text-xs">
                          {language === 'ar' ? 'فردية' : 'Single'}
                        </div>
                        <div className="font-bold text-accent">${cruise.pricing.single}</div>
                      </div>
                      <div className="bg-muted p-3 rounded text-center">
                        <div className="text-muted-foreground text-xs">
                          {language === 'ar' ? 'ثلاثية' : 'Triple'}
                        </div>
                        <div className="font-bold text-accent">${cruise.pricing.triple}</div>
                      </div>
                      <div className="bg-muted p-3 rounded text-center">
                        <div className="text-muted-foreground text-xs">
                          {language === 'ar' ? 'طفل' : 'Child'}
                        </div>
                        <div className="font-bold text-accent">${cruise.pricing.child}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        {t('cruises.highlights')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cruise.highlights.map((highlight, idx) => (
                          <span 
                            key={idx}
                            className="text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Link to={`/cruise/${cruise.id}`}>
                        <Button variant="outline" className="gap-2">
                          {language === 'ar' ? 'عرض البرنامج' : 'View Itinerary'}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <BookingForm 
                        cruiseType={cruise.id as 'luxor-aswan' | 'aswan-luxor'}
                        trigger={
                          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                            <Ship className="w-4 h-4" />
                            {t('cruises.bookThisCruise')}
                          </Button>
                        }
                      />
                    </div>
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

export default Cruises;
