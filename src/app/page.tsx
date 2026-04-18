'use client';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { ArrowUp } from 'lucide-react';
import {
  WaterScrollAnimation,
  Footer,
  Header,
  ContactSection,
  HeroImageBoxSection,
  HeroApresentationSection,
  FaqSection,
  CoursesSection
} from '@/components';
import { useWidth78 } from '@/hooks/useWidth78';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import Script from 'next/script';

export default function Page() {
  const [progress, setProgress] = useState<number>(0);
  const [showTop, setShowTop] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>('Tecnologia');

  const isLongDesktop = useIsDesktop(1900);
  const width78Porcent = useWidth78();

  function onScroll() {
    const y = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight || 1;
    const pct = Math.round((y / max) * 100);
    setProgress(pct);
    setShowTop(y > 400);
  }

  useEffect(() => {
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll)
  }, []);

  function toggleCategory(cat: string | null) {
    setActiveCategory((prev) => (prev === cat ? null : cat));
  }

  return (
    <> 
      <Header progress={progress} />
      <main>
        <HeroApresentationSection />
        <HeroImageBoxSection width78Porcent={width78Porcent} />
        <div className="section-divider" />
        <WaterScrollAnimation />
        <CoursesSection activeCategory={activeCategory} toggleCategory={toggleCategory} />
        <FaqSection openFaqIndex={openFaqIndex} setOpenFaqIndex={setOpenFaqIndex} />
        <ContactSection />
      </main>
      <Footer />
      {showTop && (
        <Link to="home" smooth offset={-80} duration={800} className="back-top link-scrool-page" aria-label="Voltar para o topo">
          <ArrowUp size={isLongDesktop ? 76 : 24} color="#fff" />
        </Link>
      )}
    </>
  );
}