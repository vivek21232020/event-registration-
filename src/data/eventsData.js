// Mock Data for Next-Gen College Fest Talent Registration System

export const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'music', name: 'Music' },
  { id: 'dance', name: 'Dance' },
  { id: 'drama', name: 'Drama' },
  { id: 'finearts', name: 'Fine Arts' },
  { id: 'tech', name: 'Tech & Coding' },
  { id: 'literary', name: 'Literary' }
];

export const events = [
  {
    id: 'rhythm-blues',
    title: 'Rhythm & Blues',
    tagline: 'The Ultimate Solo Singing Showdown',
    category: 'music',
    teamSize: '1 (Solo)',
    minTeamSize: 1,
    maxTeamSize: 1,
    fee: 150,
    venue: 'Main Auditorium (Indoor)',
    date: '2026-10-15',
    time: '10:00 AM - 01:00 PM',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Unleash your vocal prowess and captivate the audience in our premier solo singing competition. Whether your style is classical, pop, jazz, or acoustic, the stage is yours to shine.',
    rules: [
      'Time limit: Maximum 4 minutes per participant.',
      'Background karaoke tracks must be submitted in MP3 format 1 hour before the event.',
      'Only vocals will be judged. No instruments are allowed on stage except a simple acoustic guitar for accompaniment if played by the participant.',
      'Language of the song can be English, Hindi, or any regional Indian language.',
      'Decisions of the judges will be final and binding.'
    ],
    prizes: {
      first: '₹10,000 + Trophy + Certificate',
      second: '₹5,000 + Certificate',
      third: '₹2,500 + Certificate'
    },
    coordinators: [
      { name: 'Rahul Sharma', phone: '+91 98765 43210' },
      { name: 'Sneha Iyer', phone: '+91 87654 32109' }
    ]
  },
  {
    id: 'groove-junction',
    title: 'Groove Junction',
    tagline: 'Synchronized Crew Dance Battle',
    category: 'dance',
    teamSize: '4 - 12 Members',
    minTeamSize: 4,
    maxTeamSize: 12,
    fee: 500,
    venue: 'Open Air Theatre (OAT)',
    date: '2026-10-15',
    time: '02:00 PM - 06:00 PM',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    description: 'Bring your dance crew, sync your steps, and dominate the stage. From Hip-Hop to Classical Fusion, show off your choreographic mastery, formation transitions, and high-energy routines.',
    rules: [
      'Team size must be between 4 and 12 members.',
      'Performance duration should be 6 to 8 minutes.',
      'Audio tracks must be emailed to the coordinators in WAV/MP3 format at least 24 hours prior.',
      'Props are allowed, but flammable materials, water, or glass are strictly prohibited on stage.',
      'Teams will be judged on choreography, synchronization, costume, expression, and overall stage utilization.'
    ],
    prizes: {
      first: '₹25,000 + Trophy + Certificate',
      second: '₹12,000 + Certificate',
      third: '₹6,000 + Certificate'
    },
    coordinators: [
      { name: 'Amit Patel', phone: '+91 99887 76655' },
      { name: 'Neha Verma', phone: '+91 88776 65544' }
    ]
  },
  {
    id: 'nukkad-natak',
    title: 'Nukkad Natak',
    tagline: 'Raise Your Voice on Social Issues',
    category: 'drama',
    teamSize: '8 - 20 Members',
    minTeamSize: 8,
    maxTeamSize: 20,
    fee: 400,
    venue: 'College Quadrangle (Outdoor)',
    date: '2026-10-16',
    time: '11:00 AM - 02:00 PM',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    description: 'Use the oldest form of expression to deliver a powerful social message. Captivate the crowd with strong vocals, acoustic beats, and highly interactive physical acting in an open space.',
    rules: [
      'Team size: 8 to 20 actors/musicians.',
      'Time limit: Maximum 15 minutes per team. Negative marking for exceeding the limit.',
      'Electronic microphones, speakers, or pre-recorded audio are NOT allowed.',
      'Only acoustic instruments like Dholak, Flute, Harmonium, and Manjira are permitted.',
      'Play should focus primarily on a relevant social or environmental topic.'
    ],
    prizes: {
      first: '₹20,000 + Trophy + Certificate',
      second: '₹10,000 + Certificate',
      third: '₹5,000 + Certificate'
    },
    coordinators: [
      { name: 'Karan Malhotra', phone: '+91 91234 56789' },
      { name: 'Priya Das', phone: '+91 90123 45678' }
    ]
  },
  {
    id: 'canvas-magic',
    title: 'Canvas Magic',
    tagline: 'Speed Painting & Expressive Art',
    category: 'finearts',
    teamSize: '1 (Solo)',
    minTeamSize: 1,
    maxTeamSize: 1,
    fee: 100,
    venue: 'Art Gallery Lobby',
    date: '2026-10-16',
    time: '09:00 AM - 11:30 AM',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
    description: 'Let your brushes speak. Draw and paint your heart out under time limits. A surprise theme will be revealed at the commencement of the event.',
    rules: [
      'This is a solo event.',
      'Time duration is exactly 2 hours.',
      'Standard drawing paper/canvas (A3 size) will be provided by the organizers.',
      'Participants must bring their own painting materials (watercolors, acrylics, brushes, pencils, etc.).',
      'No digital drawing tools or templates are allowed.'
    ],
    prizes: {
      first: '₹5,000 + Trophy + Certificate',
      second: '₹2,500 + Certificate',
      third: '₹1,500 + Certificate'
    },
    coordinators: [
      { name: 'Riya Sen', phone: '+91 85544 33221' },
      { name: 'Rohan Gupta', phone: '+91 74433 22110' }
    ]
  },
  {
    id: 'code-combat',
    title: 'Code Combat',
    tagline: 'Battle of Algorithms and Speed',
    category: 'tech',
    teamSize: '1 - 2 Members',
    minTeamSize: 1,
    maxTeamSize: 2,
    fee: 200,
    venue: 'Advanced CS Laboratory',
    date: '2026-10-15',
    time: '11:30 AM - 01:30 PM',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    description: 'For all the developers and problem-solvers out there, test your coding mettle against the clock. Crack complex logic, design efficient algorithms, and climb the leaderboard in real time.',
    rules: [
      'Teams can consist of 1 or 2 participants.',
      'Languages supported: C++, Java, Python, JavaScript.',
      'The contest will be hosted on our local sandbox system. Use of internet, phones, or external notes is banned.',
      'Judging criteria: Number of problems solved, followed by execution time and penalty points.'
    ],
    prizes: {
      first: '₹15,000 + Trophy + Certificate',
      second: '₹8,000 + Certificate',
      third: '₹4,000 + Certificate'
    },
    coordinators: [
      { name: 'Vikram Rathore', phone: '+91 99001 12233' },
      { name: 'Pooja Krishnan', phone: '+91 98877 66112' }
    ]
  },
  {
    id: 'battle-bands',
    title: 'Battle of Bands',
    tagline: 'Electric Rock & Fusion Showdown',
    category: 'music',
    teamSize: '3 - 8 Members',
    minTeamSize: 3,
    maxTeamSize: 8,
    fee: 800,
    venue: 'Main Sports Ground Stage',
    date: '2026-10-16',
    time: '06:00 PM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
    description: 'Electric riffs, thunderous beats, and explosive energy! Bands from colleges nationwide face off under the night sky. Rock, metal, pop, or fusion - let your instruments roar.',
    rules: [
      'Bands must have between 3 and 8 members.',
      'Total stage time: 15 minutes (including setup and soundcheck). Exceeding leads to heavy penalties.',
      'A basic 5-piece drum kit and standard amplifiers are provided. Bands must bring their own guitars, keyboards, processors, and cables.',
      'No pre-recorded synth tracks or backing tracks allowed. Everything must be live.'
    ],
    prizes: {
      first: '₹50,000 + Trophy + Certificate',
      second: '₹25,000 + Certificate',
      third: '₹12,000 + Certificate'
    },
    coordinators: [
      { name: 'Kabir Mehta', phone: '+91 82233 44556' },
      { name: 'Divya Joshi', phone: '+91 81122 33445' }
    ]
  },
  {
    id: 'wordsmith',
    title: 'Wordsmith',
    tagline: 'Creative Writing & Poetry Showdown',
    category: 'literary',
    teamSize: '1 (Solo)',
    minTeamSize: 1,
    maxTeamSize: 1,
    fee: 50,
    venue: 'Seminar Hall 1',
    date: '2026-10-15',
    time: '04:00 PM - 05:30 PM',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    description: 'If words are your superpower, this is your battleground. Weave stories that capture emotions, or write poetry that resonates with the soul. A selection of prompts will ignite your imagination.',
    rules: [
      'This is a solo creative writing competition.',
      'Participants will choose either Poetry or Short Story writing.',
      'Topic will be given on the spot. Time duration: 90 minutes.',
      'Submission can be in English or Hindi.',
      'Plagiarism is strictly prohibited and will lead to instant disqualification.'
    ],
    prizes: {
      first: '₹4,000 + Certificate',
      second: '₹2,000 + Certificate',
      third: '₹1,000 + Certificate'
    },
    coordinators: [
      { name: 'Ananya Roy', phone: '+91 76655 44332' },
      { name: 'Varun Kapoor', phone: '+91 75544 33221' }
    ]
  }
];

