"use client";

import { useState } from 'react';
import { Confetti } from '@/components/animations';

export default function TestConfetti() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {showConfetti && <Confetti />}
      <h1 className="text-3xl font-bold mb-8">Test Confetti Animation</h1>
      <button 
        onClick={() => setShowConfetti(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      >
        Trigger Confetti
      </button>
    </div>
  );
}