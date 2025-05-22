"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { sliderValueChange } from './animations';

interface AnimatedValueProps {
  value: string | number;
  className?: string;
}

export default function AnimatedValue({
  value,
  className = "",
}: AnimatedValueProps) {
  const [key, setKey] = useState(Date.now());
  
  // Change key to trigger animation when value changes
  useEffect(() => {
    setKey(Date.now());
  }, [value]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={key}
        className={className}
        initial="initial"
        animate="animate"
        variants={sliderValueChange}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}