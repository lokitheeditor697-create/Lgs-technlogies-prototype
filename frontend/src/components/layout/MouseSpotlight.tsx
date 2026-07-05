"use client";
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseSpotlight() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth springs for the follower
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  // Faster springs for the precise ring
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.group')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Soft Follower Orb */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full pointer-events-none z-[-1] mix-blend-multiply filter blur-[80px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      
      {/* Precise Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-blue-500/50 rounded-full pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0)",
        }}
        transition={{
          duration: 0.2
        }}
      />
    </>
  );
}
