import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';

const rootElement = document.getElementById('app');

if (rootElement) {
  // Clear any fallback pre-rendered content and mount the dynamic React + Motion application
  rootElement.innerHTML = '';
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
