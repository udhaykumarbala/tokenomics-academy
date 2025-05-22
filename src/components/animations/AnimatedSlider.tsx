"use client";

import { motion, useMotionValue } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { sliderHover, sliderDrag, sliderValueChange } from './animations';

interface AnimatedSliderProps {
  id: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: string;
  max: string;
  step: string;
  className?: string;
  'aria-label'?: string;
}

export default function AnimatedSlider({
  id,
  name,
  value,
  onChange,
  min,
  max,
  step,
  className = "",
  'aria-label': ariaLabel,
}: AnimatedSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [prevValue, setPrevValue] = useState(value);
  const [valueChanged, setValueChanged] = useState(false);
  
  // Handle value change animation
  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value);
      setValueChanged(true);
      
      const timer = setTimeout(() => {
        setValueChanged(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <motion.input
      type="range"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      className={className}
      aria-label={ariaLabel}
      whileHover={sliderHover}
      whileDrag={sliderDrag}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      data-dragging={isDragging ? 'true' : 'false'}
    />
  );
}