/**
 * Debounce — prevents a function from firing until `wait` ms after last call.
 * @param {Function} func
 * @param {number} wait
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
 * Returns true when the user has requested reduced motion.
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
