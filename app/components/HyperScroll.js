'use client';

import { useEffect, useRef, useState } from 'react';
import YoutubeModal from './YoutubeModal';
import PhotoLightbox from './PhotoLightbox';

const portfolioItems = [
  {
    id: 'v-toyota',
    aspect: '16/9',
    category: 'Video',
    title: 'Toyota Finance',
    sub: 'with Red Herring Digital',
    video: '/videos/toyota-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-fratellino',
    aspect: '16/9',
    category: 'Photo',
    title: 'Fratellino Pizzeria',
    sub: '',
    cover: '/images/portfolio/fratellino/thumb.webp',
    images: [
      '/images/portfolio/fratellino/01.webp',
      '/images/portfolio/fratellino/02.webp',
      '/images/portfolio/fratellino/03.webp',
      '/images/portfolio/fratellino/04.webp',
    ],
  },
  {
    id: 'p-venice',
    aspect: '16/9',
    category: 'Photo',
    title: 'Venice',
    sub: '',
    cover: '/images/portfolio/venice/thumb.webp',
    images: [
      '/images/portfolio/venice/01.webp',
      '/images/portfolio/venice/02.webp',
      '/images/portfolio/venice/03.webp',
      '/images/portfolio/venice/04.webp',
      '/images/portfolio/venice/05.webp',
    ],
  },
  {
    id: 'v-pickle-jar',
    aspect: '16/9',
    category: 'Video',
    title: 'Pickle Jar',
    sub: 'with GTano',
    video: '/videos/pickle-jar-loop.mp4',
    youtubeId: 'R9qTTNp8zTg',
    vertical: false,
  },
  {
    id: 'v-liam',
    aspect: '16/9',
    category: 'Video',
    title: 'Wake Up and Live',
    sub: 'with the AOD',
    video: '/videos/liam-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-bar-ussou',
    aspect: '16/9',
    category: 'Photo',
    title: 'Bar Oussou',
    sub: 'with GTano',
    cover: '/images/portfolio/bar-ussou/thumb.webp',
    images: [
      '/images/portfolio/bar-ussou/01.webp',
      '/images/portfolio/bar-ussou/02.webp',
      '/images/portfolio/bar-ussou/03.webp',
      '/images/portfolio/bar-ussou/04.webp',
    ],
  },
  {
    id: 'p-agriturismo',
    aspect: '16/9',
    category: 'Photo',
    title: 'Agriturismo',
    sub: "C’era Una Volta",
    cover: '/images/portfolio/agriturismo/thumb.webp',
    images: [
      '/images/portfolio/agriturismo/01.webp',
      '/images/portfolio/agriturismo/02.webp',
      '/images/portfolio/agriturismo/03.webp',
      '/images/portfolio/agriturismo/04.webp',
    ],
  },
  {
    id: 'v-floridia-night',
    aspect: '16/9',
    category: 'Video',
    title: 'Floridia',
    sub: 'with Atti.Co',
    video: '/videos/floridia-night-loop.mp4',
    youtubeId: 'N-tIYwkcpAE',
    vertical: false,
  },
  {
    id: 'v-fratellino',
    aspect: '16/9',
    category: 'Video',
    title: 'Fratellino Pizzeria',
    sub: '',
    video: '/videos/fratellino-loop.mp4',
    youtubeId: 'akSOmj9-SVs',
    vertical: true,
  },
  {
    id: 'p-possum',
    aspect: '16/9',
    category: 'Photo',
    title: 'Possum',
    sub: 'with Filmnonick and Radical Raliens',
    cover: '/images/portfolio/possum/thumb.webp',
    images: [
      '/images/portfolio/possum/01.webp',
      '/images/portfolio/possum/02.webp',
      '/images/portfolio/possum/03.webp',
      '/images/portfolio/possum/04.webp',
    ],
  },
];

