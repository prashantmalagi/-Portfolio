import { useEffect, useRef } from 'react';

/**
 * Custom cursor: dot that snaps to mouse position + ring that lags behind.
 * Also spawns a ripple on click. Hides itself on touch devices.
 */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide on touch devices
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) {
      dot.style.display  = 'none';
      ring.style.display = 'none';
      return;
    }

    let mx = -100, my = -100, rx = -100, ry = -100;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener('mousemove', onMouseMove);

    let animId;
    function animCursor() {
      dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      animId = requestAnimationFrame(animCursor);
    }
    animCursor();

    // Hover effect on interactive elements
    const hoverEls = document.querySelectorAll(
      'a, button, .tilt-card, .skill-card, .project-image-wrap'
    );
    const addHover    = () => { ring.classList.add('cursor-hover');    dot.classList.add('cursor-hover');    };
    const removeHover = () => { ring.classList.remove('cursor-hover'); dot.classList.remove('cursor-hover'); };
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    // Click ripple
    const onMouseDown = (e) => {
      const r = document.createElement('div');
      Object.assign(r.style, {
        position: 'fixed',
        borderRadius: '50%',
        width: '8px',
        height: '8px',
        background: 'rgba(139,92,246,0.6)',
        pointerEvents: 'none',
        zIndex: '9998',
        left: e.clientX - 4 + 'px',
        top: e.clientY - 4 + 'px',
        transition: 'transform 0.6s ease, opacity 0.6s ease',
      });
      document.body.appendChild(r);
      requestAnimationFrame(() => {
        r.style.transform = 'scale(10)';
        r.style.opacity = '0';
      });
      setTimeout(() => r.remove(), 650);
    };
    document.addEventListener('mousedown', onMouseDown);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      cancelAnimationFrame(animId);
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
