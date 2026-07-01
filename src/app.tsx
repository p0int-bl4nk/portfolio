import { useCallback, useEffect } from 'react';

import { A11yPanel } from '@/components/a11y-panel';
import { CommandPalette } from '@/components/command-palette';
import { Nav } from '@/components/nav';
import { Toast } from '@/components/toast';
import { usePreference } from '@/context/portfolio-context';
import { useKonami } from '@/hooks/use-konami';
import { AboutSection } from '@/sections/about-section';
import { AwardsSection } from '@/sections/awards-section';
import { ContactSection } from '@/sections/contact-section';
import { EducationSection } from '@/sections/education-section';
import { ExperienceSection } from '@/sections/experience-section';
import { HeroSection } from '@/sections/hero-section';
import { SkillsSection } from '@/sections/skills-section';

export function App() {
  const { resolved, prefs, toggleTheme, showToast } = usePreference();

  const onKonami = useCallback(() => {
    toggleTheme();
    showToast('// easter egg: konami code activated 🎮');
    if (!resolved.reduceMotion) {
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
  }, [toggleTheme, showToast, resolved.reduceMotion]);

  useKonami(onKonami);

  useEffect(() => {
    const el = document.documentElement;
    el.classList.toggle('theme-dark', resolved.themeDark);
    el.classList.toggle('hc', resolved.highContrast);
    el.classList.toggle('ul', resolved.underlineLinks);
    el.classList.toggle('motion-off', resolved.reduceMotion);
    el.classList.toggle('dys', resolved.dyslexiaFont);
  }, [resolved]);

  const zoomMap: Record<number, string> = {
    '-1': '90%',
    0: '100%',
    1: '112%',
    2: '125%',
    3: '140%',
  };
  const zoom = zoomMap[prefs.textStep] ?? '100%';

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
