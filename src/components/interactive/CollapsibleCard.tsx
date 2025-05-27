"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid"; // Assuming you have heroicons

export interface CollapsibleCardProps {
  title: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export default function CollapsibleCard({ title, content, className = "" }: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`collapsible-card border border-gray-200 rounded-lg shadow-sm my-6 ${className}`}>
      <button
        type="button"
        onClick={toggleOpen}
        className="collapsible-card-header flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="font-medium">{title}</div>
        <ChevronDownIcon
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: "1rem", paddingBottom: "1rem" },
              collapsed: { opacity: 0, height: 0, marginTop: "0rem", paddingBottom: "0rem" },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="collapsible-card-content overflow-hidden"
          >
            <div className="px-4">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
