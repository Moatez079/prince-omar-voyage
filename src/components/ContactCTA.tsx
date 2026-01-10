import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import cruiseNight from '@/assets/cruise-night.jpg';

const ContactCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${cruiseNight})` }}
      >
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <span className="text-accent font-medium tracking-widest uppercase text-sm">Ready to Sail?</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mt-4 mb-6">
          Begin Your Nile Journey Today
        </h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-10">
          Contact us to book your unforgettable cruise experience or to learn more about our 
          exclusive packages and special offers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            asChild
          >
            <a href="https://wa.me/201023723245" className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <a href="tel:+201023723245" className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              +20 102 372 3245
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <a href="mailto:amoamen053@gmail.com" className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </Button>
        </div>

        <p className="text-primary-foreground/60 text-sm">
          We respond within 24 hours • Available 7 days a week
        </p>
      </div>
    </section>
  );
};

export default ContactCTA;
