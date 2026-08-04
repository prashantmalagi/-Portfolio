import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number from 0 to `target` when the returned `elementRef`
 * element scrolls into view. The animation runs only once.
 *
 * @param {number} target   - Final value to count up to.
 * @param {number} duration - Animation duration in ms (default 1400).
 * @returns {{ count: number, elementRef: React.RefObject }}
 */
export function useCounter(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, elementRef };
}
