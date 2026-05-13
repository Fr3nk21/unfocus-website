'use client';

import { useEffect, useRef } from 'react';

export default function ThreeHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let mouseX = -9999;
    let mouseY = -9999;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    const count = window.innerWidth < 768 ? 100 : 400;
    const particles = Array.from({ length: count }, () => ({
      baseX: Math.random() * canvas.width,
      baseY: Math.random() * canvas.height,
      size: Math.random() * 3.75 + 1.2,
      opacity: Math.random() * 0.45 + 0.3,
      speed: Math.random() * 0.4 + 0.15,
      phase: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    function animate() {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.007;

      for (const p of particles) {
        const x = p.baseX + Math.sin(t * p.speed + p.phase) * 28;
        const y = p.baseY + Math.cos(t * p.speed * 0.7 + p.phaseY) * 18;

        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulse = Math.max(0, 90 - dist) / 90;
        const nx = dist > 0 ? dx / dist : 0;
        const ny = dist > 0 ? dy / dist : 0;
        const fx = x + nx * repulse * 45;
        const fy = y + ny * repulse * 45;

        ctx.beginPath();
        ctx.arc(fx, fy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 98, 64, ${p.opacity})`;
        ctx.fill();
      }
    }

    animate();

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function handleResize() {
      resize();
      for (const p of particles) {
        p.baseX = Math.random() * canvas.width;
        p.baseY = Math.random() * canvas.height;
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
