// utils.js – Helper utilities

/**
 * Debounce function – ensures the wrapped function is only called after
 * the specified delay has elapsed without additional calls.
 */
export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Detect whether the user prefers reduced motion.
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate numeric counters from 0 to target value.
 * @param {HTMLElement} el - element to update text content
 * @param {number} target - final number
 * @param {number} duration - animation duration in ms
 */
export function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(start + (target - start) * progress);
    el.textContent = value;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

/**
 * Simple tilt effect for elements with data-tilt attribute.
 * @param {HTMLElement} el - element to apply tilt to
 */
export function applyTilt(el) {
  const rect = el.getBoundingClientRect();
  const halfW = rect.width / 2;
  const halfH = rect.height / 2;
  const maxTilt = 15; // degrees

  function onMouseMove(e) {
    const x = e.clientX - rect.left - halfW;
    const y = e.clientY - rect.top - halfH;
    const tiltX = (y / halfH) * maxTilt;
    const tiltY = -(x / halfW) * maxTilt;
    el.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1,1,1)`;
  }

  function onMouseLeave() {
    el.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }

  el.addEventListener('mousemove', onMouseMove);
  el.addEventListener('mouseleave', onMouseLeave);
}

// Exported for convenience
export default {
  debounce,
  prefersReducedMotion,
  animateCounter,
  applyTilt,
};
