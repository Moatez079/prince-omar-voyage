import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { cruiseData, whatsIncludedItems } from '@/data/cruiseData';
import { Button } from '@/components/ui/button';
import { 
  Calendar, Clock, MapPin, Ship, Check, Anchor, ArrowLeft, 
  Coffee, Utensils, Landmark, Music, Bed, Car, Camera, Map
} from 'lucide-react';
import lobby from '@/assets/lobby.jpg';
import pool from '@/assets/pool.jpg';

const iconMap: Record<string, any> = {
  ship: Ship,
  utensils: Utensils,
  landmark: Landmark,
  music: Music,
  coffee: Coffee,
  bed: Bed,
  car: Car,
  camera: Camera,
  map: Map,
};

const CruiseDetail = () => {
  useVisitorTracking();
  const { cruiseId } = useParams<{ cruiseId: string }>();
  const { language } = useLanguage();
  
  const cruise = cruiseId ? cruiseData[cruiseId as keyof typeof cruiseData] : null;

  if (!cruise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cruise not found</h1>
          <Link to="/cruises" className="text-accent hover:underline">
            Back to cruises
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = cruiseId === 'luxor-aswan' ? lobby : pool;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section 
          className="relative pt-32 pb-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
          <div className="relative z-10 container mx-auto px-6 text-center text-primary-foreground">
            <Link 
              to="/cruises" 
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'ar' ? 'العودة للرحلات' : 'Back to Cruises'}
            </Link>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              {language === 'ar' ? cruise.titleAr : cruise.title}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-lg">
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                {cruise.duration.nights} {language === 'ar' ? 'ليالٍ' : 'Nights'} / {cruise.duration.days} {language === 'ar' ? 'أيام' : 'Days'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                {language === 'ar' ? cruise.departureAr : cruise.departure}
              </span>
            </div>

            <BookingForm 
              cruiseType={cruiseId as 'luxor-aswan' | 'aswan-luxor'}
              trigger={
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
                  {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                </Button>
              }
            />
          </div>
        </section>

        {/* Quick Info */}
        <section className="py-8 bg-muted border-b">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-accent" />
                <div>
                  <div className="font-semibold">{cruise.duration.nights} {language === 'ar' ? 'ليالٍ' : 'Nights'} / {cruise.duration.days} {language === 'ar' ? 'أيام' : 'Days'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-accent" />
                <div>
                  <div className="font-semibold">{language === 'ar' ? cruise.titleAr : cruise.title}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-accent" />
                <div>
                  <div className="font-semibold">{language === 'ar' ? cruise.departureAr : cruise.departure}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Utensils className="w-6 h-6 text-accent" />
                <div>
                  <div className="font-semibold">{language === 'ar' ? 'جميع الوجبات مشمولة' : 'All Meals Included'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-navy-gradient text-primary-foreground">
          <div className="container mx-auto px-6">
            <h2 className="font-display text-3xl font-bold text-center mb-12">
              {language === 'ar' ? 'الأسعار' : 'Pricing'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-primary-foreground/10 rounded-lg p-6 text-center">
                <div className="text-sm text-primary-foreground/70 mb-2">
                  {language === 'ar' ? 'كابينة مزدوجة' : 'Double Cabin'}
                </div>
                <div className="text-4xl font-display font-bold text-accent">
                  ${cruise.pricing.double}
                </div>
              </div>
              <div className="bg-primary-foreground/10 rounded-lg p-6 text-center">
                <div className="text-sm text-primary-foreground/70 mb-2">
                  {language === 'ar' ? 'كابينة فردية' : 'Single Cabin'}
                </div>
                <div className="text-4xl font-display font-bold text-accent">
                  ${cruise.pricing.single}
                </div>
              </div>
              <div className="bg-primary-foreground/10 rounded-lg p-6 text-center">
                <div className="text-sm text-primary-foreground/70 mb-2">
                  {language === 'ar' ? 'كابينة ثلاثية' : 'Triple Cabin'}
                </div>
                <div className="text-4xl font-display font-bold text-accent">
                  ${cruise.pricing.triple}
                </div>
              </div>
              <div className="bg-primary-foreground/10 rounded-lg p-6 text-center">
                <div className="text-sm text-primary-foreground/70 mb-2">
                  {language === 'ar' ? 'طفل (مشاركة)' : 'Child (Sharing)'}
                </div>
                <div className="text-4xl font-display font-bold text-accent">
                  ${cruise.pricing.child}
                </div>
              </div>
            </div>
            <p className="text-center text-primary-foreground/60 mt-6 text-sm">
              {language === 'ar' 
                ? 'الأسعار تشمل الإقامة والوجبات والجولات المصحوبة بمرشدين وتحويلات المطار'
                : 'Prices include accommodation, meals, guided tours, and airport transfers'}
            </p>
          </div>
        </section>

        {/* Daily Itinerary */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
                <Anchor className="w-8 h-8 text-accent" />
                {language === 'ar' ? 'البرنامج اليومي' : 'Daily Itinerary'}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              {cruise.itinerary.map((day, index) => (
                <div key={day.day} className="relative mb-8">
                  {/* Timeline connector */}
                  {index < cruise.itinerary.length - 1 && (
                    <div className="absolute left-[39px] top-20 bottom-0 w-0.5 bg-border" />
                  )}
                  
                  {/* Day Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-2xl font-display font-bold text-accent-foreground">{day.day}</span>
                    </div>
                    <div className="pt-2">
                      <div className="text-sm text-accent font-medium">
                        {language === 'ar' ? `اليوم ${day.day}` : `Day ${day.day}`} - {day.dayName}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground">{day.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        {day.location}
                      </div>
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="ms-24 space-y-4">
                    {day.activities.map((activity, actIndex) => {
                      const IconComponent = iconMap[activity.icon] || Ship;
                      return (
                        <div 
                          key={actIndex}
                          className="bg-card p-4 rounded-lg border border-border hover:border-accent transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-5 h-5 text-accent" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                                  {activity.time}
                                </span>
                                <h4 className="font-semibold text-foreground">{activity.title}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
              {language === 'ar' ? 'ما يشمله السعر' : "What's Included"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {whatsIncludedItems.map((item, index) => {
                const IconComponent = iconMap[item.icon] || Check;
                return (
                  <div key={index} className="bg-card p-6 rounded-lg border border-border flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Book CTA */}
        <section className="py-16 bg-navy-gradient text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-3xl font-bold mb-6">
              {language === 'ar' ? 'مستعد للحجز؟' : 'Ready to Book?'}
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              {language === 'ar' 
                ? 'احجز رحلتك الآن واستمتع بتجربة نيلية لا تُنسى'
                : 'Book your cruise now and enjoy an unforgettable Nile experience'}
            </p>
            <BookingForm 
              cruiseType={cruiseId as 'luxor-aswan' | 'aswan-luxor'}
              trigger={
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6">
                  {language === 'ar' ? 'احجز الآن' : 'Book This Cruise'}
                </Button>
              }
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CruiseDetail;
