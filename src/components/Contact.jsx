import { useState } from 'react';

const SOCIAL_LINKS = [
  {
    href: 'mailto:prashantmalagi60@gmail.com',
    label: 'Email',
    value: 'prashantmalagi60@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/prashant-malagi-444221326',
    target: '_blank',
    label: 'LinkedIn',
    value: 'prashant-malagi-444221326',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
  {
    href: 'https://github.com/prashantmalagi',
    target: '_blank',
    label: 'GitHub',
    value: 'github.com/prashantmalagi',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/prashant.malagi/',
    target: '_blank',
    label: 'Instagram',
    value: 'prashant.malagi',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const ChevronRight = () => (
  <svg className="csocial-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/mldwzjey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <div className="section-label" data-reveal>Get In Touch</div>
        <h2 className="section-heading" data-reveal>
          Let&apos;s <span className="gradient-text">Work Together</span>
        </h2>
        <p className="section-sub" data-reveal>
          Whether it&apos;s a job opportunity, freelance project, or just a hello — my inbox is always open.
        </p>

        <div className="contact-grid">

          {/* ── Contact form ─────────────────────────── */}
          <div className="contact-form-wrap glass-card" data-reveal>
            <h3 className="contact-form-title">Send a Message</h3>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contactName" className="form-label">Your Name</label>
                <input
                  id="contactName"
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Prashanth Malagi"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactEmail" className="form-label">Email Address</label>
                <input
                  id="contactEmail"
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="hello@example.com"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactMsg" className="form-label">Message</label>
                <textarea
                  id="contactMsg"
                  name="message"
                  className="form-input form-textarea"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {status === 'success' && (
                <p style={{ color: 'var(--green)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  ✓ Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p style={{ color: '#f87171', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  ✕ Something went wrong. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                id="submitBtn"
                className="btn btn-primary btn-full"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : <>Send Message <SendIcon /></>}
              </button>
            </form>
          </div>

          {/* ── Social links ──────────────────────────── */}
          <div className="contact-info-wrap" data-reveal>
            <h3 className="contact-info-title">Connect With Me</h3>
            <p className="contact-info-desc">
              Prefer a direct chat? Reach out on any of these platforms.
            </p>
            <div className="contact-social-list">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="contact-social-item"
                >
                  <div className="csocial-icon">{link.icon}</div>
                  <div>
                    <div className="csocial-label">{link.label}</div>
                    <div className="csocial-value">{link.value}</div>
                  </div>
                  <ChevronRight />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
