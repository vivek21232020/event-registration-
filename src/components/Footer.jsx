import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-350 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white font-sans">
                AURA<span className="text-green-500 font-medium font-sans">'26</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              The ultimate talent arena. Compete with top minds across cultural, literary, fine arts, and technical battles. Express, engage, and elevate your skills.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-green-500 hover:text-white transition-all text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-green-500 hover:text-white transition-all text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-green-500 hover:text-white transition-all text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-green-500 hover:text-white transition-all text-slate-400">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-green-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-green-400 transition-colors">Explore Events</Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-green-400 transition-colors">Results & Badges</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-green-400 transition-colors">Register Online</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-green-400 transition-colors">Admin Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Event Domains
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/events?category=music" className="hover:text-green-400 transition-colors">Music & Vocals</Link>
              </li>
              <li>
                <Link to="/events?category=dance" className="hover:text-green-400 transition-colors">Dance & Choreography</Link>
              </li>
              <li>
                <Link to="/events?category=drama" className="hover:text-green-400 transition-colors">Theatre & Drama</Link>
              </li>
              <li>
                <Link to="/events?category=tech" className="hover:text-green-400 transition-colors">Tech & Coding</Link>
              </li>
              <li>
                <Link to="/events?category=finearts" className="hover:text-green-400 transition-colors">Fine Arts & Design</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Fest Secretariat
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>Green Campus, Main Block,<br />Aura University, Delhi - 110001</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-green-500 shrink-0" />
                <span>+91 11 2345 6789</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-green-500 shrink-0" />
                <span>fest@aurauniversity.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {currentYear} Aura Cultural & Talent Committee. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-450 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-450 transition-colors">Terms of Participation</a>
            <a href="#" className="hover:text-slate-450 transition-colors">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
