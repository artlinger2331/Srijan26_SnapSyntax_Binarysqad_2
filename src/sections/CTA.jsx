import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content > *',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section ref={sectionRef} className="cta section" id="cta">
      <div className="container">
        <div className="cta-card">
          {/* Animated gradient border */}
          <div className="cta-border-glow" />

          {/* Background Video */}
          <video 
            className="cta-video-bg" 
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/media/5820008-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          
          <div className="cta-video-overlay" />

          <div className="cta-content">

            <h2 className="cta-title">
              Join the Food <br />
              <span className="gradient-text">Revolution</span>
            </h2>
            <p className="cta-description">
              Be the first to experience the future of food intelligence.
              Early access is limited — reserve your spot now.
            </p>

            <form className="cta-form" onSubmit={handleSubmit}>
              <div className="cta-input-wrapper">
                <input
                  type="email"
                  className="cta-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-cursor-hover
                  id="cta-email-input"
                />
                <motion.button
                  type="submit"
                  className="cta-submit glow-button"
                  data-cursor-hover
                  data-cursor-text="Join"
                  whileTap={{ scale: 0.95 }}
                  id="cta-submit-button"
                >
                  {submitted ? '✓ Joined!' : 'Get Early Access'}
                </motion.button>
              </div>
            </form>

            <p className="cta-note">
              🔒 No spam, ever. Unsubscribe anytime.
            </p>

            {/* Trust indicators */}
            <div className="cta-trust">
              <div className="cta-trust-avatars">
                {['🧑‍💻', '👩‍🔬', '👨‍🍳', '👩‍💼', '🧑‍🎨'].map((emoji, i) => (
                  <span key={i} className="cta-avatar" style={{ zIndex: 5 - i }}>
                    {emoji}
                  </span>
                ))}
              </div>
              <span className="cta-trust-text">
                <strong>2,400+</strong> people already waitlisted
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
