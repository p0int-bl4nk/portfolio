export const SECTIONS = {
  home: 'home',
  about: 'about',
  skills: 'skills',
  experience: 'experience',
  awards: 'awards',
  education: 'education',
  contact: 'contact',
} as const;

export type SECTIONS = (typeof SECTIONS)[keyof typeof SECTIONS];

export const LANG = {
  ENGLISH: 'en',
  HINDI: 'hi',
  SPANISH: 'es',
  FRENCH: 'fr',
} as const;

export type LANG = (typeof LANG)[keyof typeof LANG];

export const LANG_DEFS = [
  [LANG.ENGLISH, 'English'],
  [LANG.HINDI, 'हिन्दी'],
  [LANG.SPANISH, 'Español'],
  [LANG.FRENCH, 'Français'],
] as const;

export const LANG_CODE: Record<LANG, string> = {
  en: 'EN',
  hi: 'हिं',
  es: 'ES',
  fr: 'FR',
};

export const STATS = [
  { target: 5, suffix: '+', label: 'YEARS' },
  { target: 2, suffix: '×', label: 'AWARDS' },
  { target: 94, suffix: '%', label: 'COVERAGE' },
] as const;

export const SKILL_GROUPS = [
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

export const BULLETS_R1 = [
  'exp.r1b1',
  'exp.r1b2',
  'exp.r1b3',
  'exp.r1b4',
  'exp.r1b5',
  'exp.r1b6',
  'exp.r1b7',
] as const;

export const BULLETS_R2 = [
  'exp.r2b1',
  'exp.r2b2',
  'exp.r2b3',
  'exp.r2b4',
] as const;
