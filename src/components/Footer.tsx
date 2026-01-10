import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              {t('hero.title')} <span className="text-accent">{t('hero.titleHighlight')}</span>
            </h3>
            <p className="text-primary-foreground/70 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-accent transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/cruises" className="text-primary-foreground/70 hover:text-accent transition-colors">{t('nav.cruises')}</Link>
              </li>
              <li>
                <Link to="/accommodations" className="text-primary-foreground/70 hover:text-accent transition-colors">{t('nav.accommodations')}</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-primary-foreground/70 hover:text-accent transition-colors">{t('nav.gallery')}</Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-accent transition-colors">{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>

          {/* Our Cruises */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t('footer.ourCruises')}</h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li>{t('cruises.luxorToAswan')} - 4 {t('cruises.nights')}</li>
              <li>{t('cruises.everyMonday')}</li>
              <li className="pt-4">{t('cruises.aswanToLuxor')} - 3 {t('cruises.nights')}</li>
              <li>{t('cruises.everyFriday')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t('footer.contactUs')}</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://wa.me/201023723245" className="flex items-start gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>+20 102 372 3245</span>
                </a>
              </li>
              <li>
                <a href="mailto:amoamen053@gmail.com" className="flex items-start gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>amoamen053@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-primary-foreground/70">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>{t('contact.nileRiver')}, {t('contact.luxorAswan')}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} {t('hero.title')} {t('hero.titleHighlight')} Nile Cruise. {t('footer.allRights')}
          </p>
          <p className="text-primary-foreground/60 text-sm">
            www.princeomarcruise.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
