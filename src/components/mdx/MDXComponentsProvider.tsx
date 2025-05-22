'use client';

import { MDXProvider } from '@mdx-js/react';
import { GlossaryTerm } from '@/components/glossary';

interface MDXComponentsProviderProps {
  children: React.ReactNode;
}

const components = {
  // Allow using <Term>...</Term> in MDX content
  Term: ({ children, name }: { children?: React.ReactNode; name: string }) => (
    <GlossaryTerm term={name || (children as string)}>
      {children}
    </GlossaryTerm>
  ),
};

export function MDXComponentsProvider({ children }: MDXComponentsProviderProps) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}