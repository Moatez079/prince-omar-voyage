import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/cruises', label: 'Our Cruises' },
    { href: '/accommodations', label: 'Accommodations' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="hidden md:block border-b border-primary-foreground/10">
        <div className="container mx-auto px-6 py-2 flex justify-between items-center text-sm text-primary-foreground/80">
          <div className="flex items-center gap-6">
            <a href="https://wa.me/201023723245" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              +20 102 372 3245
            </a>
            <a href="mailto:amoamen053@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              amoamen053@gmail.com
            </a>
          </div>
          <span className="text-accent font-medium">Luxury Nile Cruise Experience</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
              Prince <span className="text-accent">Omar</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive(link.href) ? 'text-accent' : 'text-primary-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="https://wa.me/201023723245">Book Now</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-primary-foreground/10 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    isActive(link.href) ? 'text-accent' : 'text-primary-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                <a href="https://wa.me/201023723245">Book Now</a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
