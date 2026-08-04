import { useState, useRef } from 'react';
import { skillsData } from '../data/skills';

/* ── Skill bento card ──────────────────────────────────────────────────── */
function SkillBentoCard({ category, activeFilter }) {
  const cardRef   = useRef(null);
  const [tform,   setTform]   = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  if (activeFilter !== 'all' && activeFilter !== category.id) return null;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect    = cardRef.current.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY = ((x - rect.width  / 2) / (rect.width  / 2)) *  5;
    setTform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015,1.015,1.015)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'); }}
      style={{ transform: tform, transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out' }}
      className={`${category.gridSpan} group relative rounded-2xl p-6 transition-all duration-300 bg-[#0d1527]/90 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 shadow-2xl overflow-hidden flex flex-col justify-between`}
    >
      {/* Mouse glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{ background: `radial-gradient(500px circle at ${glowPos.x}% ${glowPos.y}%, rgba(139,92,246,0.18), transparent 45%)` }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:border-purple-400/80 transition-all duration-300 shadow-inner">
              <i className={`${category.icon} text-xl`} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
              {category.title}
            </h3>
          </div>
          <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/20 uppercase tracking-wider">
            {category.badge}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed mb-6">{category.description}</p>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-2.5">
          {category.skills.map((skill, idx) => (
            <div
              key={idx}
              className={`group/chip relative flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-300 cursor-default ${
                skill.highlight
                  ? 'bg-purple-950/40 text-slate-100 border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/60 hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.35)]'
                  : 'bg-slate-900/60 text-slate-300 border-white/5 hover:border-slate-500 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <i className={`${skill.icon} text-base group-hover/chip:scale-125 transition-transform duration-300`} />
              <span>{skill.name}</span>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover/chip:flex flex-col items-center z-30 pointer-events-none">
                <div className="bg-slate-900 text-purple-200 text-[10px] px-2.5 py-1 rounded-md shadow-2xl border border-purple-500/40 whitespace-nowrap font-sans">
                  {skill.desc}
                </div>
                <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 border-r border-b border-purple-500/40" />
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

/* ── Filter pills ──────────────────────────────────────────────────────── */
const FILTERS = [
  { id: 'all',       label: 'All Skills'  },
  { id: 'languages', label: 'Languages'  },
  { id: 'frontend',  label: 'Frontend'   },
  { id: 'backend',   label: 'Backend'    },
  { id: 'databases', label: 'Databases'  },
  { id: 'tools',     label: 'Tools'      },
  { id: 'corecs',    label: 'Core CS'    },
];

/* ── Main Skills section ───────────────────────────────────────────────── */
export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-slate-100 font-sans">
      {/* Ambient glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-glow-pulse" style={{ animationDelay: '2s' }} />

      {/* Section header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4 shadow-lg shadow-purple-950/40">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          Tech Stack &amp; Expertise
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Technical{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Technologies, frameworks, and engineering concepts I leverage to design and engineer production-grade applications.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border cursor-pointer ${
              activeFilter === f.id
                ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.5)] scale-105'
                : 'bg-[#0d1527]/70 text-slate-400 border-white/10 hover:border-purple-500/40 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-12 gap-6 relative z-10">
        {skillsData.map((category) => (
          <SkillBentoCard key={category.id} category={category} activeFilter={activeFilter} />
        ))}
      </div>
    </section>
  );
}
