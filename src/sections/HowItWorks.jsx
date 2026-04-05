import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal steps sequentially on scroll
      gsap.fromTo('.step-card',
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: '.how-it-works-dark',
            start: 'top 75%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: 'Data Aggregation', desc: 'Securely ingest real-time POS, surplus inventory, and expiry data streams from partner restaurants.' },
    { num: '02', title: 'Algorithmic Pricing', desc: 'The pricing matrix dynamically computes optimal discount curves, minimizing waste while preserving margins.' },
    { num: '03', title: 'Consumer Broadcast', desc: 'Instantaneous push notifications alert targeted consumer segments to limited-time dynamic pricing events.' }
  ];

  return (
    <section ref={sectionRef} className="how-it-works-dark section" id="how-it-works">
      {/* Background layer for the dark section */}
      <div className="dark-bg-layer"></div>

      <div className="container relative-z">
        
        <div className="how-it-works-header">
          <h2>How The Engine Operates</h2>
        </div>

        <div className="steps-grid">
          {steps.map((step, idx) => (
            <div className="step-card" key={idx}>
              <div className="step-num">{step.num}</div>
              <h4 className="step-title">{step.title}</h4>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
