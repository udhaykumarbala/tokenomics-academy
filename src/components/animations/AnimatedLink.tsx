"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { buttonHover } from './animations';

interface AnimatedLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function AnimatedLink({ 
  href, 
  className = "", 
  children 
}: AnimatedLinkProps) {
  return (
    <motion.div
      whileHover={buttonHover}
      whileTap={{ scale: 0.97 }}
    >
      <Link 
        href={href} 
        className={className}
      >
        {children}
      </Link>
    </motion.div>
  );
}