export const statistics = [
  { label: 'Total Events', value: 30, suffix: '+' },
  { label: 'Registered Participants', value: 1850, suffix: '+' },
  { label: 'Colleges Represented', value: 45, suffix: '' },
  { label: 'Cash Prizes Worth', value: 200, suffix: 'K+' }
];

export const mockRegistrations = [
  {
    regId: 'REG-10492',
    name: 'Aishwarya Nair',
    email: 'aishwarya@iitb.ac.in',
    phone: '9876543210',
    college: 'IIT Bombay',
    eventName: 'Rhythm & Blues',
    eventCategory: 'music',
    teamName: 'Solo',
    date: '2026-06-21',
    status: 'Approved'
  },
  {
    regId: 'REG-10511',
    name: 'Siddharth Sen',
    email: 'siddharth@bits.ac.in',
    phone: '8765432109',
    college: 'BITS Pilani',
    eventName: 'Code Combat',
    eventCategory: 'tech',
    teamName: 'BitCrackers',
    date: '2026-06-22',
    status: 'Approved'
  },
  {
    regId: 'REG-10524',
    name: 'Meera Deshmukh',
    email: 'meera.d@srcc.du.ac.in',
    phone: '7654321098',
    college: 'SRCC, Delhi',
    eventName: 'Groove Junction',
    eventCategory: 'dance',
    teamName: 'The Funk Syndicate',
    date: '2026-06-22',
    status: 'Pending'
  },
  {
    regId: 'REG-10530',
    name: 'Aditya Roy',
    email: 'aditya.r@vit.edu',
    phone: '9012345678',
    college: 'VIT Vellore',
    eventName: 'Battle of Bands',
    eventCategory: 'music',
    teamName: 'Acoustic Chaos',
    date: '2026-06-23',
    status: 'Approved'
  },
  {
    regId: 'REG-10542',
    name: 'Tanvi Joshi',
    email: 'tanvi@nift.ac.in',
    phone: '8877665544',
    college: 'NIFT Delhi',
    eventName: 'Canvas Magic',
    eventCategory: 'finearts',
    teamName: 'Solo',
    date: '2026-06-23',
    status: 'Approved'
  }
];

