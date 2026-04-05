import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Dynamic Pricing', href: '/dynamic-pricing' },
      { label: 'Gut-Health AI', href: '/gut-health' },
      { label: 'Midnight Map', href: '/midnight-map' },
      { label: 'Bill Analyzer', href: '#' }
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' }
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' }
    ],
  },
];

const socials = [
  { label: 'Twitter', icon: '𝕏' },
  { label: 'GitHub', icon: '⬡' },
  { label: 'LinkedIn', icon: 'in' },
  { label: 'Discord', icon: '◉' },
];

export default function Footer() {
  return (
    <footer className="footer section" id="footer">
      {/* Gradient divider */}
      <div className="footer-divider" />

      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <span className="logo-icon">🍽️</span>
              <span className="logo-text">
                Food<span className="gradient-text">Verse</span>
              </span>
            </a>
            <p className="footer-tagline">
              Revolutionizing food with intelligence. Six features, zero waste, infinite possibilities.
            </p>
            <div className="footer-socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="social-link"
                  data-cursor-hover
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title} className="footer-column">
              <h4 className="footer-column-title">{group.title}</h4>
              <ul className="footer-column-links">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                        <Link to={link.href} className="footer-link" data-cursor-hover>
                          {link.label}
                        </Link>
                    ) : (
                        <a href={link.href} className="footer-link" data-cursor-hover>
                          {link.label}
                        </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 FoodVerse. All rights reserved.
          </p>
          <p className="footer-made">
            Made with <span style={{ color: 'var(--accent-pink)' }}>♥</span> for the future of food
          </p>
        </div>
      </div>
    </footer>
  );
}
