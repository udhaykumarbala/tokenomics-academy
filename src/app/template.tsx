"use client";

import { usePathname } from 'next/navigation';
import { PageTransition } from '@/components/animations';
import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  
  // If user prefers reduced motion, we'll still use AnimatePresence for consistency
  // but transitions will be minimal
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}