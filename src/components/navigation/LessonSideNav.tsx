'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react'; // Import useEffect and useState

// Define lessons array
const lessons = [
  { id: 'introduction', path: '/lessons/introduction', title: 'Introduction to Tokenomics' },
  { id: 'supply-dynamics', path: '/lessons/supply-dynamics', title: 'Supply Dynamics' },
  { id: 'staking-mechanisms', path: '/lessons/staking-mechanisms', title: 'Staking Mechanisms' },
  { id: 'governance', path: '/lessons/governance', title: 'Token Governance' },
  { id: 'tokenomic-patterns', path: '/lessons/tokenomic-patterns', title: 'Tokenomic Patterns' },
];

// Checkmark SVG component
const CheckmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" 
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export default function LessonSideNav() {
  const pathname = usePathname();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve completed lessons from localStorage
    const storedCompletedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    setCompletedLessons(storedCompletedLessons);
  }, [pathname]); // Re-run effect if pathname changes, to ensure UI updates after navigation

  const handleClearProgress = () => {
    if (window.confirm('Are you sure you want to clear all your lesson progress?')) {
      localStorage.removeItem('completedLessons');
      setCompletedLessons([]); // Update state to re-render immediately
      window.location.reload(); // Reload to ensure UI consistency
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-20">
      <h3 className="font-semibold text-lg mb-4">Lesson Modules</h3>
      <ul className="space-y-2">
        {lessons.map((lesson) => (
          <li 
            key={lesson.id}
            className={isActive(lesson.path) ? "bg-blue-50 text-blue-700 font-medium p-2 rounded flex justify-between items-center" : "hover:bg-gray-50 p-2 rounded transition-colors flex justify-between items-center"}
          >
            <Link href={lesson.path} className={isActive(lesson.path) ? "block" : "block text-gray-700"}>
              {lesson.title}
            </Link>
            {completedLessons.includes(lesson.id) && <CheckmarkIcon />}
          </li>
        ))}
      </ul>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-sm text-gray-500 mb-2">Resources</h4>
        <ul className="space-y-2">
          <li className={isActive("/glossary") ? "bg-blue-50 text-blue-700 font-medium p-2 rounded" : "hover:bg-gray-50 p-2 rounded transition-colors"}>
            <Link href="/glossary" className={isActive("/glossary") ? "block" : "block text-gray-700"}>
              Glossary
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Link 
          href="/simulator" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full block text-center"
        >
          Open Simulator
        </Link>
      </div>

      {/* Clear Progress Button */}
      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <button
          onClick={handleClearProgress}
          className="text-xs text-gray-500 hover:text-gray-700 hover:underline focus:outline-none"
        >
          Clear Progress
        </button>
      </div>
    </div>
  );
}