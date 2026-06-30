# Portfolio — Sachin Verma

Personal portfolio site built with React 19, TypeScript, and Tailwind CSS v4.

**Live:** [sachin-verma.vercel.app](https://sachin-verma.vercel.app/)

## Sections

- Hero
- About
- Skills
- Experience
- Awards & Certifications
- Education
- Contact

## Tech Stack

| Layer              | Choice                      |
|--------------------|-----------------------------|
| Framework          | React 19 + TypeScript       |
| Build              | Vite 8                      |
| Styling            | Tailwind CSS v4             |
| Animation          | Motion One                  |
| UI Primitives      | Base UI, cmdk               |
| i18n               | i18next (EN / HI / ES / FR) |
| Linting/Formatting | oxlint + oxfmt              |
| Package Manager    | pnpm                        |

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-check + bundle
pnpm preview    # preview production build
```

## Project Structure

```
src/
├── components/     # Shared UI components
├── context/        # Portfolio context (theme, lang, a11y prefs)
├── hooks/          # useActiveSection, useTypingEffect, …
├── i18n/           # Translation files (en, hi, es, fr)
├── lib/            # config, constants, utils
└── sections/       # One file per page section
```

## Features

- Command palette (`⌘K` / `/`) with navigation and quick actions
- Dark / light mode with persistent preference
- 4-language i18n
- Accessibility panel (high contrast, dyslexia font, reduced motion, underline links, text size)
- PWA support
- IST clock in the nav
