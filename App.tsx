import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import MobileActionBar from './components/MobileActionBar';
import { LanguageProvider } from './context/LanguageContext';
import { WHATSAPP_BULK_QUOTE_LINK } from './constants';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MillPage from './pages/MillPage';
import ProductsPage from './pages/ProductsPage';
import BusinessPage from './pages/BusinessPage';
import ContactPage from './pages/ContactPage';
import SuryaPage from './pages/SuryaPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-brand-bg">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
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
      <Route path="/surya" element={<SuryaPage />} />
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
