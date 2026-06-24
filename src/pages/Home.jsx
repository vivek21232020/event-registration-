import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Trophy, Users, School, Calendar, Award, Star, ShieldCheck, Zap } from 'lucide-react';
import { events, statistics } from '../data/eventsData';

// Simple Counter Component
function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    const duration = 2000;
    const increment = Math.ceil(end / (duration / 30));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-extrabold text-4xl sm:text-5xl text-slate-800 tracking-tight font-sans">
      {count}{suffix}
    </span>
  );
}

export default function Home() {
  const featured = events.slice(0, 3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 60,
      },
    },
  };

  return (
    <div className="relative min-h-screen pt-24 overflow-hidden bg-slate-50">
      {/* Background Decorative Blob elements */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-green-200/40 blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl animate-blob pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-teal-100/40 blur-3xl animate-blob pointer-events-none" style={{ animationDelay: '4s' }} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-left"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-100/60 border border-green-200/50 text-green-700 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>National Talent Registration Portal</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-sans">
              Where Creative Talent meets{' '}
              <span className="text-gradient">Next-Gen Stage</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-sans leading-relaxed">
              Step into AURA'26, the premier inter-college cultural and talent festival. Register for music, dance, drama, tech wars, and creative design battles in just 3 clicks.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/register"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/35 hover:-translate-y-0.5 transition-all flex items-center group"
              >
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/events"
                className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-semibold shadow-md border border-slate-200/60 hover:border-slate-350 hover:bg-slate-50 transition-all"
              >
                Explore Events
              </Link>
            </div>

            {/* Micro details */}
            <div className="pt-4 flex items-center space-x-6 text-slate-500 text-sm">
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> Fully Encrypted</span>
              <span className="flex items-center"><Zap className="w-4 h-4 mr-1 text-green-500" /> Instant Approvals</span>
            </div>
          </motion.div>

          {/* Hero Right Visual (Glass Cards Cascade) */}
          <motion.div 
            className="lg:col-span-5 relative flex items-center justify-center min-h-[300px] sm:min-h-[400px]"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            {/* Ambient Back Glow */}
            <div className="absolute w-60 h-60 rounded-full bg-green-400/25 blur-3xl glow-accent" />
            
            {/* Primary Floating Card */}
            <div className="relative glass-panel rounded-3xl p-6 shadow-xl w-72 sm:w-80 border-white/60 z-20 hover:rotate-1 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 text-[10px] uppercase font-bold text-green-700 bg-green-150/60 rounded-md border border-green-200">
                  Featured Event
                </span>
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80" 
                alt="Bands Battle" 
                className="w-full h-36 object-cover rounded-2xl mb-4"
              />
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Battle of Bands</h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">15th Oct • Ground Stage</p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Prizes: ₹50K</span>
                <Link to="/events" className="text-xs font-bold text-green-600 hover:text-green-700 flex items-center">
                  Register <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Back Decoration Glass Cards */}
            <div className="absolute -top-6 -left-6 glass-panel rounded-2xl p-4 w-48 shadow-md border-white/40 rotate-[-8deg] z-10 opacity-75 hidden sm:block">
              <p className="text-xs font-semibold text-slate-400">Total Entries</p>
              <h4 className="text-xl font-black text-slate-800 mt-0.5">1,850+</h4>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 glass-panel rounded-2xl p-4 w-44 shadow-md border-white/40 rotate-[6deg] z-10 opacity-75 hidden sm:block">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                <span className="text-xs font-bold text-slate-700">Live Leaderboard</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Aishwarya Nair (Solo)</p>
              <p className="text-xs font-bold text-slate-800 leading-none">IIT Bombay - Rank #1</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-slate-100/50 border-y border-slate-200/50 py-12 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat, index) => (
              <div key={index} className="space-y-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-green-600">Curated Contests</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 leading-tight font-sans">
              Featured Battles & Challenges
            </h2>
            <p className="text-slate-500 mt-2 font-sans">
              Catch the spotlight in these popular, highly competitive events. Grab the slots before registrations close.
            </p>
          </div>
          <Link
            to="/events"
            className="mt-4 md:mt-0 flex items-center text-green-600 font-bold hover:text-green-700 group transition-all text-sm"
          >
            <span>View All 30+ Events</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Events Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featured.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className="glass-card rounded-[24px] overflow-hidden flex flex-col group h-full"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase text-slate-800 bg-white/90 backdrop-blur-sm border border-slate-200/50">
                    {event.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {event.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 mt-1 font-sans">
                  Team Size: {event.teamSize} • Entry Fee: ₹{event.fee}
                </p>
                <p className="text-sm text-slate-650 mt-3 font-sans line-clamp-3 leading-relaxed">
                  {event.description}
                </p>

                {/* Card CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">First Prize</span>
                    <span className="text-sm font-extrabold text-green-600 block mt-1">{event.prizes.first.split('+')[0]}</span>
                  </div>
                  <Link
                    to={`/events?id=${event.id}`}
                    className="inline-flex items-center px-4.5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-green-500 hover:text-white hover:-translate-y-0.5 transition-all"
                  >
                    Details & Rules
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-100/30 border-t border-slate-200/30 py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-green-600">Built for Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 leading-tight font-sans">
              Designed for Talents & Admins
            </h2>
            <p className="text-slate-500 mt-2 font-sans">
              Enjoy a frictionless, premium registration experience backed by modern workflow automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="glass-card rounded-[24px] p-8 text-left space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 border border-green-150">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Swift Group Form</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Dynamic team member inputs adjust automatically according to rules. Upload IDs and details in seconds.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="glass-card rounded-[24px] p-8 text-left space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 border border-green-150">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">E-Certificates</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Winner & participation credentials generated instantly upon results announcement. Easily downloadable.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="glass-card rounded-[24px] p-8 text-left space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 border border-green-150">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Dynamic Board</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Filter and track winner listings live by event categories. Beautiful 3D podium for top achievers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
