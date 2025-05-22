'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LessonSideNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-20">
      <h3 className="font-semibold text-lg mb-4">Lesson Modules</h3>
      <ul className="space-y-2">
        <li className={isActive("/lessons/introduction") ? "bg-blue-50 text-blue-700 font-medium p-2 rounded" : "hover:bg-gray-50 p-2 rounded transition-colors"}>
          <Link href="/lessons/introduction" className={isActive("/lessons/introduction") ? "block" : "block text-gray-700"}>
            Introduction to Tokenomics
          </Link>
        </li>
        <li className={isActive("/lessons/supply-dynamics") ? "bg-blue-50 text-blue-700 font-medium p-2 rounded" : "hover:bg-gray-50 p-2 rounded transition-colors"}>
          <Link href="/lessons/supply-dynamics" className={isActive("/lessons/supply-dynamics") ? "block" : "block text-gray-700"}>
            Supply Dynamics
          </Link>
        </li>
        <li className={isActive("/lessons/staking-mechanisms") ? "bg-blue-50 text-blue-700 font-medium p-2 rounded" : "hover:bg-gray-50 p-2 rounded transition-colors"}>
          <Link href="/lessons/staking-mechanisms" className={isActive("/lessons/staking-mechanisms") ? "block" : "block text-gray-700"}>
            Staking Mechanisms
          </Link>
        </li>
        <li className={isActive("/lessons/governance") ? "bg-blue-50 text-blue-700 font-medium p-2 rounded" : "hover:bg-gray-50 p-2 rounded transition-colors"}>
          <Link href="/lessons/governance" className={isActive("/lessons/governance") ? "block" : "block text-gray-700"}>
            Token Governance
          </Link>
        </li>
        <li className={isActive("/lessons/tokenomic-patterns") ? "bg-blue-50 text-blue-700 font-medium p-2 rounded" : "hover:bg-gray-50 p-2 rounded transition-colors"}>
          <Link href="/lessons/tokenomic-patterns" className={isActive("/lessons/tokenomic-patterns") ? "block" : "block text-gray-700"}>
            Tokenomic Patterns
          </Link>
        </li>
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
    </div>
  );
}