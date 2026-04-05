import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './GutHealth.css';

const symptomData = {
  acidity: {
    id: 'acidity',
    label: 'High Acidity',
    food: 'Traditional Thali',
    image: '/media/pexels-ryshy-s-2149956588-35539324.jpg',
    why: 'Natural yogurt (probiotics) and balanced alkaline vegetable sides neutralize stomach pH levels aggressively.',
    macros: { protein: '15g', carbs: '45g', fats: '10g' },
    confidence: '94%'
  },
  fatigue: {
    id: 'fatigue',
    label: 'Fatigue / Low Energy',
    food: 'Spiced Chicken Biryani',
    image: '/media/pexels-jagan-sai-632000456-17497626.jpg',
    why: 'Complex basmati carbohydrates paired with high-protein lean meats provide sustained caloric breakdown without insulin spikes.',
    macros: { protein: '35g', carbs: '65g', fats: '18g' },
    confidence: '89%'
  },
  inflammation: {
    id: 'inflammation',
    label: 'Inflammation',
    food: 'Cooling Dairy Bowl',
    image: '/media/pexels-ali-dashti-506667798-22809626.jpg',
    why: 'Rich in anti-inflammatory fats and rapid-cooling properties to soothe the local gastrointestinal tract.',
    macros: { protein: '8g', carbs: '35g', fats: '22g' },
    confidence: '82%'
  }
};

export default function GutHealth() {
  const [activeSymptom, setActiveSymptom] = useState('acidity');
  const activeData = symptomData[activeSymptom];
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gh-page">
      <Navbar />

      {/* Cinematic Tech Header */}
      <header className="gh-hero">
        <video 
          className="gh-hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/media/6645705-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="gh-hero-overlay"></div>
        
        <div className="container gh-hero-content">
          <motion.span 
            className="gh-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Live Diagnostic Engine
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Gut-Health Recommender
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Input biometric symptoms. The engine mathematically pairs you with optimal functional food items.
          </motion.p>
        </div>
      </header>

      <section className="gh-dashboard section">
        <div className="container">
          <div className="gh-grid">
            
            {/* Symptom Selector */}
            <div className="gh-sidebar">
              <h3>Diagnostic Input</h3>
              <p className="gh-context">Select primary symptom parameter:</p>
              
              <div className="symptom-list">
                {Object.values(symptomData).map((symp) => (
                  <button 
                    key={symp.id}
                    className={`symptom-btn ${activeSymptom === symp.id ? 'active' : ''}`}
                    onClick={() => setActiveSymptom(symp.id)}
                  >
                    <span className="symptom-indicator"></span>
                    {symp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation UI */}
            <div className="gh-main-view">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeData.id}
                  className="recommendation-card"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="rec-image-wrapper">
                    <img src={activeData.image} alt={activeData.food} className="rec-image" />
                    <div className="rec-match-badge">
                      <span>Match Confidence: </span>
                      <strong>{activeData.confidence}</strong>
                    </div>
                  </div>

                  <div className="rec-content">
                    <span className="rec-protocol-label">Recommended Protocol</span>
                    <h2>{activeData.food}</h2>
                    
                    <div className="rec-why-panel">
                      <h4>Why this food?</h4>
                      <p>{activeData.why}</p>
                    </div>

                    <div className="rec-macros">
                      <div className="macro-box">
                        <span className="macro-label">PROTEIN</span>
                        <span className="macro-value">{activeData.macros.protein}</span>
                      </div>
                      <div className="macro-box">
                        <span className="macro-label">CARBS</span>
                        <span className="macro-value">{activeData.macros.carbs}</span>
                      </div>
                      <div className="macro-box">
                        <span className="macro-label">FATS</span>
                        <span className="macro-value">{activeData.macros.fats}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="gh-action-btn"
                      onClick={() => navigate('/diet-plan', { state: { symptomId: activeSymptom } })}
                    >
                      Integrate to Diet Plan
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
