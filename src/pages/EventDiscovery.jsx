import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Users, CircleDollarSign, ArrowRight, Star } from 'lucide-react';
import { events, categories } from '../data/eventsData';

export default function EventDiscovery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filters calculation
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="relative min-h-screen pt-28 pb-16 bg-slate-50">
      {/* Visual Background blobs */}
      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-green-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-150/50 border border-green-200 text-green-700 text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Over ₹2 Lakhs in Total Prizes</span>
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Explore & Register for <span className="text-gradient">AURA'26 Events</span>
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 mt-2 font-sans"
          >
            Browse through music, dance, theatre, coding, fine arts, and literary competitions. Check rules and team limits to claim your slot.
          </motion.p>
        </div>

        {/* Filter Controls (Sticky Search + Category pills) */}
        <div className="glass-panel rounded-3xl p-6 mb-12 border-slate-200/50 shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="relative md:col-span-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, descriptions, taglines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-input text-slate-800 placeholder-slate-400 font-sans shadow-inner text-sm"
              />
            </div>
            
            {/* Category Selector Dropdown (Mobile-only) */}
            <div className="md:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl glass-input text-slate-800 font-semibold shadow-inner text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Category Pills */}
            <div className="hidden md:flex flex-wrap md:col-span-12 gap-2 mt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-green-500 text-white shadow-md shadow-green-500/25 border border-green-500'
                      : 'bg-white/60 text-slate-650 hover:bg-white border border-slate-200/70 hover:border-slate-350 shadow-sm'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Search results banner */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-semibold text-slate-500 font-sans">
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
          </p>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-bold text-green-600 hover:text-green-700 underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Events Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                className="glass-card rounded-[24px] overflow-hidden flex flex-col group h-full"
              >
                {/* Image block */}
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase text-slate-800 bg-white/95 backdrop-blur-sm border border-slate-200/40">
                      {event.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Details block */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-green-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1 font-sans">
                    {event.tagline}
                  </p>

                  <p className="text-sm text-slate-600 mt-4 leading-relaxed font-sans line-clamp-3">
                    {event.description}
                  </p>

                  {/* Metadata Row */}
                  <div className="mt-5 grid grid-cols-2 gap-3 py-3 border-y border-slate-100/80 font-sans text-xs">
                    <div className="flex items-center text-slate-550 space-x-1.5">
                      <Users className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{event.teamSize}</span>
                    </div>
                    <div className="flex items-center text-slate-550 space-x-1.5">
                      <CircleDollarSign className="w-4 h-4 text-green-500 shrink-0" />
                      <span>Entry: ₹{event.fee}</span>
                    </div>
                    <div className="flex items-center text-slate-550 space-x-1.5 col-span-2">
                      <Calendar className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{event.date} • {event.time.split(' - ')[0]}</span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="mt-6 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none">Prize Pool</span>
                      <span className="text-sm font-extrabold text-slate-800 block mt-1">{event.prizes.first.split(' + ')[0]}</span>
                    </div>
                    <Link
                      to={`/events/${event.id}`}
                      className="px-5 py-3 rounded-xl bg-slate-150 text-slate-800 font-bold text-xs hover:bg-green-500 hover:text-white hover:-translate-y-0.5 transition-all flex items-center"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Fallback empty state */}
          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-16 text-center"
            >
              <div className="w-16 h-16 bg-slate-200/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No events found</h3>
              <p className="text-sm text-slate-500 font-sans mt-1">
                Try searching for different terms or reset your filters.
              </p>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
