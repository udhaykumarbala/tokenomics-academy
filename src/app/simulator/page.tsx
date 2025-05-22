import Link from "next/link";
import SimulatorComponent from "@/components/simulator/SimulatorComponent";

export default function SimulatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 sm:px-8 bg-primary text-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Tokenomics Simulator</h1>
          <p className="mt-2 text-lg">Experiment with token parameters and visualize results</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-8 py-12">
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
          <h2 className="text-2xl font-bold mb-6">Tokenomics Simulator</h2>
          <p className="mb-8 text-gray-700">
            Adjust the parameters below to see how changes affect token metrics over time. 
            Experiment with supply, inflation, burn rates, staking rewards, and more.
          </p>
          
          <SimulatorComponent />
        </div>
      </main>

      <footer className="bg-gray-200 py-8 px-4 sm:px-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>Tokenomics Academy - A fully client-rendered learning platform built with Next.js 14</p>
          <p className="mt-2">
            <Link href="/about" className="text-primary hover:text-primary-dark hover:underline">About</Link>
            {" • "}
            <a href="https://github.com/udhaykumarbala/tokenomics-academy" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark hover:underline">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}