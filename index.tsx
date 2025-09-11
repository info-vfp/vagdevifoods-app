
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// It's good practice to import global styles or fonts if not using CDN for everything,
// but for this setup, Tailwind is via CDN in index.html.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
    