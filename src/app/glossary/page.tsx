'use client';

import Link from "next/link";
import { Navigation, Footer } from "@/components/navigation";
import { getAllGlossaryTerms } from "@/lib/glossary";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/components/animations/animations";

export default function GlossaryPage() {
  const terms = getAllGlossaryTerms();
  
  // Group terms by first letter
  const groupedTerms = terms.reduce((groups, term) => {
    const firstLetter = term.term.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(term);
    return groups;
  }, {} as Record<string, typeof terms>);
  
  // Get unique first letters for the index
  const letters = Object.keys(groupedTerms).sort();

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation 
        title="Tokenomics Academy" 
        subtitle="Glossary of Terms" 
      />

      <main className="flex-grow container mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <Link 
            href="/"
            className="text-primary hover:text-primary-dark inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold mb-6">Glossary of Tokenomics Terms</h1>
          
          <p className="text-gray-600 mb-8">
            This glossary provides definitions for key terms used throughout the Tokenomics Academy. 
            Hover over underlined terms in lesson content to see these definitions inline.
          </p>
          
          {/* Alphabet index for quick navigation */}
          <div className="flex flex-wrap gap-2 mb-8 sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
            {letters.map(letter => (
              <a 
                key={letter}
                href={`#section-${letter}`}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 
                  hover:bg-primary hover:text-white transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
          
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {letters.map(letter => (
              <motion.section 
                key={letter} 
                id={`section-${letter}`}
                variants={fadeInUp}
              >
                <h2 className="text-2xl font-bold mb-4 text-primary border-b border-gray-200 pb-2">
                  {letter}
                </h2>
                <ul className="space-y-4">
                  {groupedTerms[letter].map(term => (
                    <li key={term.term}>
                      <h3 className="font-medium text-lg">{term.term}</h3>
                      <p className="text-gray-700">{term.definition}</p>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}