export const leaderboardData = [
  {
    eventId: 'rhythm-blues',
    eventName: 'Rhythm & Blues (Solo Singing)',
    winners: [
      { rank: 1, name: 'Aishwarya Nair', college: 'IIT Bombay', prize: '₹10,000 + Trophy', score: '98/100' },
      { rank: 2, name: 'Rohan Deshpande', college: 'BITS Pilani', prize: '₹5,000', score: '94/100' },
      { rank: 3, name: 'Tanya Goel', college: 'SRCC, Delhi', prize: '₹2,500', score: '90/100' }
    ]
  },
  {
    eventId: 'code-combat',
    eventName: 'Code Combat (Speed Coding)',
    winners: [
      { rank: 1, name: 'Siddharth & Raghav', college: 'BITS Pilani', team: 'BitCrackers', prize: '₹15,000 + Trophy', score: '6/6 (1h 12m)' },
      { rank: 2, name: 'Nikhil Saxena', college: 'IIT Delhi', team: 'NullPointerException', prize: '₹8,000', score: '5/6 (1h 45m)' },
      { rank: 3, name: 'Karthik & Sai', college: 'RVCE, Bangalore', team: 'CodeRaiders', prize: '₹4,000', score: '5/6 (1h 55m)' }
    ]
  },
  {
    eventId: 'groove-junction',
    eventName: 'Groove Junction (Group Dance)',
    winners: [
      { rank: 1, name: 'The Funk Syndicate', college: 'SRCC, Delhi', prize: '₹25,000 + Trophy', score: '96/100' },
      { rank: 2, name: 'Tandav Crew', college: 'DTU, Delhi', prize: '₹12,000', score: '93/100' },
      { rank: 3, name: 'Western Beats', college: 'Christ University', prize: '₹6,000', score: '89/100' }
    ]
  },
  {
    eventId: 'canvas-magic',
    eventName: 'Canvas Magic (Painting)',
    winners: [
      { rank: 1, name: 'Tanvi Joshi', college: 'NIFT Delhi', prize: '₹5,000 + Trophy', score: '95/100' },
      { rank: 2, name: 'Shruti Hegde', college: 'St. Xavier\'s Mumbai', prize: '₹2,500', score: '91/100' },
      { rank: 3, name: 'Preet Singh', college: 'CCA Chandigarh', prize: '₹1,500', score: '87/100' }
    ]
  }
];

export const badges = [
  { id: '1st', title: 'Golden Champion', desc: 'Secured 1st rank in a cultural/tech event', icon: '🏆', color: 'from-amber-400 to-yellow-600' },
  { id: '2nd', title: 'Silver Contender', desc: 'Secured 2nd rank in a cultural/tech event', icon: '🥈', color: 'from-slate-300 to-slate-500' },
  { id: '3rd', title: 'Bronze Achiever', desc: 'Secured 3rd rank in a cultural/tech event', icon: '🥉', color: 'from-amber-600 to-orange-700' },
  { id: 'part', title: 'Talent Maverick', desc: 'Showcased exemplary talent in the annual fest', icon: '✨', color: 'from-emerald-400 to-teal-600' }
];
