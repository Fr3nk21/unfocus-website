'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import ThreeHero from './ThreeHero';
import RevealWrapper from './RevealWrapper';
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

  const toPrev = () => setActiveIndex((p) => (p - 1 + portfolioItems.length) % portfolioItems.length);
  const toNext = () => setActiveIndex((p) => (p + 1) % portfolioItems.length);
  const toSlide = (i) => setActiveIndex(i);

  function handleProjectClick(item) {
    if (item.category === 'Video' && item.youtubeId) {
      setActiveVideo(item);
      setModalOpen(true);
    } else if (item.category === 'Photo' && item.images) {
      setActivePhoto(item);
      setLightboxOpen(true);
    }
  }

  const CARD_W = 'clamp(220px, 28vw, 340px)';

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--ivory)',
          paddingTop: '72px',
        }}
      >
        {/* Canvas line network */}
        <ThreeHero />

        {/* Hero content — left aligned */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem',
            width: '100%',
          }}
        >
          <RevealWrapper delay={0}>
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                fontWeight: 400,
                marginBottom: '1.5rem',
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
          </RevealWrapper>

          <RevealWrapper delay={0.15}>
            <h1
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                fontWeight: 700,
                color: 'var(--ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '1.75rem',
              }}
            >
              <em style={{ fontStyle: 'italic', color: 'var(--sienna)' }}>Crafted,</em> not created.
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={0.3}>
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.72,
                color: 'var(--charcoal)',
                maxWidth: '500px',
                marginBottom: '2.5rem',
                fontWeight: 300,
                opacity: 0.85,
              }}
            >
              Video and photography for hospitality, corporate, and social brands. Based in Melbourne.
            </p>
          </RevealWrapper>

          <RevealWrapper delay={0.45}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
                style={{
                  color: 'var(--taupe)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  fontWeight: 400,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'color 0.2s ease, gap 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--sienna)';
                  e.currentTarget.style.gap = '0.7rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--taupe)';
                  e.currentTarget.style.gap = '0.4rem';
                }}
              >
                What I do →
              </a>
            </div>
          </RevealWrapper>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            animation: 'gentleBounce 2s ease-in-out infinite',
          }}
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 1L10 10L19 1" stroke="var(--taupe)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      {/* ── CAROUSEL ─────────────────────────────────────────────────── */}
      <section
        id="portfolio"
        style={{
          padding: '5rem 0 7rem',
          backgroundColor: 'var(--ivory)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem',
            marginBottom: '3rem',
          }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--taupe)',
              marginBottom: '0.5rem',
            }}
          >
            Portfolio
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--ink)',
            }}
          >
            Recent work
          </h2>
        </div>

        {/* Track — infinite circular carousel, active card centered */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: CARD_W,
            perspective: '1200px',
            padding: '1rem 0 0.5rem',
          }}
        >
          {portfolioItems.map((item, i) => {
            // Shortest circular distance from active
            let offset = i - activeIndex;
            const half = portfolioItems.length / 2;
            if (offset > half) offset -= portfolioItems.length;
            if (offset < -half) offset += portfolioItems.length;

            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 3;

            return (
              <motion.div
                key={item.id}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  width: CARD_W,
                  aspectRatio: '1/1',
                  marginLeft: `calc(-1 * (${CARD_W}) / 2)`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: isActive && !(item.youtubeId || item.images) ? 'default' : 'pointer',
                  willChange: 'transform',
                }}
                animate={{
                  x: `${offset * 105}%`,
                  rotateY: offset * -25,
                  scale: isActive ? 1 : 0.8,
                  opacity: isVisible ? (isActive ? 1 : 0.5) : 0,
                  zIndex: 10 - Math.abs(offset),
                }}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                onClick={() => {
                  if (isActive) handleProjectClick(item);
                  else toSlide(i);
                }}
              >
                {/* Media */}
                  {item.category === 'Video' && item.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                  ) : item.cover ? (
                    <img
                      src={item.cover}
                      alt={item.title}
                      loading={i < 4 ? 'eager' : 'lazy'}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : null}

                  {/* Gradient */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '55%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  />

                  {/* Category badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#F4EFE5',
                      backgroundColor: 'var(--sienna)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '3px',
                      zIndex: 2,
                    }}
                  >
                    {item.category}
                  </span>

                  {/* Title — only on active */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1rem',
                      right: '1rem',
                      zIndex: 2,
                    }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      filter: isActive ? 'blur(0px)' : 'blur(4px)',
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-playfair), Georgia, serif',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        color: '#F4EFE5',
                        margin: 0,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.title}
                    </p>
                    {item.sub && (
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: 'rgba(244,239,229,0.6)',
                          fontWeight: 300,
                          margin: '0.15rem 0 0',
                        }}
                      >
                        {item.sub}
                      </p>
                    )}
                    {item.youtubeId && (
                      <p style={{ fontSize: '0.7rem', color: 'rgba(244,239,229,0.45)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                        Watch full video
                      </p>
                    )}
                    {item.images && (
                      <p style={{ fontSize: '0.7rem', color: 'rgba(244,239,229,0.45)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><rect x="7" y="7" width="10" height="10" rx="1" /></svg>
                        View {item.images.length} photos
                      </p>
                    )}
                  </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1.25rem',
          }}
        >
          <button onClick={toPrev} className="carousel-btn" aria-label="Previous">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {portfolioItems.map((_, i) => (
              <div
                key={i}
                onClick={() => toSlide(i)}
                style={{
                  width: activeIndex === i ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: activeIndex === i ? 'var(--sienna)' : 'var(--parchment)',
                  cursor: 'pointer',
                  transition: 'width 0.3s ease, background-color 0.3s ease',
                }}
              />
            ))}
          </div>

          <button onClick={toNext} className="carousel-btn" aria-label="Next">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
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
        .carousel-btn {
          background: none;
          border: 1px solid var(--parchment);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--taupe);
          transition: border-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
        }
        .carousel-btn:hover:not(:disabled) {
          border-color: var(--sienna);
          color: var(--sienna);
        }
        .carousel-btn:disabled {
          opacity: 0.3;
          cursor: default;
        }
        @media (max-width: 768px) {
          #hero h1 {
            font-size: clamp(2.2rem, 12vw, 4rem) !important;
          }
        }
      `}</style>
    </>
  );
}
