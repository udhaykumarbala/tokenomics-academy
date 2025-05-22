"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { pageTransition, pageTransitionTiming } from './animations';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Use minimal transition if reduced motion is preferred
  const variants = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  } : pageTransition;
  
  // Use faster timing for reduced motion
  const timing = prefersReducedMotion ? {
    duration: 0.1,
  } : pageTransitionTiming;

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={timing}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}