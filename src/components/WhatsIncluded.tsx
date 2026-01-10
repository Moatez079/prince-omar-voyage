import { 
  Utensils, 
  Wine, 
  Wifi, 
  Users, 
  Music, 
  Waves,
  Sparkles,
  ShieldCheck,
  Coffee,
  Camera
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhatsIncluded = () => {
  const { t } = useLanguage();

  const inclusions = [
    {
      icon: Utensils,
      title: t('included.fullBoard'),
      description: t('included.fullBoardDesc'),
    },
    {
      icon: Wine,
      title: t('included.welcomeDrink'),
      description: t('included.welcomeDrinkDesc'),
    },
    {
      icon: Coffee,
      title: t('included.teaCoffee'),
      description: t('included.teaCoffeeDesc'),
    },
    {
      icon: Camera,
      title: t('included.guidedTours'),
      description: t('included.guidedToursDesc'),
    },
    {
      icon: Waves,
      title: t('included.pool'),
      description: t('included.poolDesc'),
    },
    {
      icon: Music,
      title: t('included.entertainment'),
      description: t('included.entertainmentDesc'),
    },
    {
      icon: Wifi,
      title: t('included.wifi'),
      description: t('included.wifiDesc'),
    },
    {
      icon: Sparkles,
      title: t('included.housekeeping'),
      description: t('included.housekeepingDesc'),
    },
    {
      icon: Users,
      title: t('included.personalService'),
      description: t('included.personalServiceDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('included.safety'),
      description: t('included.safetyDesc'),
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">{t('included.tagline')}</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            {t('included.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('included.description')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {inclusions.map((item, index) => (
            <div 
              key={index}
              className="group p-6 bg-card rounded-lg border border-border hover:border-accent hover:shadow-luxury transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center group-hover:bg-accent transition-colors">
                <item.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsIncluded;
