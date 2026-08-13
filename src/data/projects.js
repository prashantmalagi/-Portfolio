/**
 * Numbered projects — rendered as alternating left/right cards.
 * If a project has `image`, the real screenshot is shown; otherwise
 * the `iconKey` SVG placeholder is used.
 */

export const projects = [
  {
  id: 0,
  num: '00',
  title: 'AI Thumbnail Generator',
  description:
    'An AI-powered web application that generates professional thumbnails from user prompts using a React frontend and AI-powered image generation.',
  badges: ['React', 'Node.js', 'Express.js', 'Sharp', 'REST API'],
  github: 'https://github.com/prashantmalagi/ai-thumbnail-generator',
  liveDemo: 'https://ai-thumbnail-generator-gamma.vercel.app/',
  iconKey: 'ai',
  name: 'AI Thumbnail Generator',
  reverse: false,
  },
  {
    id: 1,
    num: '01',
    title: 'Portfolio Website',
    description:
      'A premium, fully responsive personal portfolio built from scratch using vanilla HTML, CSS, and JavaScript. Features glassmorphism design, GSAP animations, 3D tilt effects, and a custom cursor system.',
    badges: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    github: 'https://github.com/prashantmalagi/FUTURE_FS_TaskNumber1',
    liveDemo: '#',
    iconKey: 'portfolio',
    name: 'Portfolio Website',
    reverse: false,
  },
  {
    id: 2,
    num: '02',
    title: 'Instagram Recommender System',
    description:
      'A scalable social media platform featuring a custom-built Hybrid Recommendation Engine. Delivers personalized content feeds by scoring users against trending metrics, social graphs, content topics, and collaborative filtering — all served through a lightning-fast FastAPI microservice architecture.',
    badges: ['React', 'FastAPI', 'PostgreSQL', 'Python'],
    github: 'https://github.com/prashantmalagi/instagram-recommender-system',
    liveDemo: null,
    image: '/recommender-dashboard.png',
    name: 'Instagram Recommender System',
    reverse: false,
  },
  {
    id: 3,
    num: '03',
    title: 'Mini CRM',
    description:
      'A full-stack Customer Relationship Management system with JWT authentication. Frontend built with HTML, CSS, and JavaScript; backend powered by Node.js, Express.js, and MongoDB.',
    badges: ['HTML', 'CSS', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/prashantmalagi/FUTURE_FS_TaskNumber2',
    liveDemo: null,
    iconKey: 'crm',
    name: 'Mini CRM',
    reverse: false,
  },
  {
    id: 4,
    num: '04',
    title: 'Interview Master',
    description:
    'A full-stack AI-powered interview preparation platform with a React frontend and Node.js backend. Includes secure authentication, interactive interview sessions, AI-powered interview assistance, and interview report generation.',
    badges: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'AI'],
    github: 'https://github.com/prashantmalagi/Interview-Masterr',
    liveDemo: 'https://interview-masterr.vercel.app/',
    iconKey: 'interview',
    name: 'Interview Master',
    reverse: true,
  },
  {
    id: 5,
    num: '05',
    title: 'Krishi Mitra',
    description:
      'An AI-powered agricultural assistant built with Python & Flask. Integrates Google Gemini AI via OpenRouter, text-to-speech (gTTS), email verification (smtplib), and a modern UI with Jinja2, Tailwind CSS, and Bootstrap.',
    badges: ['Python', 'Flask', 'SQLite', 'Gemini AI', 'Tailwind'],
    github: 'https://github.com/prathambalehosurr/UB-1051',
    liveDemo: null,
    iconKey: 'ai',
    name: 'Krishi Mitra',
    reverse: true,
  },  
  
  {
    id: 6,
    num: '06',
    title: 'Gym Management System',
    description:
      'A modern, responsive gym website created to promote a local fitness business. Features a clean design with membership plans, trainer profiles, and a contact section.',
    badges: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/prashantmalagi/FUTURE_FS_TaskNumber3',
    liveDemo: null,
    iconKey: 'gym',
    name: 'Gym Management',
    reverse: false,
  },
  {
    id: 7,
    num: '07',
    title: 'Vault – Digital Banking',
    description:
      'A digital banking web application with a clean frontend and a Node.js REST API backend. Supports account management, transactions, and secure data operations.',
    badges: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'REST API'],
    github: 'https://github.com/prashantmalagi/Vault',
    liveDemo: null,
    iconKey: 'bank',
    name: 'Vault Banking',
    reverse: true,
  },
  {
    id: 8,
    num: '08',
    title: 'Student Records API',
    description:
      'A robust REST API built using Node.js, Express, and PostgreSQL for managing student records. Supports full CRUD operations, authentication, and efficient database queries.',
    badges: ['Node.js', 'Express', 'PostgreSQL', 'REST API'],
    github: 'https://github.com/prashantmalagi/student-api',
    liveDemo: null,
    iconKey: 'api',
    name: 'Student Records API',
    reverse: true,
  },
  {
    id: 9,
    num: '09',
    title: 'Interview Master',
    description:
    'A full-stack AI-powered interview preparation platform with a React frontend and Node.js backend. Includes secure authentication, interactive interview sessions, AI-powered interview assistance, and interview report generation.',
    badges: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'AI'],
    github: 'https://github.com/prashantmalagi/Interview-Masterr',
    liveDemo: 'https://interview-masterr.vercel.app/',
    iconKey: 'interview',
    name: 'Interview Master',
    reverse: true,
  },


  
  
];
