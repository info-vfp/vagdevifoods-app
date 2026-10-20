import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import MobileActionBar from './components/MobileActionBar';
import SkipLink from './components/SkipLink';
import { LanguageProvider } from './context/LanguageContext';
import { WHATSAPP_BULK_QUOTE_LINK } from './constants';

// One chunk per route. Previously every visitor downloaded all seven pages up front —
// someone landing on the home page was paying for the contact form's EmailJS client and the
// whole Surya microsite before they had read a word.
//
// There is no visible loading state on first paint: the HTML is pre-rendered, and React
// keeps that server markup on screen while the route's chunk arrives rather than swapping in
// a fallback. Only a later in-app navigation can suspend, and by then the chunk is usually
// already cached. entry-server.tsx has to use the static prerender API for this to hold —
// see the note there.
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const MillPage = lazy(() => import('./pages/MillPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const BusinessPage = lazy(() => import('./pages/BusinessPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SuryaPage = lazy(() => import('./pages/SuryaPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/**
 * Resets scroll on navigation — or, for a link like /products#brands, scrolls to that
 * section. The target lives in a lazily loaded route chunk that may not have rendered yet
 * when this runs, so it retries for a short while before giving up and staying at the top.
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Always start from the top. With a hash this also matters: left where the previous page
    // was scrolled, the browser's scroll anchoring drags the view toward the footer as the
    // new page renders, and the jump to the section then plays as a long scroll back up.
    // 'instant' overrides the stylesheet's smooth scrolling: a page change is a jump, and
    // animating it would scroll the visitor back up through the new page's content.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (!hash) return;
    let frame = 0;
    let tries = 0;
    const seek = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
      else if (++tries < 60) frame = requestAnimationFrame(seek);
    };
    seek();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};

/**
 * Placeholder shown while a route chunk downloads. Deliberately blank and roughly a screen
 * tall: it only appears on an in-app navigation, where a spinner that flashes for 150ms is
 * more distracting than empty space, and the height stops the footer jumping up the page.
 */
const RouteFallback: React.FC = () => <div className="min-h-[70dvh]" aria-hidden="true" />;

const MainLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-brand-bg">
    <SkipLink />
    <Navbar />
    {/* tabIndex lets the skip link move focus here, not just scroll. */}
    <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
    {/* Bottom padding on mobile keeps the sticky action bar from covering the footer. */}
    <div className="h-[68px] lg:hidden" aria-hidden="true" />
    <WhatsAppFAB link={WHATSAPP_BULK_QUOTE_LINK} />
    <MobileActionBar whatsappLink={WHATSAPP_BULK_QUOTE_LINK} />
  </div>
);

/**
 * Routes without a router around them, so the same tree can be driven by BrowserRouter
 * in the browser and by StaticRouter during the pre-render build.
 */
export const AppRoutes: React.FC = () => (
  <LanguageProvider>
    <ScrollToTop />
    <Routes>
      {/* The microsite renders its own chrome, so it sits outside MainLayout — and therefore
          needs its own boundary rather than the one around the Outlet. */}
      <Route
        path="/surya"
        element={
          <Suspense fallback={<RouteFallback />}>
            <SuryaPage />
          </Suspense>
        }
      />
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mill" element={<MillPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* A real "not found" page rather than a silent redirect to Home. GitHub Pages serves
            404.html for unknown paths with an HTTP 404 status, so this is a true 404 to search
            engines (not a soft one), and a visitor following a stale link learns why they are
            not where they expected and where to go next. */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </LanguageProvider>
);

const App: React.FC = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
