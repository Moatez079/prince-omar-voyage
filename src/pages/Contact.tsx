import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, MessageCircle, Clock, Globe } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  useVisitorTracking();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open WhatsApp with message
    const message = `Hello! I'm ${formData.name}.\n\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`;
    window.open(`https://wa.me/201023723245?text=${encodeURIComponent(message)}`, '_blank');
    toast({
      title: "Message prepared!",
      description: "WhatsApp will open with your message. Click send to reach us.",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-6 text-center">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Get in Touch</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-4 mb-6">
              Contact Us
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Ready to embark on your Nile adventure? We're here to help you plan the perfect cruise experience.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  We'd Love to Hear From You
                </h2>
                <p className="text-muted-foreground mb-10">
                  Whether you have questions about our cruises, need help with booking, or want to 
                  learn more about special packages, our team is ready to assist you.
                </p>

                <div className="space-y-6">
                  <a 
                    href="https://wa.me/201023723245"
                    className="flex items-start gap-4 p-4 bg-muted rounded-lg hover:bg-accent/10 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">WhatsApp</h3>
                      <p className="text-muted-foreground">+20 102 372 3245</p>
                      <p className="text-sm text-accent mt-1">Fastest response • Click to chat</p>
                    </div>
                  </a>

                  <a 
                    href="tel:+201023723245"
                    className="flex items-start gap-4 p-4 bg-muted rounded-lg hover:bg-accent/10 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">Phone</h3>
                      <p className="text-muted-foreground">+20 102 372 3245</p>
                      <p className="text-sm text-muted-foreground mt-1">Available 7 days a week</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:amoamen053@gmail.com"
                    className="flex items-start gap-4 p-4 bg-muted rounded-lg hover:bg-accent/10 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">Email</h3>
                      <p className="text-muted-foreground">amoamen053@gmail.com</p>
                      <p className="text-sm text-muted-foreground mt-1">We respond within 24 hours</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Location</h3>
                      <p className="text-muted-foreground">Nile River</p>
                      <p className="text-muted-foreground">Luxor & Aswan, Egypt</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Website</h3>
                      <p className="text-accent">www.princeomarcruise.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card p-8 rounded-2xl border border-border shadow-luxury">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 234 567 8900"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Message
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your travel plans..."
                      className="w-full min-h-[120px]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send via WhatsApp
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Your message will be sent via WhatsApp for fastest response
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
