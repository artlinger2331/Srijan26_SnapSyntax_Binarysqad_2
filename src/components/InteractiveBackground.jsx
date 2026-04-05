import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function InteractiveBackground() {
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to -1 to 1 based on viewport
      const ix = (e.clientX / window.innerWidth) * 2 - 1;
      const iy = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(ix * 100);
      mouseY.set(iy * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#0a0e1a', // Deep dark background
        overflow: 'hidden',
      }}
    >
      {/* Background Blobs */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,136,0.15) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(80px)',
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(100px)',
          x: useSpring(0, { stiffness: 30, damping: 30 }), // Slower reaction
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(90px)',
          transform: 'translateX(-50%)',
        }}
        animate={{
          y: [-50, 50, -50],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Subtle Noise Texture Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
