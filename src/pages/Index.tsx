import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CruisesSection from '@/components/CruisesSection';
import WhatsIncluded from '@/components/WhatsIncluded';
import AccommodationsPreview from '@/components/AccommodationsPreview';
import GalleryPreview from '@/components/GalleryPreview';
import ContactCTA from '@/components/ContactCTA';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

const Index = () => {
  useVisitorTracking();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CruisesSection />
        <WhatsIncluded />
        <AccommodationsPreview />
        <GalleryPreview />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
