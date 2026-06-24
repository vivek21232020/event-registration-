import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users, Award, ShieldAlert, Phone, Mail, FileText } from 'lucide-react';
import { events } from '../data/eventsData';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find event from localStorage or mock data
  const allEvents = JSON.parse(localStorage.getItem('aura_events')) || events;
  const event = allEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-slate-50">
        <div className="text-center p-8 glass-panel rounded-3xl max-w-md shadow-md border-slate-200">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800">Event Not Found</h2>
          <p className="text-sm text-slate-500 font-sans mt-2">
            The event you are looking for does not exist or has been archived.
          </p>
          <Link
            to="/events"
            className="mt-6 inline-flex items-center px-5 py-2.5 rounded-xl bg-green-500 text-white font-bold text-sm shadow-md shadow-green-500/10 hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-28 pb-16 bg-slate-50">
      {/* Visual background elements */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-green-200/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-90 h-90 rounded-full bg-emerald-100/35 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Back Link */}
        <Link
          to="/events"
          className="inline-flex items-center text-slate-500 hover:text-green-600 font-semibold mb-6 transition-colors text-sm font-sans"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to all events
        </Link>

        {/* Immersive Event Header Banner */}
        <div className="glass-panel rounded-[32px] overflow-hidden border-slate-200/50 shadow-lg mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Image Banner */}
            <div className="lg:col-span-6 h-64 lg:h-auto min-h-[300px] relative">
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/60 to-transparent" />
            </div>

            {/* Basic Info */}
            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-center space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 border border-green-200">
                  {event.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight font-sans leading-tight">
                  {event.title}
                </h1>
                <p className="text-sm font-semibold text-slate-400 mt-1 font-sans">
                  {event.tagline}
                </p>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 font-sans">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-450 font-bold block uppercase leading-none">Team Size</span>
                    <span className="text-sm font-bold text-slate-700 mt-1 block">{event.teamSize}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-450 font-bold block uppercase leading-none">Entry Fee</span>
                    <span className="text-sm font-bold text-slate-700 mt-1 block">₹{event.fee}</span>
                  </div>
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Registration Status</span>
                  <span className="text-sm font-bold text-green-600 block mt-1">Open till Oct 10</span>
                </div>
                
                <Link
                  to={`/register?event=${event.id}`}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-md shadow-green-500/10 hover:shadow-lg transition-all flex items-center group text-sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span>Register for Event</span>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Rules & Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* About Event */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border-slate-200/50 shadow-md">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">About the Competition</h2>
              <p className="text-slate-600 leading-relaxed font-sans text-sm sm:text-base">
                {event.description}
              </p>
            </div>

            {/* Rules & Guidelines */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border-slate-200/50 shadow-md">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Rules & Guidelines</h2>
              <ul className="space-y-3 font-sans text-sm text-slate-650">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-green-50 text-green-600 font-bold text-xs flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Schedule & Prizes & Contact */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Prizes Box */}
            <div className="glass-panel rounded-3xl p-6 border-slate-200/50 shadow-md bg-gradient-to-b from-white to-green-50/20">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center">
                <Award className="w-5 h-5 text-amber-500 mr-2" />
                <span>Cash Prizes & Perks</span>
              </h3>
              
              <div className="mt-4 space-y-3 font-sans">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🏆</span>
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase leading-none block">1st Rank</span>
                      <span className="text-xs font-semibold text-slate-500 block leading-none mt-1">First Winner</span>
                    </div>
                  </div>
                  <span className="font-extrabold text-sm text-amber-800">{event.prizes.first.split(' + ')[0]}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-300/10 border border-slate-400/20">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🥈</span>
                    <div>
                      <span className="text-[10px] font-bold text-slate-700 uppercase leading-none block">2nd Rank</span>
                      <span className="text-xs font-semibold text-slate-500 block leading-none mt-1">Runner Up</span>
                    </div>
                  </div>
                  <span className="font-extrabold text-sm text-slate-800">{event.prizes.second.split(' + ')[0]}</span>
                </div>

                {event.prizes.third && (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🥉</span>
                      <div>
                        <span className="text-[10px] font-bold text-orange-850 uppercase leading-none block">3rd Rank</span>
                        <span className="text-xs font-semibold text-slate-500 block leading-none mt-1">Second Runner</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-sm text-orange-850">{event.prizes.third.split(' + ')[0]}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Schedule & Venue Box */}
            <div className="glass-panel rounded-3xl p-6 border-slate-200/50 shadow-md">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center">
                <Calendar className="w-5 h-5 text-green-500 mr-2" />
                <span>Date & Venue</span>
              </h3>
              <div className="mt-4 space-y-4 font-sans text-sm">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-700">{event.date}</p>
                    <p className="text-xs text-slate-550">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-700">Venue Location</p>
                    <p className="text-xs text-slate-550 leading-relaxed">{event.venue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coordinators Box */}
            <div className="glass-panel rounded-3xl p-6 border-slate-200/50 shadow-md">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center">
                <Phone className="w-5 h-5 text-green-500 mr-2" />
                <span>Event Coordinators</span>
              </h3>
              <div className="mt-4 space-y-4 font-sans text-sm">
                {event.coordinators.map((c, idx) => (
                  <div key={idx} className="flex flex-col space-y-1">
                    <p className="font-bold text-slate-700">{c.name}</p>
                    <p className="text-xs text-slate-550 flex items-center">
                      <Phone className="w-3.5 h-3.5 text-green-500 mr-1.5 shrink-0" />
                      <span>{c.phone}</span>
                    </p>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-slate-400">
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  <span>Queries: support@aura26.in</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
