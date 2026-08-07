import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Hand metadata over to React.
//
// scripts/prerender.mjs writes this route's <title>/<meta>/<link> into <head> so crawlers that
// do not run JavaScript see them. React renders its own copies from components/SEO.tsx, but it
// only reconciles tags it rendered itself — it has no idea these exist. Left in place they
// never update, so one client-side navigation away from here would leave the page with two
// canonicals and two descriptions, the stale pair first. Removing them now, before the first
// render, means React's copies are the only ones and they track the route correctly.
document.querySelectorAll('[data-prerendered-meta]').forEach((el) => el.remove());

// Routes are pre-rendered to static HTML at build time, so in production there is already
// markup here to attach to. Fall back to a fresh render when there isn't — which happens
// on the dev server, and for any route that was not pre-rendered.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
