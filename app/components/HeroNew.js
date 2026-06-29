'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import ThreeHero from './ThreeHero';
import YoutubeModal from './YoutubeModal';
import PhotoLightbox from './PhotoLightbox';
import useIsMobile from '../hooks/useIsMobile';

const portfolioItems = [
  {
    id: 'v-toyota',
    category: 'Video',
    title: 'Toyota Finance',
    sub: 'with Red Herring Digital',
    video: '/videos/toyota-loop.mp4',
    poster: '/videos/toyota-thumb.webp',
    youtubeId: '05wzY7a7NIw',
    vertical: false,
  },
  {
    id: 'p-gtano',
    category: 'Photo',
    title: 'GTano',
    sub: 'with GTano',
    cover: '/images/portfolio/gtano/thumb.webp',
    images: [
      '/images/portfolio/gtano/01.webp',
      '/images/portfolio/gtano/02.webp',
      '/images/portfolio/gtano/03.webp',
      '/images/portfolio/gtano/04.webp',
    ],
  },
  {
    id: 'v-evans',
    category: 'Video',
    title: 'Evans',
    sub: '',
    video: '/videos/evans-loop.mp4',
    poster: '/videos/evans-thumb.webp',
    youtubeId: 'DQyhn4jBtzI',
    vertical: true,
  },
  {
    id: 'p-italpaint',
    category: 'Photo',
    title: 'Italpaint',
    sub: '',
    cover: '/images/portfolio/italpaint/thumb.webp',
    images: [
      '/images/portfolio/italpaint/01.webp',
      '/images/portfolio/italpaint/02.webp',
      '/images/portfolio/italpaint/03.webp',
      '/images/portfolio/italpaint/04.webp',
    ],
  },
  {
    id: 'v-wise-words',
    category: 'Video',
    title: 'Wise Words',
    sub: '',
    video: '/videos/wise-words-loop.mp4',
    poster: '/videos/wise-words-thumb.webp',
    youtubeId: '7Jmc3kd6EX0',
    vertical: false,
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
    id: 'v-fratellino',
    category: 'Video',
    title: 'Fratellino Pizzeria',
    sub: '',
    video: '/videos/fratellino-loop.mp4',
    poster: '/videos/fratellino-thumb.jpg',
    youtubeId: 'm8Hx8bqjomU',
    vertical: true,
  },
  {
    id: 'p-movieproduction',
    category: 'Photo',
    title: 'Movie Production',
    sub: '',
    cover: '/images/portfolio/movieproduction/thumb.webp',
    images: [
      '/images/portfolio/movieproduction/01.webp',
      '/images/portfolio/movieproduction/02.webp',
      '/images/portfolio/movieproduction/03.webp',
      '/images/portfolio/movieproduction/04.webp',
    ],
  },
];

function ProjectCardMedia({ item, isActive }) {
  if (item.category === 'Video' && item.video) {
    return (
      <video
        autoPlay muted loop playsInline
        preload={isActive ? 'auto' : 'none'}
        poster={item.poster}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        {isActive && <source src={item.video} type="video/mp4" />}
      </video>
    );
  }
  if (item.cover) {
    return <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
  }
  return null;
}

function CardOverlay({ item }) {
  return (
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
      <h3 style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '1.1rem', fontWeight: 600, color: '#F4EFE5', margin: '0.25rem 0 0' }}>{item.title}</h3>
      {item.sub && <p style={{ fontSize: '0.7rem', color: 'rgba(244,239,229,0.6)', margin: '0.1rem 0 0' }}>{item.sub}</p>}
    </div>
  );
}

function MobileProjectCarousel({ items, onClickItem }) {
  const ref = useRef(null);
  // Triple the list so the user always has cards in both directions
  const tripled = [...items, ...items, ...items];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3; // start in the middle set

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const t = el.scrollWidth / 3;
        if (el.scrollLeft < t * 0.5) el.scrollLeft += t;
        else if (el.scrollLeft > t * 1.5) el.scrollLeft -= t;
        ticking = false;
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={ref} className="snap-carousel mobile-carousel">
      {tripled.map((item, i) => {
        const setIdx = Math.floor(i / items.length);
        const clickable = (item.category === 'Video' && item.youtubeId) || (item.category === 'Photo' && item.images);
        return (
          <div
            key={`${item.id}-${setIdx}`}
            className="mobile-carousel-card"
            onClick={() => onClickItem(item)}
            style={{ cursor: clickable ? 'pointer' : 'default' }}
          >
            <ProjectCardMedia item={item} />
            <CardOverlay item={item} />
          </div>
        );
      })}
    </div>
  );
}

export default function HeroNew() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [canvasReady, setCanvasReady] = useState(false);

useEffect(() => {
  const t = setTimeout(() => setCanvasReady(true), 300);
  return () => clearTimeout(t);
}, []);

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

  const CARD_W = 'clamp(360px, 40vw, 600px)';

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
        {/* Canvas line network background — lazy mount dopo il primo paint */}
<div style={{
  position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
  opacity: canvasReady ? 0.85 : 0,
  transition: 'opacity 1s ease',
}}>
  {canvasReady && <ThreeHero />}
</div>

