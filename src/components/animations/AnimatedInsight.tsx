"use client";

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import { insightEntrance } from './animations';

interface AnimatedInsightProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export default function AnimatedInsight({
  children,
  className = "",
  index = 0,
}: AnimatedInsightProps) {
  return (
    <motion.li
      className={className}
      variants={insightEntrance}
      initial="hidden"
      animate="show"
      transition={{
        delay: index * 0.1, // Stagger effect based on index
      }}
    >
      {children}
    </motion.li>
  );
}