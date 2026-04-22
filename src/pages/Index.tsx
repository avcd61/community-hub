import { lazy, Suspense } from 'react';

import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import AboutSection from '@/components/AboutSection';
import ServerIdentity from '@/components/ServerIdentity';
import Footer from '@/components/Footer';
import SiteBackground from '@/components/SiteBackground';

// Heavy / below-the-fold sections: code-split & stream in on demand.
const MusicSection = lazy(() => import('@/components/MusicSection'));
const FrontierlandSection = lazy(() => import('@/components/FrontierlandSection'));
const ImageCarousel = lazy(() => import('@/components/ImageCarousel'));

const SectionFallback = ({ label }: { label: string }) => (
  <div className="py-24 border-b border-border">
    <div className="section-container">
      <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        <span className="text-foreground">&gt;</span> LOADING {label}
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteBackground />
      <Header />

      <main className="relative z-10">
        <HeroCarousel />
        <AboutSection />
        <ServerIdentity />

        <Suspense fallback={<SectionFallback label="FREQ.95" />}>
          <MusicSection />
        </Suspense>

        <Suspense fallback={<SectionFallback label="FRONTIERLAND" />}>
          <FrontierlandSection />
        </Suspense>

        <Suspense fallback={<SectionFallback label="REEL" />}>
          <ImageCarousel />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
