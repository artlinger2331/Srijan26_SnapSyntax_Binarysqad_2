import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './DietPlan.css';

const dietData = {
  acidity: {
    video: "/media/6645705-hd_1920_1080_30fps.mp4",
    title: "Alkaline Balance Protocol",
    description: "Designed to lower stomach pH securely and promote natural flora.",
    schedule: [
      { time: "08:00 AM", label: "Morning Hydration", title: "Lemon Water & Oatmeal", desc: "Reduces morning acid buildup and coats the stomach." },
      { time: "01:30 PM", label: "Core Meal", title: "Traditional Thali", desc: "Cooling yogurt and alkaline veggies neutralize mid-day spikes.", image: "/media/pexels-ryshy-s-2149956588-35539324.jpg" },
      { time: "07:30 PM", label: "Wind Down", title: "Light Rice & Lentils", desc: "Easy to digest, preventing nighttime reflux." }
    ]
  },
  fatigue: {
    video: "/media/5820008-hd_1920_1080_25fps.mp4",
    title: "Sustained Energy Protocol",
    description: "Maximizing caloric conversion to functional, long-lasting energy.",
    schedule: [
      { time: "07:30 AM", label: "Ignition", title: "Protein Heavy Scramble", desc: "Immediate amino acid delivery to kickstart metabolism." },
      { time: "12:30 PM", label: "Peak Output", title: "Spiced Chicken Biryani", desc: "Heavy complex carbs for high endurance through the afternoon.", image: "/media/pexels-jagan-sai-632000456-17497626.jpg" },
      { time: "07:00 PM", label: "Recovery", title: "Grilled Lean Fish", desc: "Light protein to repair cells without demanding heavy digestion." }
    ]
  },
  inflammation: {
    video: "/media/5657101-uhd_4096_2160_30fps.mp4",
    title: "Anti-Inflammatory Coolant",
    description: "Focused on antioxidants, healthy fats, and internal soothing.",
    schedule: [
      { time: "08:30 AM", label: "Detox", title: "Turmeric Ginger Tea", desc: "Clears blood inflammation immediately naturally." },
      { time: "02:00 PM", label: "Nourish", title: "Dark Greens Salad", desc: "High water content and rich in essential cellular repairing vitamins." },
      { time: "08:00 PM", label: "Soothe", title: "Cooling Dairy Bowl", desc: "Soothes gastro-linings with healthy fats before rest.", image: "/media/pexels-ali-dashti-506667798-22809626.jpg" }
    ]
  }
};

export default function DietPlan() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract symptom from router state, default to acidity if navigated directly
  const symptomId = location.state?.symptomId || 'acidity';
  const plan = dietData[symptomId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dpv-page">
      <Navbar />

      <header className="dpv-hero">
        <video 
          key={plan.video}
          className="dpv-hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={plan.video} type="video/mp4" />
        </video>
        <div className="dpv-hero-overlay"></div>
        
        <div className="container dpv-hero-content">
          <button className="dpv-back-btn" onClick={() => navigate('/gut-health')}>
            ← Back to Diagnostics
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="dpv-badge">Active Diet Regimen</span>
            <h1>{plan.title}</h1>
            <p className="dpv-desc">{plan.description}</p>
          </motion.div>
        </div>
      </header>

      <section className="dpv-timeline-section section">
        <div className="container">
          <div className="dpv-timeline">
            
            {plan.schedule.map((item, index) => (
              <motion.div 
                key={index} 
                className={`dpv-timeline-item ${item.image ? 'has-media' : ''}`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="dpv-time-marker">
                  <span className="time-dot"></span>
                  <span className="time-text">{item.time}</span>
                </div>
                
                <div className="dpv-timeline-content">
                  <span className="dpv-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  
                  {item.image && (
                    <div className="dpv-media-frame">
                      <img src={item.image} alt={item.title} />
                      <div className="dpv-media-overlay">
                        <span>Optimal AI Target Match</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

          </div>

          <div className="dpv-footer-actions">
             <button className="dpv-primary-btn">Download PDF Plan</button>
             <button className="dpv-secondary-btn">Notify Local Restaurants</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
