"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface StickyKeyTakeawayProps {
  children: React.ReactNode;
  className?: string;
}

export default function StickyKeyTakeaway({ children, className = "" }: StickyKeyTakeawayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky takeaway after scrolling 300px down
      if (window.scrollY > 300 && !dismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 max-w-xs z-50 ${className}`}
        >
          <div className="bg-success-color text-white p-4 rounded-lg shadow-lg border-l-4 border-green-700">
            <div className="flex justify-between items-start">
              <div className="flex items-center mb-2">
                <span className="text-lg mr-2">🔑</span>
                <span className="font-semibold">Key Takeaway</span>
              </div>
              <button 
                onClick={handleDismiss}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Dismiss takeaway"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="text-sm">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}