import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { PortfolioProvider } from '@/context/portfolio-context';

import { App } from './app';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </StrictMode>,
);
