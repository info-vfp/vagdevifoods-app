import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import MobileActionBar from './components/MobileActionBar';
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

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
    <Navbar />
    <main className="flex-grow">
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
        {/* Redirect unknown paths rather than rendering Home under a wrong URL, which
            search engines would classify as a soft 404. */}
        <Route path="*" element={<Navigate to="/" replace />} />
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
