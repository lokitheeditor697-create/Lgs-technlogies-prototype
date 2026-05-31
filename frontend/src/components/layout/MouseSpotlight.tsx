"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MouseSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if hovering over clickable elements or cards
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.group') // Custom class used for our cards
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
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Soft Follower Orb */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full pointer-events-none z-[-1] mix-blend-multiply filter blur-[80px]"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 0.5
        }}
      />
      
      {/* Precise Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-blue-500/50 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(59, 130, 246, 0.1)" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
    </>
  );
}
