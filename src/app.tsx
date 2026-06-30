import { useCallback, useEffect } from 'react';

import { A11yPanel } from '@/components/a11y-panel';
import { CommandPalette } from '@/components/command-palette';
import { Nav } from '@/components/nav';
import { Toast } from '@/components/toast';
import { usePortfolio } from '@/context/portfolio-context';
import { useKonami } from '@/hooks/use-konami';
import { AboutSection } from '@/sections/about-section';
import { AwardsSection } from '@/sections/awards-section';
import { ContactSection } from '@/sections/contact-section';
import { EducationSection } from '@/sections/education-section';
import { ExperienceSection } from '@/sections/experience-section';
import { HeroSection } from '@/sections/hero-section';
import { SkillsSection } from '@/sections/skills-section';

export function App() {
  const { themeDark, hc, ul, motion, dys, textStep, toggleTheme, showToast } =
    usePortfolio();

  const onKonami = useCallback(() => {
    toggleTheme();
    showToast('// easter egg: konami code activated 🎮');
    if (!motion) {
      const h1 = document.querySelector<HTMLElement>('#home h1');
      if (h1) {
        h1.classList.add('glitch');
        const t = setTimeout(() => h1.classList.remove('glitch'), 500);
        h1.addEventListener(
          'animationend',
          () => {
            clearTimeout(t);
            h1.classList.remove('glitch');
          },
          { once: true },
        );
      }
    }
  }, [toggleTheme, showToast, motion]);

  useKonami(onKonami);

  useEffect(() => {
    const el = document.documentElement;
    el.classList.toggle('theme-dark', themeDark);
    el.classList.toggle('hc', hc);
    el.classList.toggle('ul', ul);
    el.classList.toggle('motion-off', motion);
    el.classList.toggle('dys', dys);
  }, [themeDark, hc, ul, motion, dys]);

  const zoomMap: Record<number, string> = {
    '-1': '90%',
    0: '100%',
    1: '112%',
    2: '125%',
    3: '140%',
  };
  const zoom = zoomMap[textStep] ?? '100%';

  return (
    <>
      <Nav />
      <div
        id='content'
        style={{ zoom }}
        className='mx-auto max-w-310 border-x border-border min-h-screen'
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <AwardsSection />
        <EducationSection />
        <ContactSection />
      </div>
      <CommandPalette />
      <A11yPanel />
      <Toast />
    </>
  );
}
