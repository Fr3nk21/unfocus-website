'use client';

import { useEffect, useRef } from 'react';

// Three warm tones — picked once per particle at creation
const COLORS = [
  { r: 139, g: 69,  b: 19  }, // #8B4513 sienna      — 50%
  { r: 196, g: 149, b: 108 }, // #C4956C warm gold    — 30%
  { r: 212, g: 165, b: 116 }, // #D4A574 light copper — 20%
];

function pickColor() {
  const r = Math.random();
  if (r < 0.5) return COLORS[0];
  if (r < 0.8) return COLORS[1];
  return COLORS[2];
}

function makeParticle(w, h, hero = false) {
  const color = pickColor();
  return {
    baseX:       Math.random() * w,
    baseY:       Math.random() * h,
    size:        hero ? Math.random() * 2 + 5 : Math.random() * 2.5 + 1.5,
    baseOpacity: hero ? Math.random() * 0.3 + 0.4 : Math.random() * 0.35 + 0.15,
    speed:       Math.random() * 0.35 + 0.1,
    phase:       Math.random() * Math.PI * 2,
    phaseY:      Math.random() * Math.PI * 2,
    ampX:        Math.random() * 20 + 20,
    ampY:        Math.random() * 14 + 12,
    color,
    hero,
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

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    const isMobile    = window.innerWidth < 768;
    const normalCount = isMobile ? 200 : 500;
    const heroCount   = isMobile ? 5   : 20;
    const totalCount  = normalCount + heroCount;

    const particles = [
      ...Array.from({ length: normalCount }, () => makeParticle(canvas.width, canvas.height, false)),
      ...Array.from({ length: heroCount   }, () => makeParticle(canvas.width, canvas.height, true)),
    ];

    // Pre-allocated buffers — avoids per-frame GC pressure
    const fx             = new Float32Array(totalCount);
    const fy             = new Float32Array(totalCount);
    const opacity        = new Float32Array(totalCount);
    const connPerParticle = new Uint8Array(totalCount);

    const MOUSE_RADIUS  = 150;
    const CONN_DIST_SQ  = 100 * 100; // 100px squared

    let t = 0;

    function animate() {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      // --- 1. Compute positions + opacity --------------------------------
      for (let i = 0; i < totalCount; i++) {
        const p = particles[i];

        // Organic dual-frequency sine drift
        const x = p.baseX
          + Math.sin(t * p.speed        + p.phase      ) * p.ampX
          + Math.sin(t * p.speed * 1.3  + p.phase * 0.7) * p.ampX * 0.35;
        const y = p.baseY
          + Math.cos(t * p.speed * 0.7  + p.phaseY     ) * p.ampY
          + Math.cos(t * p.speed * 1.6  + p.phaseY * 0.5) * p.ampY * 0.25;

        // Mouse repulsion
        const dx = x - mouseX;
        const dy = y - mouseY;
        const distSq  = dx * dx + dy * dy;
        const dist    = Math.sqrt(distSq);
        const repulse = Math.max(0, MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        const nx = dist > 0 ? dx / dist : 0;
        const ny = dist > 0 ? dy / dist : 0;

        fx[i] = x + nx * repulse * 60;
        fy[i] = y + ny * repulse * 60;

        // Opacity boost near cursor (soft elastic feel)
        const maxOpacity = p.hero ? 0.9 : 0.7;
        opacity[i] = Math.min(p.baseOpacity + repulse * 0.45, maxOpacity);
      }

      // --- 2. Connection lines (batched into one path) -------------------
      connPerParticle.fill(0);
      ctx.beginPath();
      ctx.lineWidth   = 0.5;
      ctx.strokeStyle = 'rgba(139,69,19,0.05)';

      for (let i = 0; i < totalCount; i++) {
        if (connPerParticle[i] >= 3) continue;
        for (let j = i + 1; j < totalCount; j++) {
          if (connPerParticle[i] >= 3) break;
          if (connPerParticle[j] >= 3) continue;
          const dx = fx[i] - fx[j];
          const dy = fy[i] - fy[j];
          if (dx * dx + dy * dy < CONN_DIST_SQ) {
            ctx.moveTo(fx[i], fy[i]);
            ctx.lineTo(fx[j], fy[j]);
            connPerParticle[i]++;
            connPerParticle[j]++;
          }
        }
      }
      ctx.stroke();

      // --- 3. Draw particles ---------------------------------------------
      for (let i = 0; i < totalCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(fx[i], fy[i], p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${opacity[i]})`;
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
