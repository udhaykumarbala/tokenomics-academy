"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  title?: string;
  subtitle?: string;
}

export default function Navigation({ title = "Tokenomics Academy", subtitle = "Learn and simulate crypto-economic designs" }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when changing pages
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`py-4 px-4 sm:px-8 bg-primary text-white sticky top-0 z-30 transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="block">
              <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
              <p className="mt-1 text-sm sm:text-base">{subtitle}</p>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/" 
                  className={`hover:text-opacity-80 transition-colors py-2 ${pathname === '/' ? 'border-b-2 border-white' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/lessons/introduction" 
                  className={`hover:text-opacity-80 transition-colors py-2 ${pathname.includes('/lessons') ? 'border-b-2 border-white' : ''}`}
                >
                  Lessons
                </Link>
              </li>
              <li>
                <Link 
                  href="/simulator" 
                  className={`hover:text-opacity-80 transition-colors py-2 ${pathname.includes('/simulator') ? 'border-b-2 border-white' : ''}`}
                >
                  Simulator
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`hover:text-opacity-80 transition-colors py-2 ${pathname.includes('/about') ? 'border-b-2 border-white' : ''}`}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile navigation menu */}
        <div className={`md:hidden mobile-nav-container ${isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="mobile-nav-menu py-2">
            <ul className="flex flex-col space-y-1">
              <li>
                <Link 
                  href="/" 
                  className={`mobile-nav-item block py-2 px-3 rounded ${pathname === '/' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/lessons/introduction" 
                  className={`mobile-nav-item block py-2 px-3 rounded ${pathname.includes('/lessons') ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
                >
                  Lessons
                </Link>
              </li>
              <li>
                <Link 
                  href="/simulator" 
                  className={`mobile-nav-item block py-2 px-3 rounded ${pathname.includes('/simulator') ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
                >
                  Simulator
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`mobile-nav-item block py-2 px-3 rounded ${pathname.includes('/about') ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}