'use client';

import RevealWrapper from './RevealWrapper';

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      style={{
        backgroundColor: 'var(--charcoal)',
        padding: '7rem 2rem',
      }}
    >
      <RevealWrapper>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left column */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.12,
                fontWeight: 700,
                color: 'var(--ivory)',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Let&apos;s make something{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  color: 'var(--sienna)',
                }}
              >
                great
              </em>
            </h2>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.72,
                color: 'rgba(244,239,229,0.65)',
                fontWeight: 300,
                marginBottom: '2.5rem',
                maxWidth: '400px',
              }}
            >
              Whether you have a brief or just an idea, I&apos;d love to hear
              about your project. Based in Richmond, available across all
              Melbourne and greater Victoria.
            </p>

            <address
              style={{
                fontStyle: 'normal',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--taupe)',
                    display: 'block',
                    marginBottom: '0.2rem',
                  }}
                >
                  Studio
                </span>
                <span
                  style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(244,239,229,0.8)',
                    fontWeight: 300,
                  }}
                >
                  Richmond, VIC 3121, Australia
                </span>
              </div>

              <div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--taupe)',
                    display: 'block',
                    marginBottom: '0.2rem',
                  }}
                >
                  Serves
                </span>
                <span
                  style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(244,239,229,0.8)',
                    fontWeight: 300,
                  }}
                >
                  Melbourne Metro &amp; Greater Victoria
                </span>
              </div>

              <div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--taupe)',
                    display: 'block',
                    marginBottom: '0.2rem',
                  }}
                >
                  Phone
                </span>
                <a
                  href="tel:+61400000000"
                  style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(244,239,229,0.8)',
                    fontWeight: 300,
                    textDecoration: 'none',
                  }}
                >
                  +61 400 000 000
                </a>
              </div>

              <div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--taupe)',
                    display: 'block',
                    marginBottom: '0.2rem',
                  }}
                >
                  Email
                </span>
                <a
                  href="mailto:hello@francescobugugnoli.com"
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--sienna)',
                    fontWeight: 300,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  hello@francescobugugnoli.com
                </a>
              </div>
            </address>
          </div>

          {/* Right column — form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {[
              { label: 'Your Name', type: 'text', name: 'name', placeholder: 'Your Name' },
              { label: 'Email Address', type: 'email', name: 'email', placeholder: 'Email Address' },
            ].map((field) => (
              <div key={field.name}>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(244,239,229,0.2)',
                    padding: '0.75rem 0',
                    fontSize: '0.9375rem',
                    color: 'var(--ivory)',
                    outline: 'none',
                    fontFamily: 'var(--font-dmsans), system-ui, sans-serif',
                    fontWeight: 300,
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--sienna)')}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(244,239,229,0.2)')}
                />
              </div>
            ))}

            <div>
              <select
                id="service-input"
                name="service"
                defaultValue=""
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(244,239,229,0.2)',
                  padding: '0.75rem 0',
                  fontSize: '0.9375rem',
                  color: 'var(--ivory)',
                  outline: 'none',
                  fontFamily: 'var(--font-dmsans), system-ui, sans-serif',
                  fontWeight: 300,
                  transition: 'border-color 0.3s ease',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                }}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--sienna)')}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(244,239,229,0.2)')}
              >
                <option value="" disabled style={{ backgroundColor: 'var(--charcoal)' }}>
                  Service Needed
                </option>
                {[
                  'Social Media Video',
                  'Hospitality & Food',
                  'Corporate Video',
                  'Event Coverage',
                  'Legacy Video',
                  'Commercial Photography',
                  'Other',
                ].map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: 'var(--charcoal)' }}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(244,239,229,0.2)',
                  padding: '0.75rem 0',
                  fontSize: '0.9375rem',
                  color: 'var(--ivory)',
                  outline: 'none',
                  fontFamily: 'var(--font-dmsans), system-ui, sans-serif',
                  fontWeight: 300,
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--sienna)')}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(244,239,229,0.2)')}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '1rem 2rem',
                backgroundColor: 'var(--sienna)',
                color: '#F4EFE5',
                border: 'none',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.82'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </RevealWrapper>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