{/* SVG statico mobile — stesso feeling, zero JS */}
{isMobile && (
  <svg
    aria-hidden="true"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.5 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="var(--taupe)" strokeWidth="0.5" opacity="0.4">
      <line x1="10%" y1="15%" x2="35%" y2="40%"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite"/></line>
      <line x1="35%" y1="40%" x2="70%" y2="20%"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="5s" repeatCount="indefinite"/></line>
      <line x1="70%" y1="20%" x2="90%" y2="55%"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.5s" repeatCount="indefinite"/></line>
      <line x1="90%" y1="55%" x2="60%" y2="80%"><animate attributeName="opacity" values="0.4;0.7;0.4" dur="6s" repeatCount="indefinite"/></line>
      <line x1="60%" y1="80%" x2="25%" y2="65%"><animate attributeName="opacity" values="0.3;0.5;0.3" dur="4.5s" repeatCount="indefinite"/></line>
      <line x1="25%" y1="65%" x2="10%" y2="15%"><animate attributeName="opacity" values="0.5;0.3;0.5" dur="5.5s" repeatCount="indefinite"/></line>
      <line x1="35%" y1="40%" x2="60%" y2="80%"><animate attributeName="opacity" values="0.2;0.4;0.2" dur="7s" repeatCount="indefinite"/></line>
      <line x1="70%" y1="20%" x2="25%" y2="65%"><animate attributeName="opacity" values="0.4;0.2;0.4" dur="6.5s" repeatCount="indefinite"/></line>
    </g>
    <g fill="var(--taupe)" opacity="0.5">
      <circle cx="10%" cy="15%" r="2"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite"/></circle>
      <circle cx="35%" cy="40%" r="2"><animate attributeName="opacity" values="0.5;1;0.5" dur="5s" repeatCount="indefinite"/></circle>
      <circle cx="70%" cy="20%" r="2"><animate attributeName="opacity" values="0.4;0.9;0.4" dur="3.5s" repeatCount="indefinite"/></circle>
      <circle cx="90%" cy="55%" r="2"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="6s" repeatCount="indefinite"/></circle>
      <circle cx="60%" cy="80%" r="2"><animate attributeName="opacity" values="0.5;0.8;0.5" dur="4.5s" repeatCount="indefinite"/></circle>
      <circle cx="25%" cy="65%" r="2"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="5.5s" repeatCount="indefinite"/></circle>
    </g>
  </svg>
)}

        {/* Two-column container */}
        <div
          className="hero-split site-container"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
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
              className="t-h1"
              style={{ marginBottom: 'var(--space-title-to-body)' }}
            >
              <span style={{ color: 'var(--sienna)' }}>Crafted,</span> not created.
            </h1>
            <p
              className="t-body"
              style={{ maxWidth: '480px', marginBottom: 'var(--space-body-to-cta)' }}
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
                  borderRadius: '6px',
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

          {/* RIGHT: mobile stack or desktop 3D carousel */}
          {isMobile ? (
            <MobileProjectCarousel items={portfolioItems} onClickItem={handleClick} />
          ) : (
          <div
            ref={carouselRef}
            style={{
              position: 'relative',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Carousel stage */}
            <div className="carousel-stage" style={{ position: 'relative', width: '100%', height: 'clamp(380px, 44vw, 520px)', perspective: '1200px' }}>
              {portfolioItems.map((item, i) => {
                let offset = i - activeIndex;
                const half = portfolioItems.length / 2;
                if (offset > half) offset -= portfolioItems.length;
                if (offset < -half) offset += portfolioItems.length;
                const isVisible = Math.abs(offset) <= 1;

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      y: `${offset * 22}%`,
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
                      aspectRatio: '16/9',
                      marginLeft: `calc(-1 * (${CARD_W}) / 2)`,
                      marginTop: `calc(-1 * (${CARD_W}) * 9 / 16 / 2)`,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      zIndex: 10 - Math.abs(offset),
                      boxShadow: offset === 0 ? '0 20px 60px rgba(0,0,0,0.25)' : '0 10px 30px rgba(0,0,0,0.15)',
                    }}
                  >
                    <ProjectCardMedia item={item} isActive={offset === 0} />
                    {offset === 0 && <CardOverlay item={item} />}
                  </motion.div>
                );
              })}
            </div>

            {/* Carousel controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '1rem', marginTop: '0.5rem', zIndex: 20 }}>
              <button
                onClick={toPrev}
                aria-label="Previous project"
                style={{
                  background: 'transparent',
                  border: '1.5px solid var(--sienna)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--sienna)',
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sienna)'; e.currentTarget.style.color = '#F4EFE5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--sienna)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6" /></svg>
              </button>
              <button
                onClick={toNext}
                aria-label="Next project"
                style={{
                  background: 'transparent',
                  border: '1.5px solid var(--sienna)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--sienna)',
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sienna)'; e.currentTarget.style.color = '#F4EFE5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--sienna)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
            </div>
          </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator" style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, animation: 'gentleBounce 2s ease-in-out infinite' }}>
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
        .mobile-carousel {
          align-items: flex-start;
          gap: 1rem;
          overflow-y: visible;
          scroll-padding-inline-start: 0;
          padding: 0 1.5rem 1.75rem 0;
        }
        .mobile-carousel-card {
          flex: 0 0 auto;
          width: 90%;
          max-width: 420px;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          background-color: var(--ivory);
        }
        .mobile-carousel-card img,
        .mobile-carousel-card video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 767px) {
          .hero-split {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding-top: 2rem !important;
          }
          .hero-scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
