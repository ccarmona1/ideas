import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { HealthCheck } from './features/components/health/HealthCheck.tsx';
import './index.css';
import './features/components/health/HealthCheck.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HealthCheck>
      <App />
    </HealthCheck>
  </StrictMode>
);
