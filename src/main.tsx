import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

// Portfolio embed: fill the host iframe instead of the desktop phone chrome
if (typeof window !== 'undefined' && window.self !== window.top) {
  document.documentElement.classList.add('mp-embed');
} else {
  document.documentElement.classList.add('mp-standalone');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
