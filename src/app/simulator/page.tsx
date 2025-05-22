import Link from "next/link";
import { Navigation, Footer } from "@/components/navigation";
import SimulatorComponent from "@/components/simulator/SimulatorComponent";

export default function SimulatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation 
        title="Tokenomics Simulator" 
        subtitle="Experiment with token parameters and visualize results" 
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
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Tokenomics Simulator</h2>
          <p className="mb-6 sm:mb-8 text-gray-700">
            Adjust the parameters below to see how changes affect token metrics over time. 
            Experiment with supply, inflation, burn rates, staking rewards, and more.
          </p>
          
          <SimulatorComponent />
        </div>
      </main>

      <Footer />
    </div>
  );
}