export default function HyperScroll() {
  const worldRef = useRef(null);
  const viewportRef = useRef(null);
  const stateRef = useRef({ scroll: 0, velocity: 0, targetSpeed: 0, mouseX: 0, mouseY: 0 });

  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const world = worldRef.current;
    const viewport = viewportRef.current;
    if (!world || !viewport) return;

    const CONFIG = {
      itemCount: portfolioItems.length,
      zGap: 1200,
      loopSize: 0,
      camSpeed: 2.5,
    };
    CONFIG.loopSize = CONFIG.itemCount * CONFIG.zGap;

    const state = stateRef.current;
    const items = [];

    // Build project cards imperatively to avoid React re-render overhead
    portfolioItems.forEach((project, i) => {
      const el = document.createElement('div');
      el.className = 'hyper-item';
      el.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        backface-visibility: hidden;
        transform-origin: center center;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      `;

      const card = document.createElement('div');
      card.className = 'hyper-card';
      card.style.cssText = `
        width: 420px;
        height: 280px;
        background: rgba(30,27,20,0.6);
        border: 1px solid rgba(244,239,229,0.08);
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        transform: translate(-50%, -50%);
      `;

      if (project.category === 'Video' && project.video) {
        const video = document.createElement('video');
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
        const source = document.createElement('source');
        source.src = project.video;
        source.type = 'video/mp4';
        video.appendChild(source);
        card.appendChild(video);
      } else if (project.cover) {
        const img = document.createElement('img');
        img.src = project.cover;
        img.alt = project.title;
        img.loading = 'lazy';
        img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
        card.appendChild(img);
      }

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, transparent 100%);
        z-index: 1;
      `;
      card.appendChild(overlay);

      const info = document.createElement('div');
      info.style.cssText = `
        position: absolute;
        bottom: 1.25rem;
        left: 1.25rem;
        z-index: 2;
      `;
      info.innerHTML = `
        <span style="font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:#8B4513;font-weight:400;">${project.category}</span>
        <h3 style="font-family:Georgia,serif;font-size:1.5rem;font-weight:500;color:#F4EFE5;margin:0.25rem 0 0;letter-spacing:-0.01em;">${project.title}</h3>
        ${project.sub ? `<p style="font-size:0.75rem;color:rgba(244,239,229,0.5);font-weight:300;margin:0.15rem 0 0;">${project.sub}</p>` : ''}
      `;
      card.appendChild(info);

      const num = document.createElement('div');
      num.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-family: Georgia, serif;
        font-size: 3rem;
        font-weight: 700;
        color: rgba(244,239,229,0.06);
        z-index: 2;
      `;
      num.textContent = String(i + 1).padStart(2, '0');
      card.appendChild(num);

      card.addEventListener('click', () => {
        if (project.category === 'Video' && project.youtubeId) {
          setActiveVideo(project);
          setModalOpen(true);
        } else if (project.category === 'Photo' && project.images) {
          setActivePhoto(project);
          setLightboxOpen(true);
        }
      });

      el.appendChild(card);

      const angle = (i / CONFIG.itemCount) * Math.PI * 4;
      const x = Math.cos(angle) * (window.innerWidth * 0.22);
      const y = Math.sin(angle) * (window.innerHeight * 0.18);
      const rot = (Math.random() - 0.5) * 12;

      items.push({ el, x, y, rot, baseZ: -i * CONFIG.zGap });
      world.appendChild(el);
    });

    // Ambient star particles
    for (let i = 0; i < 80; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #8B4513;
        border-radius: 50%;
        opacity: 0.3;
        transform: translate(-50%, -50%);
      `;
      world.appendChild(el);
      items.push({
        el,
        type: 'star',
        x: (Math.random() - 0.5) * 2500,
        y: (Math.random() - 0.5) * 2500,
        baseZ: -Math.random() * CONFIG.loopSize,
      });
    }

    function handleMouseMove(e) {
      state.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      state.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener('mousemove', handleMouseMove);

    let lenis;
    let rafId;

    import('lenis').then((mod) => {
      const Lenis = mod.default;
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

      lenis.on('scroll', ({ scroll, velocity }) => {
        state.scroll = scroll;
        state.targetSpeed = velocity;
        setShowHero(scroll < 200);
      });

      function raf(time) {
        lenis.raf(time);

        state.velocity += (state.targetSpeed - state.velocity) * 0.1;

        const tiltX = state.mouseY * 3;
        const tiltY = state.mouseX * 3;
        world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

        const baseFov = 1000;
        const fov = baseFov - Math.min(Math.abs(state.velocity) * 8, 500);
        viewport.style.perspective = `${fov}px`;

        const cameraZ = state.scroll * CONFIG.camSpeed;

        items.forEach((item) => {
          const relZ = item.baseZ + cameraZ;
          const modC = CONFIG.loopSize;
          let vizZ = ((relZ % modC) + modC) % modC;
          if (vizZ > 500) vizZ -= modC;

          let alpha = 1;
          if (vizZ < -3000) alpha = 0;
          else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;
          if (vizZ > 100 && item.type !== 'star') alpha = 1 - (vizZ - 100) / 400;
          if (alpha < 0) alpha = 0;

          item.el.style.opacity = alpha;

          if (alpha > 0) {
            let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`;
            if (item.type === 'star') {
              const stretch = Math.max(1, Math.min(1 + Math.abs(state.velocity) * 0.05, 5));
              trans += ` scale3d(1, 1, ${stretch})`;
            } else {
              const t = time * 0.001;
              const float = Math.sin(t + item.x * 0.01) * 5;
              trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
            }
            item.el.style.transform = trans;
          }
        });

        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      while (world.firstChild) world.removeChild(world.firstChild);
    };
  }, []);

  return (
    <>
      <section id="portfolio" style={{ position: 'relative' }}>
        {/* Noise overlay */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 12,
            opacity: 0.04,
            pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(circle, transparent 40%, rgba(24,21,15,0.6) 120%)',
            zIndex: 11,
            pointerEvents: 'none',
          }}
        />

        {/* Hero text */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            padding: '30vh 2rem 0',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            opacity: showHero ? 1 : 0,
            transition: 'opacity 0.6s ease',
            pointerEvents: showHero ? 'auto' : 'none',
          }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--taupe)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#4ADE80',
                animation: 'livePulse 2s ease-in-out infinite',
              }}
            />
            Richmond · Melbourne, Australia
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 700,
              color: 'var(--ink)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}
          >
            <em style={{ fontStyle: 'italic', color: 'var(--sienna)' }}>Crafted,</em>{' '}
            not created.
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--taupe)',
              fontWeight: 300,
              marginBottom: '2rem',
            }}
          >
            Video and photography for hospitality, corporate, and social brands.
          </p>
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--taupe)',
              opacity: 0.5,
              animation: 'gentleBounce 2s ease-in-out infinite',
            }}
          >
            Scroll to explore ↓
          </p>
        </div>

        {/* 3D Viewport */}
        <div
          ref={viewportRef}
          style={{
            position: 'fixed',
            inset: 0,
            perspective: '1000px',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <div
            ref={worldRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          />
        </div>

        {/* Scroll proxy — provides 3D tunnel scroll space */}
        <div style={{ height: '8000vh', position: 'relative', zIndex: -1 }} />
      </section>

      <YoutubeModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setActiveVideo(null); }}
        videoId={activeVideo?.youtubeId}
        title={activeVideo?.title}
        vertical={activeVideo?.vertical}
      />
      <PhotoLightbox
        isOpen={lightboxOpen}
        onClose={() => { setLightboxOpen(false); setActivePhoto(null); }}
        images={activePhoto?.images || []}
        title={activePhoto?.title || ''}
      />

      <style>{`
        .hyper-card:hover {
          border-color: #8B4513 !important;
          box-shadow: 0 0 40px rgba(139,69,19,0.2), 0 20px 60px rgba(0,0,0,0.4) !important;
        }
      `}</style>
    </>
  );
}
