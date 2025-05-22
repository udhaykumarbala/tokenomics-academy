"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { pageTransition, pageTransitionTiming } from './animations';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={pageTransition}
      transition={pageTransitionTiming}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}