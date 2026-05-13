'use client';

import { useState, useEffect } from 'react';

const reviews = [
  {
    name: 'Marco Rossi',
    role: 'Restaurant Owner',
    stars: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
  {
    name: 'Sofia Bianchi',
    role: 'Event Coordinator',
    stars: 5,
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
  },
  {
    name: 'Luca Moretti',
    role: 'Marketing Director',
    stars: 5,
    text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
  },
  {
    name: 'Elena Conti',
    role: 'Creative Producer',
    stars: 5,
    text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.',
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      id="testimonial"
      style={{
        backgroundColor: 'var(--cream)',
        padding: '7rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <p
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--taupe)',
            marginBottom: '2.5rem',
            fontWeight: 400,
          }}
        >
          What clients say
        </p>

        {/* Stars */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '4px' }}>
          {[...Array(reviews[active].stars)].map((_, i) => (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--sienna)" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>

        {/* Review text */}
        <blockquote
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontWeight: 400,
            color: 'var(--ink)',
            lineHeight: 1.7,
            fontStyle: 'italic',
            marginBottom: '2rem',
            minHeight: '120px',
            transition: 'opacity 0.4s ease',
          }}
        >
          &ldquo;{reviews[active].text}&rdquo;
        </blockquote>

        {/* Author */}
        <div style={{ marginBottom: '2rem' }}>
          <p
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'var(--ink)',
              marginBottom: '0.25rem',
            }}
          >
            {reviews[active].name}
          </p>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--taupe)',
              fontWeight: 300,
            }}
          >
            {reviews[active].role}
          </p>
        </div>

        {/* Dots navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Review ${i + 1}`}
              style={{
                width: active === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: active === i ? 'var(--sienna)' : 'var(--parchment)',
                border: 'none',
                cursor: 'pointer',
                transition: 'width 0.3s ease, background-color 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
