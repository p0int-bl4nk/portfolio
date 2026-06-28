import { useTranslation } from 'react-i18next';

import { Section, SectionLabel } from '@/components/section';
import { usePortfolio } from '@/context/portfolio-context';
import { useCountUp } from '@/hooks';

const SKILL_GROUPS = [
  {
    no: '01',
    key: 'sk.frontend',
    items: [
      'React.js',
      'TypeScript',
      'JavaScript ES6+',
      'HTML5',
      'CSS3',
      'Tailwind',
      'ShadCN',
      'Vite',
      'Zod',
    ],
  },
  {
    no: '02',
    key: 'sk.backend',
    items: ['Node.js', 'Python', 'Express.js', 'REST APIs', 'Microservices'],
  },
  {
    no: '03',
    key: 'sk.databases',
    items: ['MongoDB', 'MySQL', 'Elasticsearch', 'Redis'],
  },
  {
    no: '04',
    key: 'sk.messaging',
    items: ['Apache Kafka', 'Consumers/Producers', 'Event-Driven Arch'],
  },
  {
    no: '05',
    key: 'sk.security',
    items: ['JWT', 'API Key Auth', 'RBAC', '2FA (Twilio)', 'Cookie Auth'],
  },
  {
    no: '06',
    key: 'sk.devops',
    items: ['AWS', 'Docker', 'Git', 'GitHub', 'CI/CD'],
  },
  {
    no: '07',
    key: 'sk.testing',
    items: ['Jest', 'Vitest', 'Unit Testing', 'Integration Testing'],
  },
  {
    no: '08',
    key: 'sk.tools',
    items: [
      'oRPC',
      'Stripe',
      'Twilio',
      'D3.js',
      'Zendesk',
      'Cursor',
      'Claude Code',
      'Agile/Scrum',
    ],
  },
] as const;

export function SkillsSection() {
  const { t } = useTranslation();
  const { motion } = usePortfolio();
  const count = useCountUp(40, { suffix: '+', duration: 1400, motion });

  return (
    <Section id='skills'>
      <SectionLabel no='02' label={t('sec.skills')} className='mb-5' />
      <p
        ref={count.ref}
        className='text-xs text-muted-foreground mb-11.5 cursor-default'
      >
        <span className='text-foreground font-black'>{count.display}</span>
        {t('skills.intro')}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {SKILL_GROUPS.map(({ no, key, items }) => (
          <div
            key={key}
            className='grid grid-cols-1 sm:grid-cols-[140px_1fr] border-b border-border py-4 gap-3'
          >
            <div className='text-xs'>
              <span className='text-muted-foreground'>{no}</span>{' '}
              <span className='font-black'>{t(key)}</span>
            </div>
            <div className='flex flex-wrap gap-2 items-start'>
              {items.map(item => (
                <span
                  key={item}
                  className='text-xs border border-border px-2.75 py-1.5 cursor-default transition-colors duration-150 hover:bg-foreground hover:text-background hover:border-foreground'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
