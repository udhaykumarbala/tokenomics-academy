import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 sm:px-8 bg-primary text-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Tokenomics Academy</h1>
          <p className="mt-2 text-lg">Learn and simulate crypto-economic designs</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Master Tokenomics Through Interactive Learning</h2>
            <p className="text-lg mb-8">
              Take your understanding of crypto-economic design from zero to hero with our
              bite-sized lessons and interactive simulator.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link 
                href="/lessons/introduction" 
                className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Start Learning
              </Link>
              <Link 
                href="/simulator" 
                className="bg-white border border-primary text-primary hover:bg-primary-light-opacity font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Try Simulator
              </Link>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold mb-4">What you'll learn:</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Supply dynamics: inflation, burns, and vesting</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Staking mechanics and reward systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Governance parameters and voting power</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Tokenomic sustainability and long-term design</span>
              </li>
            </ul>
            <div className="mt-auto">
              <div className="text-sm text-gray-700">
                Fully interactive simulator helps you visualize how token metrics evolve over time
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-primary font-bold text-xl mb-2">1. Learn Concepts</div>
              <p>Start with bite-sized lessons on tokenomics fundamentals and advanced concepts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-primary font-bold text-xl mb-2">2. Experiment</div>
              <p>Use the simulator to adjust parameters and see how they affect token metrics over time.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-primary font-bold text-xl mb-2">3. Master</div>
              <p>Apply your knowledge to design robust token economies with balanced incentives.</p>
            </div>
          </div>
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
