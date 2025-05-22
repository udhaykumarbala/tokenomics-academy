"use client";

import { usePathname } from 'next/navigation';
import { PageTransition } from '@/components/animations';
import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}