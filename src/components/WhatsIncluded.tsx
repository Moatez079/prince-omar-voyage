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

const inclusions = [
  {
    icon: Utensils,
    title: 'Full Board Meals',
    description: 'Exquisite breakfast, lunch, and dinner with international and local cuisine',
  },
  {
    icon: Wine,
    title: 'Welcome Drink',
    description: 'Refreshing welcome cocktail upon embarkation',
  },
  {
    icon: Coffee,
    title: 'Tea & Coffee',
    description: 'Complimentary tea and coffee available throughout the day',
  },
  {
    icon: Camera,
    title: 'Guided Tours',
    description: 'Professional Egyptologist guides for all temple visits',
  },
  {
    icon: Waves,
    title: 'Swimming Pool',
    description: 'Sundeck pool with panoramic Nile views',
  },
  {
    icon: Music,
    title: 'Entertainment',
    description: 'Nightly entertainment including Nubian shows and Galabeya parties',
  },
  {
    icon: Wifi,
    title: 'Wi-Fi Access',
    description: 'Stay connected with onboard internet service',
  },
  {
    icon: Sparkles,
    title: 'Daily Housekeeping',
    description: 'Premium housekeeping service twice daily',
  },
  {
    icon: Users,
    title: 'Personal Service',
    description: 'Attentive staff dedicated to your comfort',
  },
  {
    icon: ShieldCheck,
    title: 'Safety & Security',
    description: '24/7 security and safety protocols',
  },
];

const WhatsIncluded = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Amenities</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            What's Included
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every detail has been thoughtfully considered to ensure your journey is nothing short of extraordinary.
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
