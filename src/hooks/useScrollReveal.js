import { useEffect } from 'react';

/**
 * Observes all [data-reveal] elements in the DOM and adds the
 * 'revealed' class when they enter the viewport, triggering the
 * CSS opacity+translateY transition defined in index.css.
 *
 * Call this once in App.jsx after all components have mounted.
 */
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = Number(e.target.dataset.delay) || 0;
            setTimeout(() => e.target.classList.add('revealed'), delay);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    // Stagger delay: first 4 siblings per group get 0–240 ms
    els.forEach((el, i) => {
      el.dataset.delay = String((i % 4) * 80);
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);
}
