export const en = {
  // Nav
  'nav.about': 'About',
  'nav.skills': 'Skills',
  'nav.work': 'Work',
  'nav.awards': 'Awards',
  'nav.edu': 'Edu',
  'nav.contact': 'Contact',
  // Hero
  'hero.role': 'SOFTWARE DEVELOPMENT ENGINEER II',
  'hero.disc': 'FULL-STACK · BACKEND',
  'hero.loc': 'GURUGRAM, IN',
  'hero.scroll': 'SCROLL TO EXPLORE',
  'hero.building': 'currently building',
  'hero.lead':
    'I design and deliver scalable, high-performance web applications and backend systems. 5+ years across the full stack — currently building <u>at Policybazaar</u>.',
  // Section labels
  'sec.index': 'INDEX',
  'sec.about': 'ABOUT',
  'sec.skills': 'SKILLS',
  'sec.experience': 'EXPERIENCE',
  'sec.awards': 'AWARDS & CERTIFICATIONS',
  'sec.education': 'EDUCATION',
  'sec.contact': 'CONTACT',
  // About
  'about.big':
    'Results-driven engineer who cares about clean code, developer experience, and products that scale.',
  'about.p1':
    "My expertise spans the full stack — React.js, TypeScript, Node.js, and Python — with deep work in API security (JWT, RBAC, 2FA), Kafka-based event streaming, and database optimization. I've twice been recognized for outstanding performance at Policybazaar.",
  'about.p2':
    'I like turning messy, manual workflows into type-safe, automated systems — and shipping them with the test coverage and deployment discipline to keep them reliable at scale.',
  'about.current_l': 'CURRENT',
  'about.focus_l': 'FOCUS',
  'about.focus_v': 'Full-stack & Backend',
  'about.based_l': 'BASED IN',
  'about.based_v': 'Gurugram, India',
  'about.status_l': 'STATUS',
  'about.status_v': 'Open to work',
  // Skills
  'skills.intro': ' technologies across 8 domains — hover to highlight.',
  'sk.frontend': 'Frontend',
  'sk.backend': 'Backend',
  'sk.databases': 'Databases',
  'sk.messaging': 'Messaging',
  'sk.security': 'Security',
  'sk.devops': 'DevOps & Cloud',
  'sk.testing': 'Testing',
  'sk.tools': 'Tools',
  // Experience metrics
  'exp.manual': 'MANUAL EFFORT',
  'exp.latency': 'API LATENCY',
  'exp.coverage': 'TEST COVERAGE',
  'exp.typesafe': 'TYPE SAFETY',
  // Experience roles
  'exp.r1date': '2022 — NOW',
  'exp.r2date': '2021 — 2022',
  'exp.r1title': 'Software Development Engineer II',
  'exp.r2title': 'Software Specialist',
  // Experience bullets (HTML — use Trans)
  'exp.r1b1':
    "Engineered an automated <b>proposal portal</b> with React, Node & oRPC's end-to-end type-safe RPC layer — eliminating API contract drift and cutting manual effort by <b>90%</b>.",
  'exp.r1b2':
    'Architected a multi-layered <b>API security framework</b> — JWT auth, API-key validation, and granular role/permission-based access control (RBAC).',
  'exp.r1b3':
    'Cut API response times <b>60%</b> via strategic indexing and <b>Redis caching</b>, improving scalability under load.',
  'exp.r1b4':
    'Built <b>Kafka consumers</b> powering an AI-driven call-transcript pipeline for real-time insight extraction.',
  'exp.r1b5':
    'Led a full <b>TypeScript migration</b> of the customer dashboard (Vite · React · ShadCN · Zod · Tailwind) — 100% type safety.',
  'exp.r1b6':
    'Deployed Dashboard & Payment Gateway to <b>AWS CloudFront</b>; introduced <b>Blue-Green</b> deploys for zero-downtime releases.',
  'exp.r1b7':
    'Wrote Jest & Vitest suites reaching <b>94% coverage</b> across modules including the Payment Gateway.',
  'exp.r2b1':
    'Built a full-stack <b>Stripe</b> billing & subscription module (React + Node) — cutting billing errors <b>80%</b> and automating renewals.',
  'exp.r2b2':
    'Implemented <b>Twilio 2FA</b>, reducing unauthorized access attempts <b>95%</b>.',
  'exp.r2b3':
    'Built an interactive <b>D3.js org-chart</b> tool for dynamic team-structure management.',
  'exp.r2b4':
    'Developed an automated loan-quote module for a mortgage CRM — <b>70%</b> less manual processing.',
  // Awards
  'awards.certs': 'CERTIFICATIONS',
  // Education
  'edu.d1': 'Post Graduate Diploma in Computer Applications',
  'edu.gpa': 'GPA / 10',
  'edu.d2': 'B.Sc — Computer Science, Physics & Mathematics',
  'edu.score': 'SCORE',
  // Contact
  'contact.head': "LET'S\nBUILD\nSOMETHING.",
  'contact.email_l': 'EMAIL',
  'contact.phone_l': 'PHONE',
  'contact.loc_l': 'LOCATION',
  'contact.egg': '// PSST — TRY THE KONAMI CODE, OR PRESS ⌘K',
  // Command palette
  'cmd.home': 'Go to top',
  'cmd.about': 'About',
  'cmd.skills': 'Skills',
  'cmd.experience': 'Experience',
  'cmd.awards': 'Awards & Certifications',
  'cmd.education': 'Education',
  'cmd.contact': 'Contact',
  'cmd.copy': 'Copy email address',
  'cmd.linkedin': 'Open LinkedIn',
  'cmd.theme': 'Toggle dark mode',
  // A11y panel
  'a11y.title': 'ACCESSIBILITY',
  'a11y.text': 'TEXT SIZE',
  'a11y.contrast': 'HIGH CONTRAST',
  'a11y.underline': 'UNDERLINE LINKS',
  'a11y.motion': 'REDUCE MOTION',
  'a11y.font': 'READABLE FONT',
  'a11y.theme': 'THEME',
  'a11y.reset': 'RESET ALL',
  // UI
  'ui.copy': 'COPY',
  'ui.copied': 'COPIED ✓',
  'palette.placeholder': 'Jump to a section, copy email, toggle theme…',
  // Typed words
  typed: [
    'scalable APIs',
    'React front-ends',
    'Kafka pipelines',
    'secure auth systems',
    'type-safe portals',
    'clean developer tools',
  ],
} as const;

export type TranslationKeys = keyof typeof en;
