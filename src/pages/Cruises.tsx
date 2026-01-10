import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { Calendar, Clock, MapPin, Ship, Check, Anchor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import lobby from '@/assets/lobby.jpg';
import pool from '@/assets/pool.jpg';

const cruises = [
  {
    id: 1,
    title: 'Luxor to Aswan',
    subtitle: 'The Classic Journey South',
    duration: '4 Nights / 5 Days',
    departure: 'Every Monday',
    image: lobby,
    description: 'Begin your adventure in Luxor, ancient Thebes, and sail south through the heart of Egypt to the beautiful city of Aswan. This journey takes you through thousands of years of history.',
    itinerary: [
      { day: 'Day 1 (Monday)', title: 'Luxor - Embarkation', activities: ['Arrive in Luxor', 'Board Prince Omar Cruise', 'Welcome drink & lunch', 'Visit Karnak Temple', 'Dinner on board'] },
      { day: 'Day 2 (Tuesday)', title: 'Luxor - West Bank', activities: ['Breakfast on board', 'Visit Valley of the Kings', 'Queen Hatshepsut Temple', 'Colossi of Memnon', 'Sail to Esna', 'Entertainment night'] },
      { day: 'Day 3 (Wednesday)', title: 'Edfu & Kom Ombo', activities: ['Sail to Edfu', 'Visit Edfu Temple (Horus)', 'Sail to Kom Ombo', 'Visit Kom Ombo Temple', 'Continue to Aswan'] },
      { day: 'Day 4 (Thursday)', title: 'Aswan', activities: ['Visit High Dam', 'Philae Temple', 'Optional: Felucca ride', 'Nubian show night'] },
      { day: 'Day 5 (Friday)', title: 'Disembarkation', activities: ['Breakfast on board', 'Check-out by 8:00 AM', 'Optional: Abu Simbel tour'] },
    ],
  },
  {
    id: 2,
    title: 'Aswan to Luxor',
    subtitle: 'Journey Through Time',
    duration: '3 Nights / 4 Days',
    departure: 'Every Friday',
    image: pool,
    description: 'Start your voyage in Aswan with its Nubian heritage and sail north to the legendary city of Luxor. Experience the Nile as ancient pharaohs once did.',
    itinerary: [
      { day: 'Day 1 (Friday)', title: 'Aswan - Embarkation', activities: ['Arrive in Aswan', 'Board Prince Omar Cruise', 'Welcome drink & lunch', 'Visit Philae Temple', 'Felucca sailing at sunset'] },
      { day: 'Day 2 (Saturday)', title: 'Aswan & Kom Ombo', activities: ['Visit High Dam', 'Unfinished Obelisk', 'Sail to Kom Ombo', 'Visit Kom Ombo Temple', 'Continue sailing north'] },
      { day: 'Day 3 (Sunday)', title: 'Edfu & Esna', activities: ['Visit Edfu Temple', 'Sail through Esna Lock', 'Afternoon tea on deck', 'Galabeya party night'] },
      { day: 'Day 4 (Monday)', title: 'Luxor - Disembarkation', activities: ['Visit Valley of the Kings', 'Hatshepsut Temple', 'Breakfast & check-out'] },
    ],
  },
];

const Cruises = () => {
  useVisitorTracking();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-6 text-center">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Our Journeys</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-4 mb-6">
              Nile Cruise Itineraries
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Discover the magic of ancient Egypt with our carefully crafted cruise experiences.
            </p>
          </div>
        </section>

        {/* Cruises Detail */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            {cruises.map((cruise, index) => (
              <div key={cruise.id} className={`mb-20 ${index === cruises.length - 1 ? '' : 'pb-20 border-b border-border'}`}>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Image */}
                  <div className="relative rounded-lg overflow-hidden shadow-luxury">
                    <img 
                      src={cruise.image} 
                      alt={cruise.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-medium text-sm">
                      {cruise.departure}
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-2">{cruise.title}</h2>
                    <p className="text-accent font-medium mb-4">{cruise.subtitle}</p>
                    <div className="flex gap-6 mb-6 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-accent" />
                        {cruise.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-accent" />
                        {cruise.departure}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">{cruise.description}</p>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                      <a href="https://wa.me/201023723245">Book This Cruise</a>
                    </Button>
                  </div>
                </div>

                {/* Itinerary */}
                <div className="mt-12">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <Anchor className="w-6 h-6 text-accent" />
                    Day by Day Itinerary
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cruise.itinerary.map((day, idx) => (
                      <div key={idx} className="bg-card p-6 rounded-lg border border-border">
                        <span className="text-accent text-sm font-medium">{day.day}</span>
                        <h4 className="font-display text-lg font-semibold text-foreground mt-1 mb-4">{day.title}</h4>
                        <ul className="space-y-2">
                          {day.activities.map((activity, actIdx) => (
                            <li key={actIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
