import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import InteractivePlaceholders from '@/components/InteractivePlaceholders';
import AboutSection from '@/components/AboutSection';
import ServerIdentity from '@/components/ServerIdentity';
import MusicSection from '@/components/MusicSection';
import FrontierlandSection from '@/components/FrontierlandSection';
import ImageCarousel from '@/components/ImageCarousel';
import SidePlaceholders from '@/components/SidePlaceholders';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header Navigation */}
      <Header />

      {/* Side Visual Placeholders */}
      <SidePlaceholders />

      {/* Main Content */}
      <main>
        <HeroCarousel />
        <InteractivePlaceholders />
        <AboutSection />
        <ServerIdentity />
        <MusicSection />
        <FrontierlandSection />
        <ImageCarousel />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
