'use client';

import { useEffect, useRef } from 'react';

function makeParticle(w, h) {
  return {
    x:    Math.random() * w,
    y:    Math.random() * h,
    vx:   (Math.random() - 0.5) * 0.6,
    vy:   (Math.random() - 0.5) * 0.6,
    seed: Math.random() * Math.PI * 2,
  };
}

export default function ThreeHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let mouseX = -9999;
    let mouseY = -9999;
    let isDark = document.documentElement.classList.contains('dark');

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 40 : 300;

    let particles = Array.from({ length: count }, () =>
      makeParticle(canvas.width, canvas.height)
    );

    const CONN_DIST       = 180;
    const CONN_DIST_SQ    = CONN_DIST * CONN_DIST;
    const MOUSE_ATTR_DIST = 250;
    const MOUSE_ATTR_SQ   = MOUSE_ATTR_DIST * MOUSE_ATTR_DIST;
    const MOUSE_LINE_DIST = 140;
    const MOUSE_LINE_SQ   = MOUSE_LINE_DIST * MOUSE_LINE_DIST;

    let time = 0;

    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    function animate() {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      const w       = canvas.width;
      const h       = canvas.height;
      const lineRGB = isDark ? '196,149,108' : '139,69,19';

      // --- 1. Update positions -------------------------------------------
      for (const p of particles) {
        const mdx     = mouseX - p.x;
        const mdy     = mouseY - p.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < MOUSE_ATTR_SQ && mDistSq > 100) {
          const mDist = Math.sqrt(mDistSq);
          const force = (1 - mDist / MOUSE_ATTR_DIST) * 0.2;
          p.vx += mdx * force * 0.002;
          p.vy += mdy * force * 0.002;
        }

        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x  += p.vx + Math.sin(time * 0.001 + p.seed) * 0.2;
        p.y  += p.vy + Math.cos(time * 0.001 + p.seed * 1.3) * 0.2;

        if (p.x < 0) p.x += w;
        else if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        else if (p.y > h) p.y -= h;
      }

      // --- 2. Particle-to-particle lines ---------------------------------
      ctx.lineWidth = 0.8;
      for (let i = 0; i < count; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < count; j++) {
          const pj  = particles[j];
          const dx  = pi.x - pj.x;
          const dy  = pi.y - pj.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < CONN_DIST_SQ) {
            const dist  = Math.sqrt(dSq);
            const alpha = (1 - dist / CONN_DIST) * 0.25;
            ctx.strokeStyle = `rgba(${lineRGB},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      // --- 3. Cursor-to-particle radial lines ----------------------------
      if (mouseX > -1000) {
        ctx.lineWidth = 1.0;
        for (const p of particles) {
          const dx  = mouseX - p.x;
          const dy  = mouseY - p.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < MOUSE_LINE_SQ) {
            const dist  = Math.sqrt(dSq);
            const alpha = (1 - dist / MOUSE_LINE_DIST) * 0.2;
            ctx.strokeStyle = `rgba(${lineRGB},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      // --- 4. Draw dots --------------------------------------------------
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${lineRGB},0.4)`;
        ctx.fill();
      }
    }

    animate();

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    function handleResize() {
      resize();
      particles = Array.from({ length: count }, () =>
        makeParticle(canvas.width, canvas.height)
      );
    }

    window.addEventListener('mousemove',    handleMouseMove);
    window.addEventListener('resize',       handleResize);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      themeObserver.disconnect();
      window.removeEventListener('mousemove',    handleMouseMove);
      window.removeEventListener('resize',       handleResize);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        zIndex:        1,
        opacity:       1,
        pointerEvents: 'none',
      }}
    />
  );
}
