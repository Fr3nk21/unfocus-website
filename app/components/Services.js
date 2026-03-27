'use client';

import RevealWrapper from './RevealWrapper';
import { scrollToContactWithService } from '../lib/contactUtils';

const services = [
  { index: '01', title: 'Social Media Video',     description: 'Short-form vertical content optimised for Instagram, TikTok, and YouTube Shorts.', prefill: 'Social Media Video' },
  { index: '02', title: 'Hospitality & Food',     description: 'Atmosphere, texture, and flavour rendered in cinematic light.',                    prefill: 'Hospitality & Food' },
  { index: '03', title: 'Corporate Video',         description: 'Brand films, testimonials, and internal comms that mean something.',                prefill: 'Corporate Video' },
  { index: '04', title: 'Event Coverage',          description: 'Weddings, launches, and brand activations preserved beautifully.',                  prefill: 'Event Coverage' },
  { index: '05', title: 'Legacy Video',            description: 'Family histories and milestone moments preserved for generations.',                  prefill: 'Legacy Video' },
  { index: '06', title: 'Commercial Photography',  description: 'Still imagery for menus, campaigns, and social assets.',                           prefill: 'Commercial Photography' },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{
        backgroundColor: 'var(--ivory)',
        padding: '7rem 2rem',
        borderTop: '1px solid var(--parchment)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Intro */}
        <RevealWrapper
          style={{
            maxWidth: '600px',
            marginBottom: '4rem',
          }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--taupe)',
              marginBottom: '1rem',
              fontWeight: 400,
            }}
          >
            What we do
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              lineHeight: 1.15,
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }}
          >
            Crafted for every format
          </h2>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.72,
              color: 'var(--charcoal)',
              fontWeight: 300,
              maxWidth: '480px',
            }}
          >
            From one-second reels to full documentary productions — every
            project receives the same level of craft and intention.
          </p>
        </RevealWrapper>

        {/* Service rows */}
        <div>
          {services.map((service) => (
            <RevealWrapper key={service.index}>
              <article
                className="service-line"
                role="button"
                tabIndex={0}
                onClick={() => scrollToContactWithService(service.prefill)}
                onKeyDown={(e) => e.key === 'Enter' && scrollToContactWithService(service.prefill)}
                aria-label={`Enquire about ${service.title}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3rem 1fr auto auto',
                  alignItems: 'center',
                  gap: '2rem',
                  padding: '1.5rem 0',
                  borderTop: '1px solid var(--parchment)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const title = e.currentTarget.querySelector('[data-title]');
                  const arrow = e.currentTarget.querySelector('[data-arrow]');
                  if (title) title.style.color = 'var(--sienna)';
                  if (arrow) arrow.style.transform = 'translateY(6px)';
                }}
                onMouseLeave={(e) => {
                  const title = e.currentTarget.querySelector('[data-title]');
                  const arrow = e.currentTarget.querySelector('[data-arrow]');
                  if (title) title.style.color = 'var(--ink)';
                  if (arrow) arrow.style.transform = 'translateY(0)';
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--taupe)',
                    fontWeight: 300,
                    letterSpacing: '0.06em',
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontStyle: 'italic',
                  }}
                >
                  {service.index}
                </span>
                <div>
                  <h3
                    data-title
                    style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      marginBottom: '0.25rem',
                      transition: 'color 0.3s ease',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--taupe)',
                      fontWeight: 300,
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {service.description}
                  </p>
                </div>
                <span
                  data-arrow
                  style={{
                    color: 'var(--sienna)',
                    fontSize: '1.125rem',
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                  }}
                >
                  ↓
                </span>
              </article>
            </RevealWrapper>
          ))}
          {/* Last border */}
          <div style={{ borderTop: '1px solid var(--parchment)' }} />
        </div>
      </div>
    </section>
  );
}
