import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation for numbers
      const numbers = gsap.utils.toArray('.stat-num');
      
      numbers.forEach((num) => {
        const target = parseFloat(num.getAttribute('data-target'));
        const isFloat = num.getAttribute('data-target').includes('.');
        const prefix = num.getAttribute('data-prefix') || '';
        const suffix = num.getAttribute('data-suffix') || '';

        gsap.to(num, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
          innerHTML: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerHTML: isFloat ? 0.1 : 1 },
          onUpdate: function() {
            num.innerHTML = prefix + Number(this.targets()[0].innerHTML).toFixed(isFloat ? 1 : 0) + suffix;
          }
        });
      });
      
      // Simple fade up for stats items
      gsap.fromTo('.stat-item', 
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 75%'
          },
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          duration: 0.8
        }
      );

    }, statsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={statsRef} className="stats-light section">
      <div className="container">
        
        <div className="stats-header-light">
          <h2>Proven Impact Metrics</h2>
          <p>Real-time data demonstrating the efficacy of our intelligence platform.</p>
        </div>

        <div className="stats-grid">
          
          <div className="stat-item">
            <div className="stat-num" data-target="4.2" data-suffix="M">0</div>
            <div className="stat-label">Tons of Food Saved</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-num" data-target="85" data-suffix="%">0</div>
            <div className="stat-label">Reduction in Waste</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-num" data-target="300" data-suffix="+">0</div>
            <div className="stat-label">Active Deployments</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-num" data-target="15" data-prefix="$" data-suffix="M">0</div>
            <div className="stat-label">Partner Revenue Retained</div>
          </div>

        </div>
      </div>
    </section>
  );
}
