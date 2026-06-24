import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Award, LayoutDashboard, Calendar, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Explore Events', path: '/events', icon: Calendar },
    { name: 'Results & Badges', path: '/results', icon: Award },
    { name: 'Admin Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/70 backdrop-blur-md border-b border-green-100/50 shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md shadow-green-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-800 group-hover:text-green-600 transition-colors font-sans">
                AURA<span className="text-green-500 font-medium font-sans">'26</span>
              </span>
              <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold leading-none">
                Talent Portal
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/40 p-1.5 rounded-full border border-slate-200/30 backdrop-blur-sm">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-green-700 bg-white shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-green-600 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive(link.path) ? 'text-green-500' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/register"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-slate-900 rounded-full group bg-gradient-to-br from-green-400 to-emerald-600 group-hover:from-green-400 group-hover:to-emerald-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200"
            >
              <span className="relative px-6 py-2.5 transition-all ease-in duration-75 bg-white text-slate-800 font-semibold rounded-full group-hover:bg-opacity-0 group-hover:text-white flex items-center space-x-1">
                <FileText className="w-4 h-4 mr-1" />
                Register Now
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-green-600 hover:bg-green-50/50 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slideout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-green-50 bg-white/95 backdrop-blur-md"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-green-700 bg-green-50/70 font-semibold'
                        : 'text-slate-600 hover:text-green-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-slate-400" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-100 px-4">
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center px-5 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md shadow-green-500/10 hover:shadow-lg transition-shadow"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Register Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
