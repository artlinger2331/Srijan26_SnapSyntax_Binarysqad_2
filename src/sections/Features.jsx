import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // ... animation layout ...
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-row', 
        { y: 100, opacity: 0 },
        { 
          scrollTrigger: {
            trigger: '.features-light',
            start: 'top 80%',
          },
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' 
        }
      );

      const images = gsap.utils.toArray('.feature-image img');
      images.forEach(img => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom", 
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuresData = [
    {
      id: "dynamic-pricing",
      title: "Dynamic Pricing Engine",
      subtitle: "Anti-Food Waste Module",
      description: "Prices adjust dynamically as closing time approaches. A live discount curve tracks prime inventory, optimizing sales and completely eliminating end-of-day restaurant waste.",
      image: "/media/pexels-ali-dashti-506667798-22809626.jpg", // Ice cream
      reverse: false,
      link: "/dynamic-pricing"
    },
    {
      id: "gut-health",
      title: "Gut-Health Recommender",
      subtitle: "Personalized Nutrition OS",
      description: "Input specific health symptoms. The engine mathematically pairs you with optimal local food items, generating scientifically backed recommendations.",
      image: "/media/pexels-ryshy-s-2149956588-35539324.jpg", // Thali
      reverse: true,
      link: "/gut-health"
    },
    {
      id: "heatmap",
      title: "Midnight Availability Heatmap",
      subtitle: "Real-Time Tracking",
      description: "Navigate the night economy. The real-time mapping module displays active open kitchens, tracking popular late-night food clusters instantly.",
      image: "/media/pexels-jagan-sai-632000456-17497626.jpg", // Biryani
      reverse: false,
      link: "/midnight-map"
    }
  ];

  return (
    <section ref={sectionRef} className="features-light section" id="features">
      <div className="container">
        


        <div className="features-list">
          {featuresData.map((feature, idx) => (
            <div className={`feature-row ${feature.reverse ? 'reverse' : ''}`} key={idx}>
              
              <div className="feature-text">
                <span className="feature-kicker">{feature.subtitle}</span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
                {feature.link !== "#" ? (
                  <Link to={feature.link} className="outline-btn">Learn More</Link>
                ) : (
                  <a href="#learn" className="outline-btn">Learn More</a>
                )}
              </div>

              <div className="feature-image-wrapper">
                <div className="feature-image">
                  <img src={feature.image} alt={feature.title} />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
