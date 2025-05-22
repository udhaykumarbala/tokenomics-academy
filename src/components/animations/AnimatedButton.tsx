"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { buttonHover } from './animations';

interface AnimatedButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function AnimatedButton({
  onClick,
  className = "",
  children,
  disabled = false,
  type = 'button'
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? {} : buttonHover}
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={onClick}
      className={className}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}