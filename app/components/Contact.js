'use client';

import { useState } from 'react';
import RevealWrapper from './RevealWrapper';
import SectionLabel from './SectionLabel';

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
      className="contact-section site-section"
      style={{
        backgroundColor: 'var(--charcoal)',
      }}
    >
      <RevealWrapper>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="contact-grid site-container"
        >
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SectionLabel number="04" />
            <p className="t-eyebrow">Contact</p>
            <h2
              className="t-h2"
              style={{ marginBottom: 'var(--space-title-to-body)' }}
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
              className="t-body"
              style={{
                color: 'rgba(244,239,229,0.65)',
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

            {/* Service area map */}
            <div style={{ marginTop: '2.5rem' }}>
              <p className="t-eyebrow">
                Based in Richmond · Serving Greater Melbourne
              </p>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '260px',
                borderRadius: '12px',
                overflow: 'hidden',
                filter: 'grayscale(0.3) contrast(1.05)',
              }}>
                <iframe
                  title="Francesco Bugugnoli service area — Richmond, Melbourne"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50410.0!2d144.99!3d-37.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sau!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
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
