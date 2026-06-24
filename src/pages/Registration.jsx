import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, School, Users, FileText, CheckCircle2, ChevronRight, ChevronLeft, Upload, Plus, Trash2, Calendar, Ticket, Download } from 'lucide-react';
import { events } from '../data/eventsData';

export default function Registration() {
  const [searchParams] = useSearchParams();
  const eventIdParam = searchParams.get('event');

  // Step state (1 to 5)
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Form Fields State
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    idCardName: ''
  });

  const [collegeDetails, setCollegeDetails] = useState({
    collegeName: '',
    rollNo: '',
    department: 'Computer Science',
    year: '3rd Year'
  });

  const [selectedEventId, setSelectedEventId] = useState(eventIdParam || events[0].id);
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]); // Array of { name: '', email: '' }

  // Derive selected event details
  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];
  const isSolo = selectedEvent.maxTeamSize === 1;

  // Auto-fill or adjust team fields based on event selection
  useEffect(() => {
    if (isSolo) {
      setTeamName('Solo');
      setTeamMembers([]);
    } else {
      setTeamName('');
      // Pre-populate with min team size (excluding leader, so minTeamSize - 1)
      const additionalRequired = Math.max(0, selectedEvent.minTeamSize - 1);
      const membersArray = Array.from({ length: additionalRequired }, () => ({ name: '', email: '' }));
      setTeamMembers(membersArray);
    }
    setErrors({});
  }, [selectedEventId, isSolo]);

  // Form validation per step
  const validateStep = () => {
    let tempErrors = {};

    if (step === 1) {
      if (!personalDetails.name.trim()) tempErrors.name = 'Full Name is required.';
      if (!personalDetails.email.trim()) {
        tempErrors.email = 'Email address is required.';
      } else if (!/\S+@\S+\.\S+/.test(personalDetails.email)) {
        tempErrors.email = 'Enter a valid email.';
      }
      if (!personalDetails.phone.trim()) {
        tempErrors.phone = 'Phone number is required.';
      } else if (!/^[0-9]{10}$/.test(personalDetails.phone)) {
        tempErrors.phone = 'Enter a valid 10-digit mobile number.';
      }
    }

    if (step === 2) {
      if (!collegeDetails.collegeName.trim()) tempErrors.collegeName = 'College Name is required.';
      if (!collegeDetails.rollNo.trim()) tempErrors.rollNo = 'Roll number / UID is required.';
    }

    if (step === 3) {
      if (!isSolo && !teamName.trim()) {
        tempErrors.teamName = 'Team Name is required.';
      }
      
      // Validate active team members
      if (!isSolo) {
        const memberErrors = [];
        teamMembers.forEach((member, index) => {
          const errorsObj = {};
          if (!member.name.trim()) errorsObj.name = 'Name required';
          if (!member.email.trim()) {
            errorsObj.email = 'Email required';
          } else if (!/\S+@\S+\.\S+/.test(member.email)) {
            errorsObj.email = 'Invalid email';
          }
          if (Object.keys(errorsObj).length > 0) {
            memberErrors[index] = errorsObj;
          }
        });
        if (memberErrors.length > 0) {
          tempErrors.teamMembers = memberErrors;
        }

        // Validate count
        const totalTeamSize = teamMembers.length + 1; // plus leader
        if (totalTeamSize < selectedEvent.minTeamSize || totalTeamSize > selectedEvent.maxTeamSize) {
          tempErrors.teamSize = `Team size must be between ${selectedEvent.minTeamSize} and ${selectedEvent.maxTeamSize} members. Current: ${totalTeamSize}`;
        }
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleAddMember = () => {
    if (teamMembers.length + 1 < selectedEvent.maxTeamSize) {
      setTeamMembers([...teamMembers, { name: '', email: '' }]);
    }
  };

  const handleRemoveMember = (index) => {
    const updated = [...teamMembers];
    updated.splice(index, 1);
    setTeamMembers(updated);
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  // Drag and drop mock file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPersonalDetails({ ...personalDetails, idCardName: file.name });
    }
  };

  // Auto generated registration ID on submit
  const [generatedRegId, setGeneratedRegId] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      const regId = 'REG-' + Math.floor(10000 + Math.random() * 90000);
      setGeneratedRegId(regId);
      setStep(5);
    }
  };

  // Step Icons mapping
  const stepsConfig = [
    { num: 1, label: 'Profile', icon: User },
    { num: 2, label: 'Academic', icon: School },
    { num: 3, label: 'Event', icon: Users },
    { num: 4, label: 'Summary', icon: FileText }
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-16 bg-slate-50">
      {/* Background circles */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-green-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-90 h-90 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        
        {/* Step Indicator Header (Hide on Success Step 5) */}
        {step < 5 && (
          <div className="mb-8">
            <div className="glass-panel rounded-3xl p-6 border-slate-200/50 shadow-sm flex items-center justify-between">
              {stepsConfig.map((s, index) => {
                const Icon = s.icon;
                const isCompleted = step > s.num;
                const isActive = step === s.num;
                return (
                  <div key={s.num} className="flex items-center flex-grow last:flex-grow-0">
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                          isCompleted
                            ? 'bg-green-500 border-green-500 text-white shadow-md shadow-green-500/20'
                            : isActive
                            ? 'bg-white border-green-500 text-green-600 ring-4 ring-green-100 font-bold'
                            : 'bg-white border-slate-200 text-slate-405 font-medium'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                      </div>
                      <span className={`text-[10px] sm:text-xs font-semibold ${isActive ? 'text-green-600' : 'text-slate-450'}`}>
                        {s.label}
                      </span>
                    </div>
                    
                    {index < stepsConfig.length - 1 && (
                      <div
                        className={`h-0.5 mx-2 sm:mx-4 flex-grow rounded transition-all duration-300 ${
                          isCompleted ? 'bg-green-500' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Multi-Step Wrapper */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel rounded-[28px] p-6 sm:p-10 border-slate-200/50 shadow-lg text-left"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-green-500" />
                <span>Personal details</span>
              </h2>

              <div className="space-y-5 font-sans">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
                  <input
                    type="text"
                    value={personalDetails.name}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl glass-input text-slate-800 shadow-sm"
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      value={personalDetails.email}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl glass-input text-slate-800 shadow-sm"
                      placeholder="student@college.edu"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={personalDetails.phone}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl glass-input text-slate-800 shadow-sm"
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Gender</label>
                  <div className="flex gap-4">
                    {['Male', 'Female', 'Other'].map((gender) => (
                      <label key={gender} className="flex items-center space-x-2 cursor-pointer font-medium text-slate-700 text-sm">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={personalDetails.gender === gender}
                          onChange={(e) => setPersonalDetails({ ...personalDetails, gender: e.target.value })}
                          className="w-4.5 h-4.5 text-green-500 border-slate-300 focus:ring-green-500 focus:ring-2"
                        />
                        <span>{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* College ID Card Upload Mockup */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Upload College ID Card (PDF / Image)</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-green-500/50 rounded-2xl p-6 bg-white/30 backdrop-blur-sm transition-colors text-center cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-750">
                      {personalDetails.idCardName ? personalDetails.idCardName : 'Click or Drag files to upload'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-sans">PDF, PNG, JPG files up to 2MB supported</p>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleNext}
                  className="px-6 py-3.5 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-md shadow-green-500/10 transition-all flex items-center"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel rounded-[28px] p-6 sm:p-10 border-slate-200/50 shadow-lg text-left"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <School className="w-6 h-6 mr-2 text-green-500" />
                <span>Academic & College Details</span>
              </h2>

              <div className="space-y-5 font-sans">
                {/* College Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">College / University Name</label>
                  <input
                    type="text"
                    value={collegeDetails.collegeName}
                    onChange={(e) => setCollegeDetails({ ...collegeDetails, collegeName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl glass-input text-slate-800 shadow-sm"
                    placeholder="Enter full university name"
                  />
                  {errors.collegeName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.collegeName}</p>}
                </div>

                {/* Roll Number / UID */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Roll Number / Student Registration ID</label>
                  <input
                    type="text"
                    value={collegeDetails.rollNo}
                    onChange={(e) => setCollegeDetails({ ...collegeDetails, rollNo: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl glass-input text-slate-800 shadow-sm"
                    placeholder="Roll Number / UID (e.g. 20BCE0192)"
                  />
                  {errors.rollNo && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.rollNo}</p>}
                </div>

                {/* Department & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Department / Stream</label>
                    <select
                      value={collegeDetails.department}
                      onChange={(e) => setCollegeDetails({ ...collegeDetails, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl glass-input text-slate-800 font-semibold shadow-sm"
                    >
                      <option>Computer Science / IT</option>
                      <option>Electronics / Electrical</option>
                      <option>Mechanical / Civil</option>
                      <option>Arts & Humanities</option>
                      <option>Business / Commerce</option>
                      <option>Design / Fashion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Year of Study</label>
                    <select
                      value={collegeDetails.year}
                      onChange={(e) => setCollegeDetails({ ...collegeDetails, year: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl glass-input text-slate-800 font-semibold shadow-sm"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Post Graduate</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold text-sm shadow-sm transition-all flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3.5 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-md shadow-green-500/10 transition-all flex items-center"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel rounded-[28px] p-6 sm:p-10 border-slate-200/50 shadow-lg text-left"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-green-500" />
                <span>Event & Team Selection</span>
              </h2>

              <div className="space-y-6 font-sans">
                {/* Event Select Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Select Contest / Competition</label>
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl glass-input text-slate-800 font-semibold shadow-sm"
                  >
                    {events.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.title} ({e.category.toUpperCase()}) - Entry ₹{e.fee}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-400 mt-1.5">
                    Rules: {selectedEvent.teamSize} limit, Venue: {selectedEvent.venue}
                  </p>
                </div>

                {/* Team Info Container (If group event) */}
                {!isSolo ? (
                  <div className="p-5 sm:p-6 bg-slate-100/30 border border-slate-200/40 rounded-3xl space-y-4">
                    <h3 className="text-base font-bold text-slate-850 flex items-center justify-between">
                      <span>Team Configuration</span>
                      <span className="text-xs font-semibold text-slate-400 font-sans">
                        Requires: {selectedEvent.minTeamSize}-{selectedEvent.maxTeamSize} members
                      </span>
                    </h3>

                    {/* Team Size constraint warning */}
                    {errors.teamSize && (
                      <p className="text-red-500 text-xs font-semibold mb-2">{errors.teamSize}</p>
                    )}

                    {/* Team Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Team Name</label>
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl glass-input text-slate-800 shadow-sm"
                        placeholder="Enter your cool team name"
                      />
                      {errors.teamName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.teamName}</p>}
                    </div>

                    {/* Team Members List */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-550 uppercase">Additional Members Details</span>
                        <button
                          type="button"
                          onClick={handleAddMember}
                          disabled={teamMembers.length + 1 >= selectedEvent.maxTeamSize}
                          className="flex items-center text-xs font-bold text-green-600 hover:text-green-700 disabled:text-slate-350 disabled:no-underline"
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" /> Add Member
                        </button>
                      </div>

                      {teamMembers.map((member, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 bg-white/50 rounded-2xl border border-slate-100 items-start">
                          <div className="sm:col-span-5">
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                              placeholder={`Member #${index + 2} Name`}
                              className="w-full px-3 py-2 rounded-xl glass-input text-xs font-sans"
                            />
                            {errors.teamMembers?.[index]?.name && (
                              <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.teamMembers[index].name}</p>
                            )}
                          </div>
                          <div className="sm:col-span-6">
                            <input
                              type="email"
                              value={member.email}
                              onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                              placeholder={`Member #${index + 2} Email`}
                              className="w-full px-3 py-2 rounded-xl glass-input text-xs font-sans"
                            />
                            {errors.teamMembers?.[index]?.email && (
                              <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.teamMembers[index].email}</p>
                            )}
                          </div>
                          <div className="sm:col-span-1 flex justify-center pt-1.5">
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(index)}
                              className="p-1 text-slate-400 hover:text-red-500 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      <p className="text-[10px] text-slate-400 leading-snug">
                        * Note: You are considered the Team Leader (Member #1). Additional member accounts will receive invitation confirmations on registration.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50/50 border border-green-150 rounded-2xl text-green-700 text-xs font-medium">
                    ✨ You selected a <strong>Solo Event</strong>. No additional team configuration is required.
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold text-sm shadow-sm transition-all flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3.5 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-md shadow-green-500/10 transition-all flex items-center"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel rounded-[28px] p-6 sm:p-10 border-slate-200/50 shadow-lg text-left"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-green-500" />
                <span>Review Registration Details</span>
              </h2>

              <div className="space-y-6 font-sans text-sm">
                
                {/* Summary Slip */}
                <div className="border border-green-100 bg-green-50/10 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-extrabold text-slate-800 text-base">Selected Event Summary</span>
                    <span className="font-bold text-green-600 text-base">Entry Fee: ₹{selectedEvent.fee}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Competition</span>
                      <span className="font-bold text-slate-850 mt-1 block">{selectedEvent.title}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Category</span>
                      <span className="font-bold text-slate-850 mt-1 block uppercase">{selectedEvent.category}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Venue</span>
                      <span className="font-bold text-slate-850 mt-1 block">{selectedEvent.venue}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Timings</span>
                      <span className="font-bold text-slate-850 mt-1 block">{selectedEvent.date} ({selectedEvent.time.split(' - ')[0]})</span>
                    </div>
                  </div>
                </div>

                {/* Team & Member Details summary */}
                <div className="border border-slate-200/60 rounded-3xl p-6 space-y-4">
                  <h3 className="font-extrabold text-slate-800 border-b border-slate-100 pb-2">Registrant & Team Details</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Team Lead Name</span>
                      <span className="font-semibold text-slate-800">{personalDetails.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Contact Phone</span>
                      <span className="font-semibold text-slate-800">{personalDetails.phone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">College Name</span>
                      <span className="font-semibold text-slate-800">{collegeDetails.collegeName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Team Mode / Name</span>
                      <span className="font-semibold text-slate-800">{isSolo ? 'Solo' : `${teamName} (${teamMembers.length + 1} Members)`}</span>
                    </div>
                  </div>

                  {/* List of members summary */}
                  {!isSolo && teamMembers.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] text-slate-450 font-bold uppercase block mb-1.5">Additional Members</span>
                      <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100 max-h-36 overflow-y-auto space-y-1.5">
                        {teamMembers.map((m, idx) => (
                          <div key={idx} className="text-xs flex items-center justify-between text-slate-500 font-medium">
                            <span>#{idx + 2} {m.name}</span>
                            <span>{m.email}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* T&C Mock Checkbox */}
                <div className="flex items-start space-x-2 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    defaultChecked
                    className="w-4.5 h-4.5 text-green-500 border-slate-350 focus:ring-green-500 rounded mt-0.5"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-500 leading-snug cursor-pointer select-none">
                    I declare that all details are accurate and that our team agrees to adhere to the event rules, code of conduct, and schedule timings.
                  </label>
                </div>

              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold text-sm shadow-sm transition-all flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1.5" />
                  <span>Back</span>
                </button>
                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg text-white font-bold text-sm shadow-md shadow-green-500/10 transition-all flex items-center"
                  >
                    <span>Submit & Generate Ticket</span>
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel rounded-[32px] p-6 sm:p-10 border-slate-200/50 shadow-xl text-center space-y-6"
            >
              {/* Animated SVG Checkmark */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
                  className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border border-green-200 shadow-md shadow-green-500/5"
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-10 h-10 text-green-500"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </motion.svg>
                </motion.div>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">Registration Successful!</h2>
                <p className="text-slate-500 mt-2 font-sans text-sm max-w-md mx-auto">
                  Your seat has been reserved for <strong>{selectedEvent.title}</strong>. An invitation link has been dispatched to all team members' emails.
                </p>
              </div>

              {/* Digital Glass Receipt/Ticket */}
              <div className="border border-green-150/60 bg-gradient-to-tr from-white to-green-50/20 rounded-3xl p-6 max-w-md mx-auto text-left shadow-inner relative overflow-hidden font-sans">
                
                {/* Visual Dotted tear lines */}
                <div className="absolute top-0 right-1/4 bottom-0 border-l border-dashed border-slate-200 hidden sm:block" />
                <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-slate-200 sm:hidden" />
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                  
                  {/* Ticket Details */}
                  <div className="sm:col-span-3 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Ticket className="w-5 h-5 text-green-500" />
                      <span className="text-xs font-bold tracking-widest text-slate-400 uppercase leading-none">Admission Ticket</span>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-800 leading-snug">{selectedEvent.title}</h4>
                      <p className="text-[10px] text-slate-450 uppercase font-bold mt-0.5">{selectedEvent.category}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">REG ID</span>
                        <span className="font-extrabold text-slate-800">{generatedRegId}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">LEAD NAME</span>
                        <span className="font-extrabold text-slate-800 truncate block">{personalDetails.name}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">DATE & TIME</span>
                        <span className="font-extrabold text-slate-800 leading-snug">{selectedEvent.date}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">VENUE</span>
                        <span className="font-extrabold text-slate-800 leading-snug truncate block">{selectedEvent.venue.split(' (')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Barcode Mockup */}
                  <div className="sm:col-span-1 flex sm:flex-col items-center justify-center sm:space-y-2 border-t border-slate-100 sm:border-t-0 pt-4 sm:pt-0">
                    <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-inner">
                      <div className="w-8 h-8 flex flex-col justify-between shrink-0">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="flex justify-between">
                            {Array.from({ length: 4 }).map((_, j) => (
                              <div key={j} className={`w-1 h-1 rounded-sm ${Math.random() > 0.4 ? 'bg-slate-800' : 'bg-transparent'}`} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="text-[8px] font-mono text-slate-400 font-bold uppercase ml-3 sm:ml-0">AURA-2026</span>
                  </div>

                </div>

              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <button
                  onClick={() => alert('Simulated PDF Download: Admission ticket saved successfully!')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-850 hover:bg-slate-900 text-white font-semibold text-sm transition-all flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span>Download Ticket PDF</span>
                </button>
                <Link
                  to="/events"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-md shadow-green-500/10 transition-all flex items-center justify-center"
                >
                  <span>Explore More Contests</span>
                </Link>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
