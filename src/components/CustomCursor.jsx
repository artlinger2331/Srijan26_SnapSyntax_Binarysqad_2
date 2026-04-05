import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnterInteractive = (e) => {
      setIsHovering(true);
      const label = e.target.getAttribute('data-cursor-text') || '';
      setHoverText(label);
    };

    const handleMouseLeaveInteractive = () => {
      setIsHovering(false);
      setHoverText('');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Attach to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .glass-card, .feature-card, [data-cursor-hover]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll(
        'a, button, .glass-card, .feature-card, [data-cursor-hover]'
      );
      newElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Spotlight glow */}
      <motion.div
        className="cursor-spotlight"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className={`cursor-ring ${isHovering ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2 : isClicking ? 0.8 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {hoverText && <span className="cursor-label">{hoverText}</span>}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      />
    </>
  );
}
