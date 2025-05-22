'use client';

import Tooltip from './Tooltip';
import { getGlossaryTerm, GlossaryTerm } from '@/lib/glossary';

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
}

export default function GlossaryTermComponent({ term, children }: GlossaryTermProps) {
  const glossaryTerm = getGlossaryTerm(term);
  
  // If the term doesn't exist in our glossary, just return the children
  if (!glossaryTerm) {
    return <>{children || term}</>;
  }
  
  // Display the tooltip with the term and definition
  return (
    <Tooltip term={glossaryTerm}>
      {children || term}
    </Tooltip>
  );
}