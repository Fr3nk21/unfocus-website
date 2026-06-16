'use client';

import { useState } from 'react';
import RevealWrapper from './RevealWrapper';

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    const form = e.currentTarget;

    // Honeypot check — if filled, silently pretend success
    if (form.website && form.website.value) {
      setStatus('sent');
      return;
    }

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      service: form.service.value || '',
      location: form.location.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong.');
      }
      setStatus('sent');
      form.reset();
    } catch (err) {
      if (err.name === 'AbortError') {
        setErrorMsg('Request timed out. Please check your connection and try again.');
      } else {
        setErrorMsg(err.message);
      }
      setStatus('error');
    }
  }

  return (
    <section
      id="contact"
      className="contact-section"
      style={{
        backgroundColor: 'var(--charcoal)',
        padding: '5rem 2rem',
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
              Let&apos;s{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  color: 'var(--sienna)',
                }}
              >
                work
              </em>{' '}
              together.
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
              Have a project in mind? I&apos;d love to hear about it.
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
                  Serves
                </span>
                <span
                  style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(244,239,229,0.8)',
                    fontWeight: 300,
                  }}
                >
                  Melbourne &amp; Greater Victoria
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
                  href="tel:+61476278891"
                  style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(244,239,229,0.8)',
                    fontWeight: 300,
                    textDecoration: 'none',
                  }}
                >
                  +61 476 278 891
                </a>
              </div>

            </address>
          </div>

          {/* Right column — form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Honeypot — hidden from real users, catches bots */}
            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {[
              { label: 'Your Name', type: 'text', name: 'name', placeholder: 'Your Name' },
              { label: 'Email Address', type: 'email', name: 'email', placeholder: 'Email Address' },
            ].map((field) => (
              <div key={field.name}>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  aria-label={field.label}
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
                aria-label="Service needed"
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
              <input
                type="text"
                name="location"
                placeholder="What's your location?"
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
              disabled={status === 'sending' || status === 'sent'}
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '1rem 2rem',
                backgroundColor: status === 'sent' ? '#3a6a3a' : 'var(--sienna)',
                color: 'var(--ivory)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                cursor: status === 'sending' || status === 'sent' ? 'default' : 'pointer',
                transition: 'opacity 0.3s ease, background-color 0.3s ease',
                opacity: status === 'sending' || status === 'sent' ? 0.75 : 1,
              }}
              onMouseEnter={(e) => { if (status !== 'sending' && status !== 'sent') e.currentTarget.style.opacity = '0.82'; }}
              onMouseLeave={(e) => { if (status !== 'sending' && status !== 'sent') e.currentTarget.style.opacity = '1'; }}
            >
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Send Enquiry'}
            </button>
            {status === 'error' && (
              <p style={{ color: '#e05a5a', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errorMsg}</p>
            )}
            {status === 'sent' && (
              <p style={{ color: '#6aaa6a', fontSize: '0.875rem', marginTop: '0.5rem' }}>Thank you! I&apos;ll get back to you soon.</p>
            )}
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
