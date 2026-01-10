import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import cruiseExterior from '@/assets/cruise-exterior.jpg';

const HeroSection = () => {
  const scrollToContent = () => {
    document.getElementById('cruises')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cruiseExterior})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        <span className="inline-block text-accent font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in">
          Luxury Nile Cruise Experience
        </span>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Prince <span className="text-accent">Omar</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Embark on a journey through ancient Egypt aboard our magnificent 5-star cruise. 
          Discover timeless temples and breathtaking landscapes in unparalleled luxury.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
            asChild
          >
            <a href="https://wa.me/201023723245">Book Your Journey</a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
            onClick={scrollToContent}
          >
            Explore Cruises
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-accent">72</div>
            <div className="text-sm text-primary-foreground/70">Luxury Rooms</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-accent">2</div>
            <div className="text-sm text-primary-foreground/70">Royal Suites</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-accent">5★</div>
            <div className="text-sm text-primary-foreground/70">Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/70 hover:text-accent transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default HeroSection;
