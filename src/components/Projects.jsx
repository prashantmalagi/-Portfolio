import { projects } from '../data/projects';

/* ── SVG placeholder icons keyed by project.iconKey ─────────────── */
const ICONS = {
  portfolio: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
    </svg>
  ),
  api: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  crm: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  ai: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  gym: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  bank: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
};

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-label" data-reveal>What I&apos;ve Built</div>
        <h2 className="section-heading" data-reveal>
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-sub" data-reveal>
          A selection of projects that showcase my skills and growth as a developer.
        </p>

        <div className="projects-list">

          {/* ── All projects — unified card layout ─────── */}
          {projects.map((project) => (
            <article
              key={project.id}
              className={`project-item ${project.reverse ? 'project-item-reverse' : ''}`}
              data-reveal
            >
              <div className="project-content">
                <div className="project-meta">
                  <span className="project-num">{project.num}</span>
                  <div className="project-badges">
                    {project.badges.map((b) => (
                      <span key={b} className="tech-badge">{b}</span>
                    ))}
                  </div>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                    <GitHubIcon /> Source Code
                  </a>
                  {project.liveDemo && (
                    <a href={project.liveDemo} className="btn btn-ghost btn-sm" aria-label="Live demo">
                      <ExternalIcon /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Visual: real screenshot if available, otherwise SVG placeholder */}
              <div className="project-visual">
                <div className="project-image-wrap tilt-card">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="project-image"
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div className="project-image-placeholder">
                      {ICONS[project.iconKey]}
                      <span>{project.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}
