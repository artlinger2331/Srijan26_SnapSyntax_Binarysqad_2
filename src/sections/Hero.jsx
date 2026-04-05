import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeHeroBg from '../components/ThreeHeroBg';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clean intro fade/slide
      const tl = gsap.timeline({ delay: 0.1 });

      gsap.set('.hero-content > *', { opacity: 0, y: 30 });

      tl.to('.hero-content > *', { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.15, 
        ease: 'power3.out' 
      });

      // Parallax text
      gsap.to('.hero-content', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 150,
      });
      
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero light-dark-mixed-dark-section" id="hero">
      {/* Background Video */}
      <video 
        className="hero-video-bg" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/media/12298360_3840_2160_25fps.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay to ensure text readability */}
      <div className="hero-video-overlay" />

      {/* Three.js Layer */}
      <ThreeHeroBg />

      {/* Content */}
      <div className="hero-content container">
        <motion.div className="hero-label-clean">
          Food Intelligence Engine
        </motion.div>

        <h1 className="hero-title-clean">
          The Future of
          <br />
          <span className="text-glow">Food Systems.</span>
        </h1>

        <p className="hero-subtitle-clean">
          Eliminate waste, uncover hidden costs, and optimize your food decisions through intelligent dynamic platforms.
        </p>

        <div className="hero-cta-clean">
          <a href="#features" className="solid-btn">Discover Modules</a>
        </div>
      </div>
    </section>
  );
}
