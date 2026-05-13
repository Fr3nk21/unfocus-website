'use client';
import { useState, useEffect, useCallback } from 'react';

export default function PhotoLightbox({ isOpen, onClose, images = [], title = '' }) {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    setCurrent(0);
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(14,12,8,0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close gallery"
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'none',
          border: 'none',
          color: 'rgba(244,239,229,0.6)',
          fontSize: '1.5rem',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sienna)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,239,229,0.6)')}
      >
        ✕
      </button>

      {/* Title + counter */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1rem',
            color: 'rgba(244,239,229,0.7)',
            fontWeight: 500,
            margin: 0,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: '0.75rem',
            color: 'rgba(244,239,229,0.35)',
            fontWeight: 300,
            letterSpacing: '0.1em',
            margin: '0.25rem 0 0',
          }}
        >
          {current + 1} / {images.length}
        </p>
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          aria-label="Previous photo"
          style={{
            position: 'absolute',
            left: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: '1px solid rgba(244,239,229,0.2)',
            color: 'rgba(244,239,229,0.6)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.125rem',
            zIndex: 10,
            transition: 'border-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--sienna)'; e.currentTarget.style.color = 'var(--sienna)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(244,239,229,0.2)'; e.currentTarget.style.color = 'rgba(244,239,229,0.6)'; }}
        >
          ←
        </button>
      )}

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '85vw',
          maxHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
        }}
      >
        <img
          src={images[current]}
          alt={`${title} — photo ${current + 1}`}
          style={{
            maxWidth: '100%',
            maxHeight: '85vh',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          aria-label="Next photo"
          style={{
            position: 'absolute',
            right: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: '1px solid rgba(244,239,229,0.2)',
            color: 'rgba(244,239,229,0.6)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.125rem',
            zIndex: 10,
            transition: 'border-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--sienna)'; e.currentTarget.style.color = 'var(--sienna)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(244,239,229,0.2)'; e.currentTarget.style.color = 'rgba(244,239,229,0.6)'; }}
        >
          →
        </button>
      )}
    </div>
  );
}
