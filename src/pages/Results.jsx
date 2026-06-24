import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Search, Download, ShieldCheck, HelpCircle, Trophy, Sparkles } from 'lucide-react';
import { leaderboardData, badges, mockRegistrations } from '../data/eventsData';

export default function Results() {
  const [selectedEventId, setSelectedEventId] = useState(leaderboardData[0].eventId);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Certificate generator state
  const [certRegId, setCertRegId] = useState('');
  const [certResult, setCertResult] = useState(null);
  const [certError, setCertError] = useState('');

  // Selected event data
  const activeEvent = useMemo(() => {
    return leaderboardData.find((e) => e.eventId === selectedEventId);
  }, [selectedEventId]);

  // Leaderboard filters
  const filteredWinners = useMemo(() => {
    if (!activeEvent) return [];
    return activeEvent.winners.filter((winner) => 
      winner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      winner.college.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeEvent, searchQuery]);

  // Certificate generation logic
  const handleGenerateCertificate = (e) => {
    e.preventDefault();
    setCertError('');
    setCertResult(null);

    const cleanId = certRegId.trim().toUpperCase();
    if (!cleanId) {
      setCertError('Please enter a Registration ID.');
      return;
    }

    // Look for registration
    const registration = mockRegistrations.find((r) => r.regId === cleanId);
    if (!registration) {
      setCertError('Registration ID not found. Try "REG-10492" or "REG-10511".');
      return;
    }

    // Determine rank or participation status
    // Look up in leaderboardData
    let awardRank = 'Participant';
    let awardTitle = 'Participation Badge';
    let isWinner = false;

    for (const eventResult of leaderboardData) {
      const winnerIndex = eventResult.winners.findIndex(
        (w) => w.name.toLowerCase() === registration.name.toLowerCase() && 
               w.college.toLowerCase() === registration.college.toLowerCase()
      );
      if (winnerIndex !== -1) {
        isWinner = true;
        const rankNum = eventResult.winners[winnerIndex].rank;
        awardRank = rankNum === 1 ? '1st Winner' : rankNum === 2 ? '2nd Winner' : '3rd Winner';
        awardTitle = rankNum === 1 ? 'Golden Champion' : rankNum === 2 ? 'Silver Contender' : 'Bronze Achiever';
        break;
      }
    }

    setCertResult({
      name: registration.name,
      college: registration.college,
      eventName: registration.eventName,
      awardRank,
      awardTitle,
      isWinner,
      regId: registration.regId,
      date: registration.date
    });
  };

  return (
    <div className="relative min-h-screen pt-28 pb-16 bg-slate-50 text-left font-sans">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-green-200/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-90 h-90 rounded-full bg-emerald-100/35 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-green-600">Event Standings</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mt-1">
            Results & <span className="text-gradient">E-Certificates</span>
          </h1>
          <p className="text-slate-500 mt-2 font-sans">
            Verify official standings, explore participant achievements, and generate dynamic digital badges of completion.
          </p>
        </div>

        {/* SECTION 1: EVENT RESULTS & PODIUM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 3D Winner Podium */}
          <div className="lg:col-span-6 glass-panel rounded-[32px] p-6 sm:p-8 border-slate-200/50 shadow-md flex flex-col items-center">
            
            {/* Event Dropdown Selector */}
            <div className="w-full mb-8">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Select Competition Results</label>
              <select
                value={selectedEventId}
                onChange={(e) => {
                  setSelectedEventId(e.target.value);
                  setSearchQuery('');
                }}
                className="w-full px-4 py-3 rounded-2xl glass-input text-slate-800 font-bold shadow-sm"
              >
                {leaderboardData.map((ld) => (
                  <option key={ld.eventId} value={ld.eventId}>
                    {ld.eventName}
                  </option>
                ))}
              </select>
            </div>

            {/* 3D Glass Podium Visuals */}
            {activeEvent && (
              <div className="w-full flex items-end justify-center min-h-[260px] pt-10 px-4 font-sans text-center relative">
                
                {/* 2nd Place (Left) */}
                <div className="flex flex-col items-center flex-1 z-10">
                  <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-slate-600 font-bold shadow-md text-sm mb-3">
                    2nd
                  </div>
                  <div className="w-full max-w-[100px] h-28 bg-gradient-to-t from-slate-200 to-slate-100 border border-slate-300/35 rounded-t-2xl shadow flex flex-col justify-end p-3">
                    <p className="text-[10px] font-extrabold text-slate-800 truncate leading-none">
                      {activeEvent.winners[1]?.name || 'N/A'}
                    </p>
                    <p className="text-[8px] text-slate-450 mt-1 truncate leading-none">
                      {activeEvent.winners[1]?.college || ''}
                    </p>
                  </div>
                </div>

                {/* 1st Place (Center - Tallest) */}
                <div className="flex flex-col items-center flex-1 z-20 scale-105 -mx-2">
                  {/* Floating Gold Crown */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-2xl mb-1 text-amber-500"
                  >
                    👑
                  </motion.div>
                  <div className="w-14 h-14 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-amber-900 font-bold shadow-lg text-base mb-3">
                    1st
                  </div>
                  <div className="w-full max-w-[110px] h-36 bg-gradient-to-t from-green-500 to-emerald-400 border border-green-200 rounded-t-2xl shadow-xl flex flex-col justify-end p-3 text-white">
                    <p className="text-xs font-black truncate leading-none">
                      {activeEvent.winners[0]?.name || 'N/A'}
                    </p>
                    <p className="text-[8px] text-white/80 mt-1 truncate leading-none font-semibold">
                      {activeEvent.winners[0]?.college || ''}
                    </p>
                  </div>
                </div>

                {/* 3rd Place (Right) */}
                <div className="flex flex-col items-center flex-1 z-10">
                  <div className="w-10 h-10 rounded-full bg-orange-200 border-2 border-white flex items-center justify-center text-orange-850 font-bold shadow-md text-xs mb-3">
                    3rd
                  </div>
                  <div className="w-full max-w-[100px] h-20 bg-gradient-to-t from-orange-200 to-orange-100 border border-orange-300/35 rounded-t-2xl shadow flex flex-col justify-end p-3">
                    <p className="text-[10px] font-extrabold text-slate-800 truncate leading-none">
                      {activeEvent.winners[2]?.name || 'N/A'}
                    </p>
                    <p className="text-[8px] text-slate-450 mt-1 truncate leading-none">
                      {activeEvent.winners[2]?.college || ''}
                    </p>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Right Column: Leaderboard Table */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Search filter in leaderboard */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
              <input
                type="text"
                placeholder="Search leaderboard by candidate or college..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl glass-input text-slate-800 placeholder-slate-450 text-xs shadow-inner"
              />
            </div>

            {/* Results Standings list */}
            <div className="glass-panel rounded-3xl overflow-hidden border-slate-200/50 shadow-sm">
              <div className="p-4 bg-slate-100/50 border-b border-slate-200/50 flex justify-between text-[10px] font-bold text-slate-400 uppercase font-sans">
                <span>Rank / Participant</span>
                <span>Evaluation Score</span>
              </div>
              
              <div className="divide-y divide-slate-100 font-sans text-xs">
                {filteredWinners.map((w, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50/40">
                    <div className="flex items-center space-x-3.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border ${
                        w.rank === 1 ? 'bg-amber-100 border-amber-300 text-amber-800' :
                        w.rank === 2 ? 'bg-slate-100 border-slate-350 text-slate-700' :
                        'bg-orange-100 border-orange-300 text-orange-850'
                      }`}>
                        {w.rank}
                      </span>
                      <div>
                        <p className="font-bold text-slate-850">{w.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">{w.college}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-slate-800">{w.score}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">{w.prize}</p>
                    </div>
                  </div>
                ))}

                {filteredWinners.length === 0 && (
                  <div className="p-8 text-center text-slate-400">
                    No results found.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: INTERACTIVE CERTIFICATE GENERATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
          
          {/* Certificate Request Form */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border-slate-200/50 shadow-md space-y-5">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-800">E-Certificate Portal</h2>
              <p className="text-xs text-slate-405 leading-relaxed font-sans">
                Enter your unique Registration ID to retrieve your digital certificate. Hint: Use <strong>REG-10492</strong> (1st Rank) or <strong>REG-10524</strong> (Participant).
              </p>
            </div>

            <form onSubmit={handleGenerateCertificate} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-2">Registration ID</label>
                <input
                  type="text"
                  placeholder="e.g. REG-10492"
                  value={certRegId}
                  onChange={(e) => setCertRegId(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass-input text-slate-800 uppercase font-mono font-bold"
                />
                {certError && <p className="text-red-500 text-xs mt-1.5 font-semibold">{certError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-slate-850 hover:bg-slate-900 text-white font-semibold text-xs shadow-md transition-all"
              >
                Fetch Certificate
              </button>
            </form>
          </div>

          {/* Certificate Preview Box */}
          <div className="lg:col-span-7 flex justify-center">
            <AnimatePresence mode="wait">
              {certResult ? (
                <motion.div
                  key="certificate"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full max-w-lg border border-amber-200 bg-gradient-to-tr from-stone-50 to-amber-50/20 p-8 rounded-[32px] shadow-xl relative overflow-hidden text-center flex flex-col space-y-6 font-serif border-double"
                  style={{ borderWidth: '6px' }}
                >
                  {/* Decorative Borders */}
                  <div className="absolute inset-2 border border-amber-200/50 pointer-events-none" />
                  
                  {/* Certificate Header */}
                  <div className="space-y-1">
                    <div className="flex justify-center mb-1 text-amber-600 text-3xl">🏆</div>
                    <h3 className="text-xl font-bold tracking-widest text-amber-850 uppercase leading-none font-serif">Certificate of Achievement</h3>
                    <p className="text-[9px] uppercase tracking-wider text-slate-400 font-sans font-bold pt-1">AURA'26 Cultural Secretariat</p>
                  </div>

                  {/* Body text */}
                  <div className="space-y-4">
                    <p className="text-xs italic text-slate-500">This credential is proudly presented to</p>
                    <div>
                      <h4 className="text-2xl font-black text-slate-950 font-serif underline decoration-amber-300 decoration-wavy underline-offset-8">
                        {certResult.name}
                      </h4>
                      <p className="text-xs text-slate-650 font-sans font-medium mt-3">{certResult.college}</p>
                    </div>
                    
                    <p className="text-xs text-slate-600 leading-relaxed font-sans px-4">
                      for securing <strong className="text-amber-800">{certResult.awardRank}</strong> in the contest 
                      <strong> "{certResult.eventName}"</strong> held during the annual cultural fest on October 15-16, 2026.
                    </p>
                  </div>

                  {/* Certificate Footer Row */}
                  <div className="grid grid-cols-3 gap-2 pt-6 items-end font-sans text-[9px] text-slate-400 border-t border-amber-200/40">
                    <div className="space-y-1">
                      <p className="font-mono text-slate-800 font-bold">{certResult.regId}</p>
                      <p className="font-semibold uppercase tracking-wider">Verification ID</p>
                    </div>
                    <div className="flex justify-center pb-2">
                      <div className="w-12 h-12 rounded-full border border-amber-300 flex items-center justify-center bg-amber-500/10 font-bold text-amber-700 text-xs shadow-inner">
                        SEAL
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-800 font-bold italic">K. Malhotra</p>
                      <p className="font-semibold uppercase tracking-wider">Fest Registrar</p>
                    </div>
                  </div>

                  {/* Download button overlay */}
                  <div className="pt-2">
                    <button
                      onClick={() => alert(`Simulated Download: Certificate file AURA26_${certResult.regId}.pdf saved.`)}
                      className="px-6 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center mx-auto font-sans"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      <span>Download Certificate PDF</span>
                    </button>
                  </div>

                </motion.div>
              ) : (
                <div className="w-full max-w-lg bg-white/40 border border-slate-200 border-dashed rounded-[32px] p-16 text-center text-slate-400 font-sans flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                  <HelpCircle className="w-12 h-12 text-slate-350" />
                  <div>
                    <h4 className="font-bold text-slate-700 text-sm">No Certificate Loaded</h4>
                    <p className="text-xs text-slate-450 mt-1 max-w-xs mx-auto">
                      Enter your registration ID in the query panel on the left to verify credentials and generate certificates.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* SECTION 3: ACHIEVEMENT BADGES GRID */}
        <div className="space-y-6 pt-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Achievement Badges</h2>
            <p className="text-xs text-slate-500 font-sans mt-0.5">Collect digital accomplishments by placing in fests.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge) => (
              <div key={badge.id} className="glass-panel rounded-2xl p-5 border-slate-200/50 shadow-sm text-left flex items-start space-x-4 font-sans">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${badge.color} flex items-center justify-center text-xl shadow-md shrink-0`}>
                  {badge.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-sm">{badge.title}</h4>
                  <p className="text-xs text-slate-450 leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
