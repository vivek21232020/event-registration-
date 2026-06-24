import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import EventDiscovery from './pages/EventDiscovery';
import EventDetails from './pages/EventDetails';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';

// Scroll to Top component on Route Change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Animated Route Wrapper for Page Transitions
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/events"
          element={
            <PageWrapper>
              <EventDiscovery />
            </PageWrapper>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PageWrapper>
              <EventDetails />
            </PageWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <PageWrapper>
              <Registration />
            </PageWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          }
        />
        <Route
          path="/results"
          element={
            <PageWrapper>
              <Results />
            </PageWrapper>
          }
        />
        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <div className="min-h-screen pt-36 pb-16 flex flex-col items-center justify-center bg-slate-50 text-center font-sans">
                <h2 className="text-3xl font-extrabold text-slate-800">404 - Page Not Found</h2>
                <p className="text-slate-500 mt-2 text-sm">The requested page does not exist.</p>
                <a href="/" className="mt-6 px-6 py-3 rounded-2xl bg-green-500 text-white font-bold text-xs shadow-md shadow-green-500/10 hover:shadow-lg">
                  Go Back Home
                </a>
              </div>
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen flex flex-col justify-between bg-slate-50 overflow-x-hidden">
        
        {/* Global Floating Animated Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-200/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-250/15 blur-[150px] pointer-events-none" />
        
        <ScrollToTop />
        <Navbar />
        
        {/* Main Content Area */}
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}
