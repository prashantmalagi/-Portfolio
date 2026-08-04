import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  // GSAP stagger entrance for each timeline item
  useEffect(() => {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="achievements" className="section section-alt">
      <div className="container">
        <div className="section-label" data-reveal>Milestones</div>
        <h2 className="section-heading" data-reveal>
          <span className="gradient-text">Achievements</span> &amp; Experience
        </h2>

        <div className="timeline">
          {experienceData.map((item, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-date">{item.year}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.description}</p>
                <div className="timeline-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tech-badge">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
