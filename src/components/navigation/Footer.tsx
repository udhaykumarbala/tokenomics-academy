"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark py-6 sm:py-8 px-4 sm:px-8" style={{backgroundColor: "#0A0E1A"}}>
      <div className="container mx-auto text-center text-gray-300">
        <p className="text-sm sm:text-base">Tokenomics Academy - A fully client-rendered learning platform built with Next.js 14</p>
        <p className="mt-2 flex justify-center flex-wrap gap-2 sm:gap-4">
          <Link href="/about" className="text-primary hover:text-primary-dark hover:underline">
            About
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="/lessons/introduction" className="text-primary hover:text-primary-dark hover:underline">
            Lessons
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="/simulator" className="text-primary hover:text-primary-dark hover:underline">
            Simulator
          </Link>
          <span className="hidden sm:inline">•</span>
          <a 
            href="https://github.com/udhaykumarbala/tokenomics-academy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:text-primary-dark hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}