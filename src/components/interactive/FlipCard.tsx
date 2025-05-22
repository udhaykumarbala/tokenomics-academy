"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export default function FlipCard({ front, back, className = "" }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`perspective-1000 my-6 ${className}`} 
      style={{ perspective: "1000px" }}
    >
      <div 
        className="relative w-full h-full cursor-pointer"
        style={{ 
          transformStyle: "preserve-3d",
          transition: "transform 0.6s"
        }}
        onClick={toggleFlip}
      >
        <motion.div
          className="flip-card-inner"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div 
            className={`absolute w-full h-full backface-hidden 
              bg-white rounded-lg shadow-md border border-gray-200 p-4
              ${isFlipped ? "hidden" : "block"}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-right mb-2">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Click to flip</span>
            </div>
            {front}
          </div>
          
          <div 
            className={`absolute w-full h-full backface-hidden 
              bg-primary text-white rounded-lg shadow-md p-4
              ${isFlipped ? "block" : "hidden"}`}
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div className="text-right mb-2">
              <span className="text-xs bg-white bg-opacity-20 text-white px-2 py-1 rounded">Click to flip back</span>
            </div>
            {back}
          </div>
        </motion.div>
      </div>
    </div>
  );
}