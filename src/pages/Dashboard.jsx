import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Calendar, Users, FolderHeart, Plus, Edit, Trash2, Check, X, ShieldAlert, Award, TrendingUp, HelpCircle } from 'lucide-react';
import { events as initialEvents, mockRegistrations as initialRegistrations } from '../data/eventsData';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, events, registrations, schedule
  
  // Dashboard states
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('aura_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });
  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('aura_registrations');
    return saved ? JSON.parse(saved) : initialRegistrations;
  });
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Active item selections for edit/delete
  const [currentEvent, setCurrentEvent] = useState(null);
  
  // Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    tagline: '',
    category: 'music',
    teamSize: '1 (Solo)',
    minTeamSize: 1,
    maxTeamSize: 1,
    fee: 100,
    venue: 'Main Auditorium',
    date: '2026-10-15',
    time: '10:00 AM - 01:00 PM',
    description: '',
    rules: '',
    prizes: { first: '', second: '' }
  });

  // Open forms helper
  const openAddModal = () => {
    setEventForm({
      title: '',
      tagline: '',
      category: 'music',
      teamSize: '1 (Solo)',
      minTeamSize: 1,
      maxTeamSize: 1,
      fee: 100,
      venue: 'Main Auditorium',
      date: '2026-10-15',
      time: '10:00 AM - 01:00 PM',
      description: '',
      rules: 'Rule 1\nRule 2',
      prizes: { first: '₹10,000 + Trophy', second: '₹5,000' }
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (event) => {
    setCurrentEvent(event);
    setEventForm({
      ...event,
      rules: event.rules.join('\n'),
      prizes: {
        first: event.prizes.first.split(' + ')[0],
        second: event.prizes.second
      }
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (event) => {
    setCurrentEvent(event);
    setIsDeleteModalOpen(true);
  };

  // CRUD Actions Handler
  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      ...eventForm,
      id: eventForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rules: eventForm.rules.split('\n').filter(r => r.trim() !== ''),
      prizes: {
        first: `${eventForm.prizes.first} + Certificate`,
        second: `${eventForm.prizes.second} + Certificate`
      },
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
      coordinators: [{ name: 'Admin Designated', phone: '+91 99999 88888' }]
    };
    const updated = [...events, newEvent];
    setEvents(updated);
    localStorage.setItem('aura_events', JSON.stringify(updated));
    setIsAddModalOpen(false);
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    const updated = events.map((ev) => {
      if (ev.id === currentEvent.id) {
        return {
          ...ev,
          ...eventForm,
          rules: eventForm.rules.split('\n').filter(r => r.trim() !== ''),
          prizes: {
            first: `${eventForm.prizes.first} + Certificate`,
            second: `${eventForm.prizes.second} + Certificate`
          }
        };
      }
      return ev;
    });
    setEvents(updated);
    localStorage.setItem('aura_events', JSON.stringify(updated));
    setIsEditModalOpen(false);
  };

  const handleDeleteEvent = () => {
    const updated = events.filter((ev) => ev.id !== currentEvent.id);
    setEvents(updated);
    localStorage.setItem('aura_events', JSON.stringify(updated));
    setIsDeleteModalOpen(false);
  };

  // Change Registration Status
  const handleRegStatus = (regId, status) => {
    const updated = registrations.map((reg) => {
      if (reg.regId === regId) {
        return { ...reg, status };
      }
      return reg;
    });
    setRegistrations(updated);
    localStorage.setItem('aura_registrations', JSON.stringify(updated));
  };

  return (
    <div className="relative min-h-screen pt-24 bg-slate-50 flex flex-col md:flex-row text-left font-sans">
      
      {/* Sidebar Panel */}
      <aside className="w-full md:w-64 bg-white/70 backdrop-blur-md border-r border-slate-200/50 p-6 flex flex-col space-y-6 flex-shrink-0 z-10">
        <div className="hidden md:block pb-4 border-b border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none block">System Control</span>
          <span className="text-base font-extrabold text-slate-800 mt-1.5 block">Admin Console</span>
        </div>

        {/* Sidebar Nav buttons */}
        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {[
            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
            { id: 'events', name: 'Manage Events', icon: Calendar },
            { id: 'registrations', name: 'Registrations', icon: Users },
            { id: 'schedule', name: 'Schedule Master', icon: FolderHeart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white shadow-md shadow-green-500/10'
                    : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-grow p-6 sm:p-8 md:p-10 relative z-10 max-w-7xl mx-auto w-full">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Console Overview</h1>
              <p className="text-slate-500 text-sm font-sans mt-0.5">Real-time statistics and metrics breakdown.</p>
            </div>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Registrations', value: '1,850', change: '+12.4%', label: 'vs last week', icon: Users, color: 'text-green-500' },
                { title: 'Cash Prizes Worth', value: '₹2,00,000', change: '+0.0%', label: 'Locked pool', icon: Award, color: 'text-amber-500' },
                { title: 'Pending Approval', value: '18', change: 'Action Required', label: 'Manual review', icon: ShieldAlert, color: 'text-red-500' },
                { title: 'Active Contests', value: `${events.length}`, change: 'Live status', label: 'Cultural & Tech', icon: Calendar, color: 'text-blue-500' }
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} className="glass-panel rounded-2xl p-6 border-slate-200/50 shadow-sm flex items-center justify-between">
                    <div className="space-y-1.5 font-sans">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block leading-none">{card.title}</span>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none pt-1">{card.value}</h3>
                      <div className="flex items-center space-x-1.5 text-[10px] font-bold">
                        <span className={card.color === 'text-green-500' ? 'text-green-600' : 'text-slate-500'}>{card.change}</span>
                        <span className="text-slate-400 font-normal">{card.label}</span>
                      </div>
                    </div>
                    <div className={`w-11 h-11 rounded-xl bg-slate-100/50 flex items-center justify-center ${card.color} border border-slate-200/40`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts & Category breakdown section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* SVG Line Chart (Registrations Trend) */}
              <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border-slate-200/50 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Registration Trend</h3>
                    <p className="text-xs text-slate-400">Daily entry growth trajectory over the past week</p>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-green-600 font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+15.2%</span>
                  </div>
                </div>

                {/* SVG Visual line */}
                <div className="h-64 w-full relative pt-4">
                  <svg className="w-full h-full" viewBox="0 0 500 200">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Horizontal Gridlines */}
                    <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="190" x2="500" y2="190" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Area under curve */}
                    <path
                      d="M 10 190 L 80 160 L 160 130 L 240 145 L 320 85 L 400 65 L 490 35 L 490 190 Z"
                      fill="url(#chartGrad)"
                    />
                    
                    {/* Animated Line path */}
                    <motion.path
                      d="M 10 190 L 80 160 L 160 130 L 240 145 L 320 85 L 400 65 L 490 35"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />

                    {/* Data Points dots */}
                    {[
                      { x: 10, y: 190 }, { x: 80, y: 160 }, { x: 160, y: 130 },
                      { x: 240, y: 145 }, { x: 320, y: 85 }, { x: 400, y: 65 }, { x: 490, y: 35 }
                    ].map((pt, i) => (
                      <circle
                        key={i}
                        cx={pt.x}
                        cy={pt.y}
                        r="4.5"
                        fill="#ffffff"
                        stroke="#22C55E"
                        strokeWidth="2.5"
                        className="hover:scale-150 transition-transform cursor-pointer"
                      />
                    ))}
                  </svg>
                  
                  {/* Custom Axis Legend */}
                  <div className="flex justify-between text-[9px] font-bold text-slate-450 uppercase font-sans mt-2 px-1">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>

              {/* Category Share Breakdown */}
              <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border-slate-200/50 shadow-sm space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Domain Metrics</h3>
                  <p className="text-xs text-slate-400">Distribution of registrant preferences</p>
                </div>
                
                <div className="space-y-3.5 font-sans pt-2">
                  {[
                    { name: 'Music & Singing', percent: 38, count: 703, color: 'bg-green-500' },
                    { name: 'Dance & Choreography', percent: 28, count: 518, color: 'bg-emerald-400' },
                    { name: 'Tech & Coding', percent: 18, count: 333, color: 'bg-blue-400' },
                    { name: 'Drama & Nukkad', percent: 10, count: 185, color: 'bg-amber-400' },
                    { name: 'Fine Arts & Writing', percent: 6, count: 111, color: 'bg-purple-400' }
                  ].map((cat, i) => (
                    <div key={i} className="space-y-1 text-xs">
                      <div className="flex justify-between font-semibold text-slate-700">
                        <span>{cat.name}</span>
                        <span className="font-bold text-slate-900">{cat.count} ({cat.percent}%)</span>
                      </div>
                      <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: MANAGE EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            
            {/* Tab Header with Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Configure Contests</h1>
                <p className="text-slate-500 text-sm font-sans mt-0.5">Add, edit, or remove competitions from the registration portal.</p>
              </div>
              
              <button
                onClick={openAddModal}
                className="px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs shadow-md shadow-green-500/10 flex items-center shrink-0 w-fit"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                <span>Create New Event</span>
              </button>
            </div>

            {/* Dynamic Event Config Table */}
            <div className="glass-panel rounded-3xl overflow-hidden border-slate-200/50 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-sans">
                  <thead>
                    <tr className="bg-slate-100/50 border-b border-slate-200/50 text-[10px] font-bold text-slate-500 uppercase text-left">
                      <th className="px-6 py-4">Event details</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Team Limit</th>
                      <th className="px-6 py-4">Venue & Timings</th>
                      <th className="px-6 py-4">Entry Fee</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {events.map((ev) => (
                      <tr key={ev.id} className="hover:bg-slate-50/40 text-slate-700">
                        <td className="px-6 py-4 font-bold text-slate-850">
                          <div>
                            <p>{ev.title}</p>
                            <p className="text-[10px] text-slate-400 font-semibold">{ev.tagline}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 uppercase font-semibold text-xs text-slate-500">{ev.category}</td>
                        <td className="px-6 py-4 text-slate-600">{ev.teamSize}</td>
                        <td className="px-6 py-4 text-slate-600 text-xs">
                          <div>
                            <p className="font-semibold text-slate-700">{ev.venue.split(' (')[0]}</p>
                            <p className="text-slate-400 mt-0.5">{ev.date} • {ev.time.split(' - ')[0]}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-extrabold text-slate-800">₹{ev.fee}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => openEditModal(ev)}
                              className="p-2 bg-slate-100 hover:bg-green-100 hover:text-green-600 rounded-lg text-slate-500 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(ev)}
                              className="p-2 bg-slate-100 hover:bg-red-100 hover:text-red-600 rounded-lg text-slate-500 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: REGISTRATIONS */}
        {activeTab === 'registrations' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Registrations Review</h1>
              <p className="text-slate-500 text-sm font-sans mt-0.5">Approve, reject, or filter recently submitted talent applications.</p>
            </div>

            {/* Table */}
            <div className="glass-panel rounded-3xl overflow-hidden border-slate-200/50 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-sans">
                  <thead>
                    <tr className="bg-slate-100/50 border-b border-slate-200/50 text-[10px] font-bold text-slate-500 uppercase text-left">
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Lead Candidate</th>
                      <th className="px-6 py-4">Academic college</th>
                      <th className="px-6 py-4">Event Contest</th>
                      <th className="px-6 py-4">Registration Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-center">Approval Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {registrations.map((reg) => (
                      <tr key={reg.regId} className="hover:bg-slate-50/40">
                        <td className="px-6 py-4 font-mono font-bold text-xs text-slate-800">{reg.regId}</td>
                        <td className="px-6 py-4 font-bold text-slate-850">
                          <div>
                            <p>{reg.name}</p>
                            <p className="text-[10px] text-slate-400 font-semibold">{reg.email} • {reg.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-600">{reg.college}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-slate-850">{reg.eventName}</p>
                            <p className="text-[9px] uppercase tracking-wide text-slate-400 font-bold">{reg.teamName}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-xs">{reg.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              reg.status === 'Approved'
                                ? 'bg-green-50 border-green-150 text-green-600'
                                : reg.status === 'Rejected'
                                ? 'bg-red-50 border-red-150 text-red-500'
                                : 'bg-amber-50 border-amber-150 text-amber-500 animate-pulse'
                            }`}
                          >
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-1.5">
                            {reg.status !== 'Approved' && (
                              <button
                                onClick={() => handleRegStatus(reg.regId, 'Approved')}
                                className="p-1.5 bg-green-50 hover:bg-green-500 text-green-600 hover:text-white rounded-lg transition-all"
                                title="Approve Registration"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {reg.status !== 'Rejected' && (
                              <button
                                onClick={() => handleRegStatus(reg.regId, 'Rejected')}
                                className="p-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
                                title="Reject / Flag Registration"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: SCHEDULE MASTER */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Timeline Master</h1>
              <p className="text-slate-500 text-sm font-sans mt-0.5">Manage event timings, locations, and track clashes.</p>
            </div>

            {/* Timeline Scheduler Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Day 1 Timeline */}
              <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border-slate-200/50 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex justify-between items-center">
                  <span>Day 1 (Oct 15, 2026)</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Day 1</span>
                </h3>
                
                <div className="relative border-l border-slate-200 ml-3 space-y-6 pl-6 font-sans">
                  {[
                    { time: '10:00 AM - 01:00 PM', event: 'Rhythm & Blues (Singing)', venue: 'Main Auditorium', status: 'Booked' },
                    { time: '11:30 AM - 01:30 PM', event: 'Code Combat (Coding)', venue: 'Advanced CS Lab', status: 'Booked' },
                    { time: '02:00 PM - 06:00 PM', event: 'Groove Junction (Group Dance)', venue: 'Open Air Theatre (OAT)', status: 'Booked' },
                    { time: '04:00 PM - 05:30 PM', event: 'Wordsmith (Creative Writing)', venue: 'Seminar Hall 1', status: 'Booked' }
                  ].map((item, i) => (
                    <div key={i} className="relative text-xs">
                      {/* Timeline dot */}
                      <span className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white shadow" />
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.time}</p>
                      <p className="font-bold text-slate-850 text-sm mt-0.5">{item.event}</p>
                      <p className="text-slate-500 mt-0.5">{item.venue}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day 2 Timeline */}
              <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border-slate-200/50 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex justify-between items-center">
                  <span>Day 2 (Oct 16, 2026)</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Day 2</span>
                </h3>
                
                <div className="relative border-l border-slate-200 ml-3 space-y-6 pl-6 font-sans">
                  {[
                    { time: '09:00 AM - 11:30 AM', event: 'Canvas Magic (Painting)', venue: 'Art Gallery Lobby', status: 'Booked' },
                    { time: '11:00 AM - 02:00 PM', event: 'Nukkad Natak (Street Play)', venue: 'College Quadrangle', status: 'Booked' },
                    { time: '06:00 PM - 10:00 PM', event: 'Battle of Bands (Rock Music)', venue: 'Sports Ground Stage', status: 'Booked' }
                  ].map((item, i) => (
                    <div key={i} className="relative text-xs">
                      {/* Timeline dot */}
                      <span className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white shadow" />
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.time}</p>
                      <p className="font-bold text-slate-850 text-sm mt-0.5">{item.event}</p>
                      <p className="text-slate-500 mt-0.5">{item.venue}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* MODAL 1: ADD EVENT MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl glass-panel rounded-[28px] p-6 sm:p-8 shadow-xl border-white/60 text-left overflow-y-auto max-h-[85vh] z-10"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-6">Create New Competition</h3>
              <form onSubmit={handleAddEvent} className="space-y-4 text-xs font-sans">
                
                {/* Title */}
                <div>
                  <label className="block font-bold text-slate-450 uppercase mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    placeholder="e.g. Rhythm & Blues"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="block font-bold text-slate-450 uppercase mb-1">Tagline</label>
                  <input
                    type="text"
                    required
                    value={eventForm.tagline}
                    onChange={(e) => setEventForm({ ...eventForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    placeholder="e.g. Solo singing duel"
                  />
                </div>

                {/* Category & Fee */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Category</label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    >
                      <option value="music">Music</option>
                      <option value="dance">Dance</option>
                      <option value="drama">Drama</option>
                      <option value="finearts">Fine Arts</option>
                      <option value="tech">Tech</option>
                      <option value="literary">Literary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Entry Fee (₹)</label>
                    <input
                      type="number"
                      required
                      value={eventForm.fee}
                      onChange={(e) => setEventForm({ ...eventForm, fee: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                </div>

                {/* Team Constraints */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Team Mode</label>
                    <input
                      type="text"
                      required
                      value={eventForm.teamSize}
                      onChange={(e) => setEventForm({ ...eventForm, teamSize: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                      placeholder="e.g. 4-12 members"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Min Members</label>
                    <input
                      type="number"
                      value={eventForm.minTeamSize}
                      onChange={(e) => setEventForm({ ...eventForm, minTeamSize: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Max Members</label>
                    <input
                      type="number"
                      value={eventForm.maxTeamSize}
                      onChange={(e) => setEventForm({ ...eventForm, maxTeamSize: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                </div>

                {/* Venue & Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Venue Location</label>
                    <input
                      type="text"
                      value={eventForm.venue}
                      onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Timings slot</label>
                    <input
                      type="text"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-bold text-slate-450 uppercase mb-1">Description</label>
                  <textarea
                    rows="3"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                  />
                </div>

                {/* Rules (Multiline) */}
                <div>
                  <label className="block font-bold text-slate-450 uppercase mb-1">Rules & Criteria (One per line)</label>
                  <textarea
                    rows="3"
                    value={eventForm.rules}
                    onChange={(e) => setEventForm({ ...eventForm, rules: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                  />
                </div>

                {/* Prizes */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">First prize</label>
                    <input
                      type="text"
                      value={eventForm.prizes.first}
                      onChange={(e) => setEventForm({ ...eventForm, prizes: { ...eventForm.prizes, first: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                      placeholder="e.g. ₹10,000"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Second prize</label>
                    <input
                      type="text"
                      value={eventForm.prizes.second}
                      onChange={(e) => setEventForm({ ...eventForm, prizes: { ...eventForm.prizes, second: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                      placeholder="e.g. ₹5,000"
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4.5 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold"
                  >
                    Confirm & Publish
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: EDIT EVENT MODAL */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl glass-panel rounded-[28px] p-6 sm:p-8 shadow-xl border-white/60 text-left overflow-y-auto max-h-[85vh] z-10"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-6">Modify Competition</h3>
              <form onSubmit={handleEditEvent} className="space-y-4 text-xs font-sans">
                
                {/* Title */}
                <div>
                  <label className="block font-bold text-slate-450 uppercase mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="block font-bold text-slate-450 uppercase mb-1">Tagline</label>
                  <input
                    type="text"
                    required
                    value={eventForm.tagline}
                    onChange={(e) => setEventForm({ ...eventForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                  />
                </div>

                {/* Category & Fee */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Category</label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    >
                      <option value="music">Music</option>
                      <option value="dance">Dance</option>
                      <option value="drama">Drama</option>
                      <option value="finearts">Fine Arts</option>
                      <option value="tech">Tech</option>
                      <option value="literary">Literary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Entry Fee (₹)</label>
                    <input
                      type="number"
                      required
                      value={eventForm.fee}
                      onChange={(e) => setEventForm({ ...eventForm, fee: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                </div>

                {/* Team Constraints */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Team Mode</label>
                    <input
                      type="text"
                      required
                      value={eventForm.teamSize}
                      onChange={(e) => setEventForm({ ...eventForm, teamSize: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Min Members</label>
                    <input
                      type="number"
                      value={eventForm.minTeamSize}
                      onChange={(e) => setEventForm({ ...eventForm, minTeamSize: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Max Members</label>
                    <input
                      type="number"
                      value={eventForm.maxTeamSize}
                      onChange={(e) => setEventForm({ ...eventForm, maxTeamSize: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                </div>

                {/* Venue & Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Venue Location</label>
                    <input
                      type="text"
                      value={eventForm.venue}
                      onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Timings slot</label>
                    <input
                      type="text"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-bold text-slate-450 uppercase mb-1">Description</label>
                  <textarea
                    rows="3"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                  />
                </div>

                {/* Rules */}
                <div>
                  <label className="block font-bold text-slate-450 uppercase mb-1">Rules & Criteria (One per line)</label>
                  <textarea
                    rows="3"
                    value={eventForm.rules}
                    onChange={(e) => setEventForm({ ...eventForm, rules: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                  />
                </div>

                {/* Prizes */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">First prize</label>
                    <input
                      type="text"
                      value={eventForm.prizes.first}
                      onChange={(e) => setEventForm({ ...eventForm, prizes: { ...eventForm.prizes, first: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-450 uppercase mb-1">Second prize</label>
                    <input
                      type="text"
                      value={eventForm.prizes.second}
                      onChange={(e) => setEventForm({ ...eventForm, prizes: { ...eventForm.prizes, second: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-800"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4.5 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold"
                  >
                    Update & Save
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm glass-panel rounded-3xl p-6 shadow-xl border-white/60 text-center space-y-5 z-10"
            >
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto border border-red-150">
                <Trash2 className="w-6 h-6" />
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-800">Archive Competition?</h3>
                <p className="text-xs text-slate-500 font-sans mt-1">
                  Are you sure you want to delete <strong>{currentEvent?.title}</strong>? This action will disable the event registrations on the public portal.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-grow py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteEvent}
                  className="flex-grow py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs"
                >
                  Archive
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
