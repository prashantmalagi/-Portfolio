import { useState, useEffect, useRef } from 'react';

const GH_CONFIGS = [
  {
    id: 'ghStatsCard',
    alt: 'Prashanth GitHub Stats',
    primary: 'https://github-readme-stats.vercel.app/api?username=prashantmalagi&show_icons=true&theme=transparent&hide_border=true&title_color=8B5CF6&text_color=e2e8f0&icon_color=6366F1&bg_color=00000000&count_private=true&cache_seconds=1800',
    fallbacks: [
      'https://github-readme-stats.vercel.app/api?username=prashantmalagi&show_icons=true&hide_border=true&title_color=8B5CF6&text_color=e2e8f0&icon_color=6366F1&bg_color=0d1117&count_private=true',
      'https://github-profile-summary-cards.vercel.app/api/cards/stats?username=prashantmalagi&theme=transparent',
    ],
    placeholder: {
      title: 'GitHub Stats',
      link: 'https://github.com/prashantmalagi',
      linkText: 'View on GitHub ↗',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  },
  {
    id: 'ghLangsCard',
    alt: 'Prashanth Top Languages',
    primary: 'https://github-readme-stats.vercel.app/api/top-langs/?username=prashantmalagi&layout=compact&theme=transparent&hide_border=true&title_color=8B5CF6&text_color=e2e8f0&bg_color=00000000&langs_count=8&cache_seconds=1800',
    fallbacks: [
      'https://github-readme-stats.vercel.app/api/top-langs/?username=prashantmalagi&layout=compact&hide_border=true&title_color=8B5CF6&text_color=e2e8f0&bg_color=0d1117&langs_count=8',
      'https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=prashantmalagi&theme=transparent',
    ],
    placeholder: {
      title: 'Top Languages',
      link: 'https://github.com/prashantmalagi?tab=repositories',
      linkText: 'View Repos ↗',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
  },
  {
    id: 'ghStreakCard',
    alt: 'Prashanth GitHub Streak',
    primary: 'https://streak-stats.demolab.com?user=prashantmalagi&theme=transparent&hide_border=true&ring=8B5CF6&fire=6366F1&currStreakLabel=6366F1&sideLabels=e2e8f0&dates=94a3b8&stroke=0B1120&background=00000000',
    fallbacks: [
      'https://github-readme-streak-stats.herokuapp.com/?user=prashantmalagi&theme=transparent&hide_border=true&ring=8B5CF6&fire=6366F1&currStreakLabel=6366F1',
      'https://github-readme-activity-graph.vercel.app/graph?username=prashantmalagi&theme=react-dark&hide_border=true&bg_color=00000000&color=8B5CF6&line=6366F1&point=3B82F6',
    ],
    isStreak: true,
    placeholder: {
      title: 'Contribution Activity',
      link: 'https://github.com/prashantmalagi',
      linkText: 'View Contributions ↗',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
  },
];

/* ── Single card ──────────────────────────────────────────────── */
function GitHubCard({ config }) {
  const [loading, setLoading] = useState(true);
  const [src,     setSrc]     = useState(null);
  const [failed,  setFailed]  = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Lazy-load: only fetch when card enters viewport
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        tryLoad([config.primary, ...config.fallbacks], 0);
      },
      { threshold: 0.1 }
    );
    obs.observe(card);
    return () => obs.disconnect();
  }, [config]);

  function tryLoad(urls, index) {
    if (index >= urls.length) {
      setLoading(false);
      setFailed(true);
      return;
    }
    const url   = urls[index];
    const probe = new Image();
    const timer = setTimeout(() => {
      probe.onload = probe.onerror = null;
      tryLoad(urls, index + 1);
    }, 8000);

    probe.onload = () => {
      clearTimeout(timer);
      setSrc(url + (url.includes('?') ? '&' : '?') + '_t=' + Date.now());
      setLoading(false);
    };
    probe.onerror = () => {
      clearTimeout(timer);
      tryLoad(urls, index + 1);
    };
    probe.src = url;
  }

  return (
    <div
      ref={cardRef}
      id={config.id}
      className={`github-card tilt-card ${config.isStreak ? 'github-streak-card' : ''}`}
    >
      {loading && !failed && (
        <div className="gh-loading">
          <div className="gh-spinner" />
        </div>
      )}
      {src && (
        <img src={src} alt={config.alt} className="github-img" />
      )}
      {failed && (
        <div className="gh-placeholder" style={{ display: 'flex' }}>
          {config.placeholder.icon}
          <span className="gh-placeholder-title">{config.placeholder.title}</span>
          <span className="gh-placeholder-sub">GitHub statistics are temporarily unavailable.</span>
          <a
            href={config.placeholder.link}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-placeholder-link"
          >
            {config.placeholder.linkText}
          </a>
        </div>
      )}
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function GitHubStats() {
  return (
    <section id="github" className="section">
      <div className="container">
        <div className="section-label" data-reveal>Open Source</div>
        <h2 className="section-heading" data-reveal>
          GitHub <span className="gradient-text">Activity</span>
        </h2>
        <p className="section-sub" data-reveal>
          A snapshot of my open-source contributions and coding activity.
        </p>

        <div className="github-grid" data-reveal>
          {GH_CONFIGS.map((cfg) => (
            <GitHubCard key={cfg.id} config={cfg} />
          ))}
        </div>

        <div className="github-cta" data-reveal>
          <a
            href="https://github.com/prashantmalagi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
