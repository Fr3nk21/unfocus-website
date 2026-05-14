'use client';

import { useState, useEffect } from 'react';

const reviews = [
  {
    name: 'Marilena Kalavrytinos',
    stars: 5,
    text: 'I am extremely satisfied with the business photos and videos Francesco created. His professionalism and creativity really stand out.',
  },
  {
    name: 'Dylan Tyncherov',
    stars: 5,
    text: 'A remarkably disciplined and creatively driven filmmaker whose work speaks louder than words ever could. Concise, thoughtful, and a true doer.',
  },
  {
    name: 'Stefano Ioele',
    stars: 5,
    text: 'There are thousands of videomakers in Australia, but working with Francesco is just easy. His pragmatic approach and attention to detail make him stand out.',
  },
  {
    name: 'Peter McGregor',
    stars: 5,
    text: 'Worked with him as a DoP and camera operator. He knows what he’s doing, very competent, conscientious and reliable. Very pleasant to work with.',
  },
  {
    name: 'Patrick Dunne',
    stars: 5,
    text: 'Very happy with Francesco’s work. He was patient, easy to work with. I would definitely use him again and recommend his services.',
  },
  {
    name: 'Will Rotor',
    stars: 5,
    text: 'Francesco was very professional with a keen creative eye.',
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
            }}
          >
            {reviews[active].name}
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
                padding: '20px 8px',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
