import { useEffect } from 'react';
import { usePortfolio } from './context/PortfolioContext';
import { Nav } from './components/Nav';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { AwardsSection } from './sections/AwardsSection';
import { EducationSection } from './sections/EducationSection';
import { ContactSection } from './sections/ContactSection';
import { CommandPalette } from './components/CommandPalette';
import { A11yPanel } from './components/A11yPanel';
import { Toast } from './components/Toast';

export function App() {
  const { themeDark, hc, ul, motion, dys, textStep } = usePortfolio();

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
        className='mx-auto max-w-[1240px] border-x border-border min-h-screen'
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
