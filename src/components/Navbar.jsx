import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Join', href: '/#cta' },
  ];

  return (
    <motion.nav
      ref={navRef}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="navbar-inner">
        {/* Logo */}
        <a href="/" className="navbar-logo" data-cursor-hover data-cursor-text="Home">
          <span className="logo-icon">🍽️</span>
          <span className="logo-text">
            Food<span className="gradient-text">Verse</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link"
                data-cursor-hover
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a href="/#cta" className="navbar-cta glow-button" data-cursor-hover data-cursor-text="Go">
          Get Started
        </a>

        {/* Mobile Burger */}
        <button
          className={`navbar-burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-cursor-hover
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="/#cta" className="glow-button mobile-cta" onClick={() => setMenuOpen(false)}>
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
