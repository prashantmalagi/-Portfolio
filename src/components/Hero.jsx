import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../utils/helpers';

export default function Hero() {
  const typedInstanceRef = useRef(null);
  const typedEl          = useRef(null);
  const heroTiltRef      = useRef(null);
  const heroRef          = useRef(null);

  // Typed.js — typing animation
  useEffect(() => {
    if (!typedEl.current) return;
    typedInstanceRef.current = new Typed(typedEl.current, {
      strings: [
        'web applications.',
        'REST APIs.',
        'scalable backends.',
        'beautiful UIs.',
        'full stack apps.',
      ],
      typeSpeed:  55,
      backSpeed:  35,
      backDelay:  1800,
      loop:       true,
      cursorChar: '|',
    });
    return () => typedInstanceRef.current?.destroy();
  }, []);

  // GSAP hero heading entrance
  useEffect(() => {
    const el = document.querySelector('.hero-heading');
    if (el) {
      gsap.fromTo(el, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2,
      });
    }
  }, []);

  // 3D perspective tilt — follows global mouse
  useEffect(() => {
    const el = heroTiltRef.current;
    if (!el || prefersReducedMotion()) return;

    const onMouseMove = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const x  = (e.clientX - cx) / cx * 8;
      const y  = (e.clientY - cy) / cy * 8;
      el.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg)`;
    };
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Mouse spotlight radial gradient
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMouseMove = (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--my', (e.clientY - r.top)  + 'px');
    };
    hero.addEventListener('mousemove', onMouseMove);
    return () => hero.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-container">

        {/* ── Left: Text ─────────────────────────────────── */}
        <div className="hero-left">
          <div className="hero-badge" data-reveal>
            <span className="badge-dot" />
            Available for opportunities
          </div>

          <h1 className="hero-heading" data-reveal>
            Hi, I&apos;m<br />
            <span className="hero-name gradient-text">Prashanth</span>
          </h1>

          <div className="hero-roles" data-reveal>
            <span className="roles-prefix">I build&nbsp;</span>
            <span className="typed-text" ref={typedEl} />
          </div>

          <p className="hero-desc" data-reveal>
            Information Science student passionate about building secure, scalable, and beautiful
            applications with Node.js, React, Python, and modern web technologies.
          </p>

          <div className="hero-tech" data-reveal>
            <span className="tech-pill"><i className="devicon-react-original colored" /> React</span>
            <span className="tech-pill"><i className="devicon-nodejs-plain colored" /> Node.js</span>
            <span className="tech-pill"><i className="devicon-python-plain colored" /> Python</span>
            <span className="tech-pill"><i className="devicon-mongodb-plain colored" /> MongoDB</span>
          </div>

          <div className="hero-cta" data-reveal>
            <a href="#projects" className="btn btn-primary">
              View Projects
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="/Prashanth_Malagi_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
            <a href="https://github.com/prashantmalagi" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* ── Right: Profile Image ────────────────────────── */}
        <div className="hero-right" data-reveal>
          <div className="hero-image-wrapper" id="heroTilt" ref={heroTiltRef}>
            <div className="hero-glow-ring" />
            <img
              src="/profile.jpg.jpeg"
              alt="Prashanth Malagi profile"
              className="hero-avatar"
              loading="eager"
            />
            <div className="float-badge float-badge-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="16 12 12 16 8 12" stroke="white" strokeWidth="2" fill="none" />
              </svg>
              Full Stack Dev
            </div>
            <div className="float-badge float-badge-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              6+ Projects
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
