'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import ThreeHero from './ThreeHero';
import YoutubeModal from './YoutubeModal';
import PhotoLightbox from './PhotoLightbox';

const portfolioItems = [
  {
    id: 'v-toyota',
    category: 'Video',
    title: 'Toyota Finance',
    sub: 'with Red Herring Digital',
    video: '/videos/toyota-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-fratellino',
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
    category: 'Video',
    title: 'Pickle Jar',
    sub: 'with GTano',
    video: '/videos/pickle-jar-loop.mp4',
    youtubeId: 'R9qTTNp8zTg',
    vertical: false,
  },
  {
    id: 'v-liam',
    category: 'Video',
    title: 'Wake Up and Live',
    sub: 'with the AOD',
    video: '/videos/liam-loop.mp4',
    youtubeId: '',
    vertical: false,
  },
  {
    id: 'p-bar-ussou',
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
    category: 'Photo',
    title: 'Agriturismo',
    sub: "C'era Una Volta",
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
    category: 'Video',
    title: 'Floridia',
    sub: 'with Atti.Co',
    video: '/videos/floridia-night-loop.mp4',
    youtubeId: 'N-tIYwkcpAE',
    vertical: false,
  },
  {
    id: 'v-fratellino',
    category: 'Video',
    title: 'Fratellino Pizzeria',
    sub: '',
    video: '/videos/fratellino-loop.mp4',
    youtubeId: 'akSOmj9-SVs',
    vertical: true,
  },
  {
    id: 'p-possum',
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

export default function HeroNew() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(portfolioItems.length / 2));
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  // Infinite circular navigation
  const toPrev = () => setActiveIndex((p) => (p - 1 + portfolioItems.length) % portfolioItems.length);
  const toNext = () => setActiveIndex((p) => (p + 1) % portfolioItems.length);

  function handleClick(item) {
    if (item.category === 'Video' && item.youtubeId) {
      setActiveVideo(item);
      setModalOpen(true);
    } else if (item.category === 'Photo' && item.images) {
      setActivePhoto(item);
      setLightboxOpen(true);
    }
  }

  // Wheel scroll on carousel to navigate
  const carouselRef = useRef(null);
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let lastScroll = 0;
    function onWheel(e) {
      const now = Date.now();
      if (now - lastScroll < 400) return; // throttle
      lastScroll = now;
      if (e.deltaY > 0 || e.deltaX > 0) toNext();
      else toPrev();
    }
    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const CARD_W = 'clamp(220px, 22vw, 300px)';

  return (
    <>
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--ivory)',
          paddingTop: '72px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Canvas line network background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}>
          <ThreeHero />
        </div>

        {/* Two-column container */}
        <div
          className="hero-split"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 2rem',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {/* LEFT: text */}
          <div>
            <p
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                marginBottom: '1.5rem',
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#4ADE80',
                  display: 'inline-block',
                  animation: 'livePulse 2s ease-in-out infinite',
                }}
              />
              Richmond · Melbourne, Australia
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                fontWeight: 700,
                color: 'var(--ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '1.5rem',
              }}
            >
              <em style={{ fontStyle: 'italic', color: 'var(--sienna)' }}>Crafted,</em> not created.
            </h1>
            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                color: 'var(--taupe)',
                fontWeight: 300,
                lineHeight: 1.6,
                maxWidth: '440px',
                marginBottom: '2rem',
              }}
            >
              Video and photography for hospitality, corporate, and social brands. Based in Melbourne.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <a
                href="#contact"
                style={{
                  backgroundColor: 'var(--sienna)',
                  color: '#F4EFE5',
                  padding: '0.85rem 2rem',
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: 400,
                  cursor: 'pointer',
                  border: 'none',
                  display: 'inline-block',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.88';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Get in touch
              </a>
              <a
                href="#services"
                style={{ color: 'var(--taupe)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 300, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sienna)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--taupe)')}
              >
                What I do →
              </a>
            </div>
          </div>

          {/* RIGHT: 3D portrait carousel */}
          <div
            ref={carouselRef}
            style={{
              position: 'relative',
              height: '70vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Carousel stage */}
            <div style={{ position: 'relative', width: '100%', height: '100%', perspective: '1200px' }}>
              {portfolioItems.map((item, i) => {
                let offset = i - activeIndex;
                const half = portfolioItems.length / 2;
                if (offset > half) offset -= portfolioItems.length;
                if (offset < -half) offset += portfolioItems.length;
                const isVisible = Math.abs(offset) <= 2;

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      y: `${offset * 18}%`,
                      z: -Math.abs(offset) * 150,
                      rotateX: offset * 8,
                      scale: offset === 0 ? 1 : 0.82,
                      opacity: isVisible ? (offset === 0 ? 1 : 0.4) : 0,
                    }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                    onClick={() => {
                      if (offset === 0) handleClick(item);
                      else setActiveIndex(i);
                    }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: CARD_W,
                      aspectRatio: '3/4',
                      marginLeft: `calc(-1 * (${CARD_W}) / 2)`,
                      marginTop: `calc(-1 * (${CARD_W}) * 4 / 3 / 2)`,
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      zIndex: 10 - Math.abs(offset),
                      boxShadow: offset === 0 ? '0 20px 60px rgba(0,0,0,0.25)' : '0 10px 30px rgba(0,0,0,0.15)',
                    }}
                  >
                    {item.category === 'Video' && item.video ? (
                      <video autoPlay muted loop playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        <source src={item.video} type="video/mp4" />
                      </video>
                    ) : item.cover ? (
                      <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : null}

                    {/* Info overlay on active card */}
                    {offset === 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                          padding: '2rem 1rem 1rem',
                          pointerEvents: 'none',
                        }}
                      >
                        <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sienna)' }}>{item.category}</span>
                        <h3 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.1rem', fontWeight: 500, color: '#F4EFE5', margin: '0.25rem 0 0' }}>{item.title}</h3>
                        {item.sub && <p style={{ fontSize: '0.7rem', color: 'rgba(244,239,229,0.6)', margin: '0.1rem 0 0' }}>{item.sub}</p>}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Carousel controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', zIndex: 20 }}>
              <button
                onClick={toPrev}
                aria-label="Previous"
                style={{ background: 'none', border: '1px solid var(--parchment)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--taupe)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6" /></svg>
              </button>
              <span style={{ fontSize: '0.8rem', color: 'var(--taupe)', fontVariantNumeric: 'tabular-nums' }}>
                {String(activeIndex + 1).padStart(2, '0')} / {String(portfolioItems.length).padStart(2, '0')}
              </span>
              <button
                onClick={toNext}
                aria-label="Next"
                style={{ background: 'none', border: '1px solid var(--parchment)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--taupe)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, animation: 'gentleBounce 2s ease-in-out infinite' }}>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M1 1L10 10L19 1" stroke="var(--taupe)" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </div>
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
        @media (max-width: 768px) {
          .hero-split {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding-top: 2rem !important;
          }
          .hero-split > div:last-child {
            height: 55vh !important;
          }
        }
      `}</style>
    </>
  );
}
