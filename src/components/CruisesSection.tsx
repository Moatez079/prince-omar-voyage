import { Calendar, MapPin, Clock, Ship } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import lobby from '@/assets/lobby.jpg';
import pool from '@/assets/pool.jpg';

const cruises = [
  {
    id: 1,
    title: 'Luxor to Aswan',
    duration: '4 Nights / 5 Days',
    departure: 'Every Monday',
    image: lobby,
    highlights: [
      'Karnak Temple',
      'Valley of the Kings',
      'Edfu Temple',
      'Kom Ombo Temple',
      'Philae Temple'
    ],
    description: 'Begin your journey in Luxor, the world\'s greatest open-air museum, and sail south to the enchanting city of Aswan.',
  },
  {
    id: 2,
    title: 'Aswan to Luxor',
    duration: '3 Nights / 4 Days',
    departure: 'Every Friday',
    image: pool,
    highlights: [
      'Philae Temple',
      'High Dam',
      'Kom Ombo Temple',
      'Edfu Temple',
      'Luxor Temple'
    ],
    description: 'Start in Aswan, navigate through the Nile\'s gentle waters, and conclude in legendary Luxor.',
  },
];

const CruisesSection = () => {
  return (
    <section id="cruises" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Our Journeys</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Nile Cruise Itineraries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully curated cruise experiences, each offering unique perspectives 
            of Egypt's ancient wonders and natural beauty.
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
                    Highlights
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
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <a href="https://wa.me/201023723245">Inquire Now</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CruisesSection;
