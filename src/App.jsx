import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useScrollReveal } from './hooks/useScrollReveal';
import { prefersReducedMotion } from './utils/helpers';

import Background    from './components/Background';
import CustomCursor  from './components/CustomCursor';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Skills        from './components/Skills';
import Projects      from './components/Projects';
import Achievements  from './components/Achievements';
import GitHubStats   from './components/GitHubStats';
import Contact       from './components/Contact';
import Footer        from './components/Footer';

// Register GSAP plugin once at module level
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Scroll-reveal: run after ALL children mount
  useScrollReveal();

  // GSAP: section headings entrance
  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.utils.toArray('.section-heading').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Tilt effect — applied globally after mount so all .tilt-card elements are covered
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const cards    = document.querySelectorAll('.tilt-card');
    const handlers = [];

    cards.forEach((card) => {
      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x    = (e.clientX - rect.left) / rect.width  - 0.5;
        const y    = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(4px)`;
      };
      const onMouseLeave = () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      };
      card.addEventListener('mousemove',  onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
      handlers.push({ card, onMouseMove, onMouseLeave });
    });

    return () => {
      handlers.forEach(({ card, onMouseMove, onMouseLeave }) => {
        card.removeEventListener('mousemove',  onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Fixed background — blobs, grid, particle canvas */}
      <Background />

      {/* Custom cursor (hidden on touch devices) */}
      <CustomCursor />

      {/* Fixed top navbar */}
      <Navbar />

      {/* Page sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <GitHubStats />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
