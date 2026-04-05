import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './DynamicPricing.css';

gsap.registerPlugin(ScrollTrigger);

export default function DynamicPricing() {
  const [timeRemaining, setTimeRemaining] = useState(120); // Slider input: minutes until closing
  const [tickerSeconds, setTickerSeconds] = useState(120 * 60); // Live ticking seconds
  const basePrice = 24.00;
  
  useEffect(() => {
    // Sync slider changes into the live ticker
    setTickerSeconds(timeRemaining * 60);
  }, [timeRemaining]);

  useEffect(() => {
    // The actual live countdown clock mechanism
    const interval = setInterval(() => {
      setTickerSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentMinutesLeft = tickerSeconds / 60;

  // Calculate dynamic price based on the LIVE ticking time
  const dynamicPrice = currentMinutesLeft > 60 
    ? basePrice 
    : basePrice * (0.5 + (currentMinutesLeft / 60) * 0.5);

  const discountPercent = Math.round((1 - (dynamicPrice / basePrice)) * 100);

  // Time format calculations
  const hrs = Math.floor(tickerSeconds / 3600);
  const mins = Math.floor((tickerSeconds % 3600) / 60);
  const secs = tickerSeconds % 60;
  const formattedTime = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  // Generate mock chart data
  const graphData = Array.from({ length: 7 }).map((_, i) => ({
    time: `T-${120 - (i * 20)}m`,
    velocity: Math.floor(Math.random() * 30) + (120 - currentMinutesLeft) * 0.4 + 20,
    demand: Math.floor(Math.random() * 50) + (120 - currentMinutesLeft) * 0.7 + 10,
  }));

  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo('.dp-hero-content > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo('.dp-card',
        { y: 30, opacity: 0 },
        { 
          scrollTrigger: { trigger: '.dp-dashboard', start: 'top 80%' },
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="dp-page">
      <Navbar />
      
      {/* Hero Section */}
      <header className="dp-hero">
        <video 
          className="dp-hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          {/* Using the food prep/pouring video as a background */}
          <source src="/media/14985416_2160_3840_60fps.mp4" type="video/mp4" />
        </video>
        <div className="dp-hero-overlay"></div>
        
        <div className="container dp-hero-content">
          <span className="dp-badge">Active Module</span>
          <h1>Dynamic Pricing Engine</h1>
          <p>Prevent end-of-day food waste through real-time algorithmic discounting.</p>
        </div>
      </header>

      {/* Interactive Dashboard Section */}
      <section className="dp-dashboard section">
        <div className="container">
          
          <div className="dp-grid">
            
            {/* Control Panel (Slider) */}
            <div className="dp-card dp-control-panel">
              <h3>Simulation: Time Decay</h3>
              <p className="dp-context">Adjust the time until restaurant closing to observe algorithmic price adjustments.</p>
              
              <div className="dp-slider-container">
                <div className="dp-slider-labels">
                  <span>Closing Time</span>
                  <span>{timeRemaining} min left</span>
                  <span>Current Time</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="120" 
                  value={timeRemaining} 
                  onChange={(e) => setTimeRemaining(Number(e.target.value))}
                  className="dp-slider"
                />
              </div>

              <div className="dp-timer-display">
                <span className="timer-icon">⏳</span>
                <span className="timer-text">
                  Time to Expiry: <span style={{ fontFamily: 'monospace', color: '#fff', paddingLeft: '8px' }}>{formattedTime}</span>
                </span>
              </div>
            </div>

            {/* Price Output */}
            <div className="dp-card dp-price-display">
              <div className="price-header">
                <h3>Live Item Pricing</h3>
                <span className="status-dot live"></span>
              </div>
              
              <div className="item-preview">
                <img src="/media/pexels-ryshy-s-2149956588-35539324.jpg" alt="Premium Thali" />
                <div className="item-info">
                  <h4>Premium Thali Platter</h4>
                  <p>In Stock: 4 portions</p>
                </div>
              </div>

              <div className="price-calc">
                <div className="price-row">
                  <span>Base Price</span>
                  <span className="strike">${basePrice.toFixed(2)}</span>
                </div>
                <div className="price-row highlight">
                  <span>Dynamic Discount</span>
                  <span>-{discountPercent}%</span>
                </div>
                <div className="price-row total">
                  <span>Current Market Price</span>
                  <motion.span 
                    key={dynamicPrice}
                    initial={{ scale: 1.2, color: "#00ff41" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                  >
                    ${dynamicPrice.toFixed(2)}
                  </motion.span>
                </div>
              </div>
              <button className="dp-buy-btn">Simulate Transaction</button>
            </div>

            {/* Heatmap Simulation */}
            <div className="dp-card dp-heatmap">
              <h3>Inventory Velocity & Demand Graph</h3>
              <p className="dp-context">Interactive real-time visualization of surrounding food items.</p>
              
              <div className="heatmap-graph-container" style={{ width: '100%', height: 250, marginTop: '2rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={graphData}
                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff4d8d" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#ff4d8d" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ff41" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#00ff41" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="time" stroke="#666" tick={{fill: '#666', fontSize: 12}} />
                    <YAxis stroke="#666" tick={{fill: '#666', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px' }}
                      itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}
                      labelStyle={{ color: '#888', marginBottom: '8px' }}
                    />
                    <Area type="monotone" dataKey="velocity" name="Sales Velocity" stroke="#ff4d8d" strokeWidth={2} fillOpacity={1} fill="url(#colorVelocity)" />
                    <Area type="monotone" dataKey="demand" name="Active Demand" stroke="#00ff41" strokeWidth={2} fillOpacity={1} fill="url(#colorDemand)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
