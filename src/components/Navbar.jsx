import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { href: '#about',        label: 'About',        section: 'about'        },
  { href: '#skills',       label: 'Skills',       section: 'skills'       },
  { href: '#projects',     label: 'Projects',     section: 'projects'     },
  { href: '#achievements', label: 'Achievements', section: 'achievements' },
  { href: '#contact',      label: 'Contact',      section: 'contact'      },
];

export default function Navbar() {
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isHidden,      setIsHidden]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollY = useRef(0);

  // Scroll: add glass background & hide on scroll-down
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 80);
      setIsHidden(y > lastScrollY.current && y > 120);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section highlight via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header
        id="navbar"
        className={[
          'nav',
          isScrolled ? 'nav-scrolled' : '',
          isHidden   ? 'nav-hidden'   : '',
        ].join(' ')}
      >
        <div className="nav-container">
          {/* Brand */}
          <a href="#home" className="nav-brand" aria-label="Home">
            <img src="/profile.jpg.jpeg" alt="Prashanth Malagi" className="nav-avatar" />
            <span className="nav-name">
              Prashanth<span className="accent">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="nav-links" id="navLinks" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.section}
                href={link.href}
                data-section={link.section}
                className={`nav-link ${activeSection === link.section ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            <a
              href="/Prashanth_Malagi_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
            <button
              id="hamburger"
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={menuOpen ? closeMenu : openMenu}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobileNav"
        className={`mobile-nav ${menuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <button className="mobile-nav-close" aria-label="Close menu" onClick={closeMenu}>
          &times;
        </button>
        <nav>
          {NAV_LINKS.map((link) => (
            <a
              key={link.section}
              href={link.href}
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Prashanth_Malagi_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-4"
            onClick={closeMenu}
          >
            Download Resume
          </a>
        </nav>
      </div>
    </>
  );
}
