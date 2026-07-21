import React, { useState, useRef } from 'react';

// Skill category dataset based on portfolio requirements
const skillsData = [
  {
    id: "languages",
    title: "Languages",
    description: "Core programming languages for web, software systems, and data processing.",
    badge: "Core Stack",
    icon: "devicon-javascript-plain colored",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    skills: [
      { name: "Java", icon: "devicon-java-plain colored", desc: "OOP & Enterprise Logic", highlight: true },
      { name: "Python", icon: "devicon-python-plain colored", desc: "Scripting, FastAPI, ML", highlight: true },
      { name: "JavaScript", icon: "devicon-javascript-plain colored", desc: "ES6+, Async/Await, Web APIs", highlight: true },
      { name: "TypeScript", icon: "devicon-typescript-plain colored", desc: "Type Systems & Interfaces", highlight: true },
      { name: "C", icon: "devicon-c-plain colored", desc: "Memory Mgt & Low-Level Logic", highlight: false }
    ]
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Crafting modern, responsive, high-performance web applications with rich user interaction.",
    badge: "UI / UX Tech",
    icon: "devicon-react-original colored",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-8",
    skills: [
      { name: "HTML5", icon: "devicon-html5-plain colored", desc: "Semantic & Accessible Web", highlight: false },
      { name: "CSS3", icon: "devicon-css3-plain colored", desc: "Flexbox, Grid & Keyframes", highlight: false },
      { name: "React", icon: "devicon-react-original colored", desc: "Hooks, Context & Performance", highlight: true },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored", desc: "Utility-First Styling", highlight: true },
      { name: "Responsive Design", icon: "devicon-chrome-plain colored", desc: "Mobile-First Layouts & Media Queries", highlight: true }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    description: "Building scalable server architecture, restful services, and lightweight API backends.",
    badge: "Server & API",
    icon: "devicon-nodejs-plain colored",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    skills: [
      { name: "Node.js", icon: "devicon-nodejs-plain colored", desc: "Async Runtime & Event Loop", highlight: true },
      { name: "Express.js", icon: "devicon-express-original", desc: "RESTful Routing & Middleware", highlight: true },
      { name: "REST APIs", icon: "devicon-fastapi-plain colored", desc: "JSON Endpoints & Microservices", highlight: true },
      { name: "FastAPI", icon: "devicon-fastapi-plain colored", desc: "High Performance Python APIs", highlight: true }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    description: "Designing schemas and managing relational and document databases with high query performance.",
    badge: "Data Layer",
    icon: "devicon-postgresql-plain colored",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    skills: [
      { name: "MySQL", icon: "devicon-mysql-plain colored", desc: "Relational Queries & Indexing", highlight: true },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored", desc: "NoSQL Documents & Pipelines", highlight: true },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", desc: "ACID Transactions & Data Integrity", highlight: true },
      { name: "SQLite", icon: "devicon-sqlite-plain colored", desc: "Embedded Local Databases", highlight: false }
    ]
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    description: "Modern developer workflow tools, version control, bundlers, and analytical software.",
    badge: "Dev Workflow",
    icon: "devicon-git-plain colored",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-7",
    skills: [
      { name: "Git", icon: "devicon-git-plain colored", desc: "Version Control & Branching", highlight: true },
      { name: "GitHub", icon: "devicon-github-original", desc: "Collaboration & Code Reviews", highlight: true },
      { name: "VS Code", icon: "devicon-vscode-plain colored", desc: "IDE Customization & Tooling", highlight: false },
      { name: "Vite", icon: "devicon-vitejs-plain colored", desc: "Next-gen Frontend Tooling", highlight: true },
      { name: "Power BI", icon: "devicon-windows8-original colored", desc: "Analytics & Dashboarding", highlight: false },
      { name: "Excel", icon: "devicon-python-plain colored", desc: "Data Modeling & Formulas", highlight: false }
    ]
  },
  {
    id: "corecs",
    title: "Core CS",
    description: "Fundamental Computer Science engineering principles supporting robust software development.",
    badge: "CS Principles",
    icon: "devicon-cplusplus-plain colored",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-5",
    skills: [
      { name: "Data Structures & Algorithms", icon: "devicon-cplusplus-plain colored", desc: "Problem Solving & Complexity Analysis", highlight: true },
      { name: "Object-Oriented Programming", icon: "devicon-java-plain colored", desc: "Design Patterns & Abstraction", highlight: true },
      { name: "DBMS", icon: "devicon-postgresql-plain colored", desc: "Normalization & SQL Systems", highlight: true },
      { name: "Operating Systems", icon: "devicon-linux-plain colored", desc: "Process Synchronization & Memory", highlight: false },
      { name: "Computer Networks", icon: "devicon-chrome-plain colored", desc: "TCP/IP, HTTP/S & Network Models", highlight: false },
      { name: "Software Engineering", icon: "devicon-github-original", desc: "SDLC & Agile Methodologies", highlight: false }
    ]
  }
];

export function SkillBentoCard({ category, activeFilter }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  const isHidden = activeFilter !== 'all' && activeFilter !== category.id;
  if (isHidden) return null;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out" }}
      className={`${category.gridSpan} group relative rounded-2xl p-6 transition-all duration-300 bg-[#0d1527]/90 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 shadow-2xl overflow-hidden flex flex-col justify-between`}
    >
      {/* Spotlight Glow Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(500px circle at ${glowPos.x}% ${glowPos.y}%, rgba(139, 92, 246, 0.18), transparent 45%)`
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:border-purple-400/80 transition-all duration-300 shadow-inner">
              <i className={`${category.icon} text-xl`}></i>
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
              {category.title}
            </h3>
          </div>
          <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/20 uppercase tracking-wider">
            {category.badge}
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-slate-400 text-xs leading-relaxed mb-6">
          {category.description}
        </p>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-2.5">
          {category.skills.map((skill, sIdx) => (
            <div
              key={sIdx}
              className={`group/chip relative flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-300 cursor-default ${
                skill.highlight
                  ? 'bg-purple-950/40 text-slate-100 border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/60 hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.35)]'
                  : 'bg-slate-900/60 text-slate-300 border-white/5 hover:border-slate-500 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <i className={`${skill.icon} text-base group-hover/chip:scale-125 transition-transform duration-300`}></i>
              <span>{skill.name}</span>

              {/* Micro Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover/chip:flex flex-col items-center z-30 pointer-events-none">
                <div className="bg-slate-900 text-purple-200 text-[10px] px-2.5 py-1 rounded-md shadow-2xl border border-purple-500/40 whitespace-nowrap font-sans">
                  {skill.desc}
                </div>
                <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 border-r border-b border-purple-500/40"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
        <span>{category.skills.length} Technologies</span>
        <span className="group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300 flex items-center gap-1 font-medium">
          Mastery
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Skills" },
    { id: "languages", label: "Languages" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "databases", label: "Databases" },
    { id: "tools", label: "Tools" },
    { id: "corecs", label: "Core CS" }
  ];

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-slate-100 font-sans">
      {/* Ambient Glowing Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-glow-pulse"></div>
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-glow-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4 shadow-lg shadow-purple-950/40">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
          Tech Stack & Expertise
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Technical <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">Skills</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Technologies, frameworks, and engineering concepts I leverage to design and engineer production-grade applications.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border cursor-pointer ${
              activeFilter === filter.id
                ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.5)] scale-105'
                : 'bg-[#0d1527]/70 text-slate-400 border-white/10 hover:border-purple-500/40 hover:text-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6 relative z-10">
        {skillsData.map((category) => (
          <SkillBentoCard
            key={category.id}
            category={category}
            activeFilter={activeFilter}
          />
        ))}
      </div>
    </section>
  );
}
