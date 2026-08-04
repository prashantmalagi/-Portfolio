import { useEffect, useRef } from 'react';

/**
 * Background layer: animated blobs, grid overlay, and particle canvas.
 * Mirrors the original particle canvas JS from index.html exactly.
 */
export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const N = 60;

    const particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function rnd(min, max) {
      return Math.random() * (max - min) + min;
    }
    for (let i = 0; i < N; i++) {
      particles.push({
        x: rnd(0, W || window.innerWidth),
        y: rnd(0, H || window.innerHeight),
        r: rnd(0.5, 1.8),
        vx: rnd(-0.2, 0.2),
        vy: rnd(-0.2, 0.2),
        alpha: rnd(0.1, 0.4),
        color: Math.random() > 0.5 ? '139,92,246' : '99,102,241',
      });
    }

    let animId;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="grid-overlay" />
      <canvas ref={canvasRef} id="particleCanvas" />
    </div>
  );
}
