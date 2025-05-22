import Link from "next/link";

export default function SupplyDynamicsLessonPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 sm:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Tokenomics Lessons</h1>
          <p className="mt-2 text-lg">Supply Dynamics</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-8 py-12">
        <div className="mb-8">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1 order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-8">
              <h3 className="font-semibold text-lg mb-4">Lesson Modules</h3>
              <ul className="space-y-2">
                <li className="hover:bg-gray-50 p-2 rounded transition-colors">
                  <Link href="/lessons/introduction" className="block text-gray-700">Introduction to Tokenomics</Link>
                </li>
                <li className="bg-blue-50 text-blue-700 font-medium p-2 rounded">
                  <Link href="/lessons/supply-dynamics" className="block">Supply Dynamics</Link>
                </li>
                <li className="hover:bg-gray-50 p-2 rounded transition-colors">
                  <Link href="/lessons/staking-mechanisms" className="block text-gray-700">Staking Mechanisms</Link>
                </li>
                <li className="hover:bg-gray-50 p-2 rounded transition-colors">
                  <Link href="/lessons/governance" className="block text-gray-700">Token Governance</Link>
                </li>
                <li className="hover:bg-gray-50 p-2 rounded transition-colors">
                  <Link href="/lessons/tokenomic-patterns" className="block text-gray-700">Tokenomic Patterns</Link>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  href="/simulator" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full block text-center"
                >
                  Open Simulator
                </Link>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 order-1 md:order-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-3xl font-bold mb-6">Supply Dynamics</h2>
              
              <div className="prose max-w-none">
                <p>
                  Supply dynamics refer to how a token's total supply changes over time, which directly influences its value proposition and economic behavior.
                </p>
                
                <h3>Understanding Token Supply Models</h3>
                <p>
                  Token supply models determine how many tokens exist and how that number changes over time:
                </p>
                <ul>
                  <li><strong>Fixed Supply</strong>: A capped maximum number of tokens (e.g., Bitcoin's 21 million limit)</li>
                  <li><strong>Inflationary Supply</strong>: New tokens are continuously created at a predefined rate</li>
                  <li><strong>Deflationary Supply</strong>: Tokens are systematically removed from circulation (burned)</li>
                  <li><strong>Hybrid Models</strong>: Combining elements of the above models with conditional mechanisms</li>
                </ul>
                
                <h3>Emission Schedules</h3>
                
                <h4>Linear Emission</h4>
                <p>
                  Linear emission releases tokens at a constant rate over time.
                </p>
                <pre className="bg-gray-100 p-4 rounded">
                  Year 1: 10,000,000 tokens<br />
                  Year 2: 10,000,000 tokens<br />
                  Year 3: 10,000,000 tokens
                </pre>
                <p>
                  <strong>Pros</strong>: Predictable, easy to understand<br />
                  <strong>Cons</strong>: Doesn't adapt to network growth or market conditions
                </p>
                
                <h4>Exponential Decay</h4>
                <p>
                  Exponential decay reduces the emission rate over time, often by a fixed percentage.
                </p>
                <pre className="bg-gray-100 p-4 rounded">
                  Year 1: 10,000,000 tokens<br />
                  Year 2: 5,000,000 tokens<br />
                  Year 3: 2,500,000 tokens
                </pre>
                <p>
                  <strong>Pros</strong>: Frontloads incentives while becoming more scarce over time<br />
                  <strong>Cons</strong>: May not provide sufficient long-term incentives
                </p>
                
                <h4>Milestone-Based</h4>
                <p>
                  Emissions tied to specific project milestones or achievements.
                </p>
                <p>
                  <strong>Pros</strong>: Aligns token distribution with project success<br />
                  <strong>Cons</strong>: Potentially unpredictable, subject to project team discretion
                </p>
                
                <h3>Token Burns</h3>
                <p>
                  Token burning permanently removes tokens from circulation, creating deflationary pressure.
                </p>
                
                <h4>Burn Mechanisms</h4>
                <ul>
                  <li><strong>Fee Burns</strong>: A percentage of transaction fees is burned</li>
                  <li><strong>Buy-Back and Burn</strong>: Project revenue used to purchase and burn tokens</li>
                  <li><strong>Burning on Usage</strong>: Tokens consumed when using specific network functions</li>
                </ul>
                
                <div className="bg-blue-50 p-4 my-4 border-l-4 border-blue-500 italic">
                  <strong>Case Study</strong>: Binance's BNB conducts quarterly burns based on trading volume, aiming to eventually burn 50% of the total supply.
                </div>
                
                <h3>Vesting and Lockups</h3>
                
                <h4>Vesting Schedules</h4>
                <p>
                  Vesting gradually releases tokens to stakeholders over time:
                </p>
                <ul>
                  <li><strong>Linear Vesting</strong>: Equal portions released at regular intervals</li>
                  <li><strong>Cliff Vesting</strong>: No tokens released until a specific date, then either all at once or on a schedule</li>
                  <li><strong>Milestone-Based Vesting</strong>: Tokens released when specific project goals are achieved</li>
                </ul>
                
                <h4>Importance of Vesting</h4>
                <p>
                  Vesting mechanisms:
                </p>
                <ul>
                  <li>Prevent immediate selling pressure</li>
                  <li>Align long-term incentives of team and investors</li>
                  <li>Signal commitment to the project's future</li>
                  <li>Provide price stability during early project stages</li>
                </ul>
                
                <h3>Impact on Token Value</h3>
                <p>
                  Supply dynamics directly impact a token's value proposition:
                </p>
                <table className="border-collapse border border-gray-300 min-w-full mt-4 mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Supply Model</th>
                      <th className="border border-gray-300 px-4 py-2">Typical Value Proposition</th>
                      <th className="border border-gray-300 px-4 py-2">Example Projects</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Fixed</td>
                      <td className="border border-gray-300 px-4 py-2">Store of Value</td>
                      <td className="border border-gray-300 px-4 py-2">Bitcoin, Yearn Finance</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Inflationary</td>
                      <td className="border border-gray-300 px-4 py-2">Network Participation</td>
                      <td className="border border-gray-300 px-4 py-2">Ethereum (pre-merge), Cosmos</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Deflationary</td>
                      <td className="border border-gray-300 px-4 py-2">Medium of Exchange</td>
                      <td className="border border-gray-300 px-4 py-2">BNB, SafeMoon</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Elastic</td>
                      <td className="border border-gray-300 px-4 py-2">Price Stability</td>
                      <td className="border border-gray-300 px-4 py-2">Ampleforth, BASE</td>
                    </tr>
                  </tbody>
                </table>
                
                <h4>Supply Elasticity</h4>
                <p>
                  Some tokens implement elastic supply mechanisms that adjust based on market demand to target price stability:
                </p>
                <ul>
                  <li><strong>Rebase Tokens</strong>: Automatically adjust supply across all wallets to maintain price targets</li>
                  <li><strong>Minting/Burning Mechanisms</strong>: Create or destroy tokens based on algorithmic rules</li>
                </ul>
                
                <h3>Simulating Supply Dynamics</h3>
                <p>
                  When designing token supply dynamics, consider these key questions:
                </p>
                <ul>
                  <li>What is the token's primary purpose? (Store of value, medium of exchange, governance, etc.)</li>
                  <li>What initial distribution best supports your ecosystem growth?</li>
                  <li>How will supply changes incentivize desired user behaviors?</li>
                  <li>What emission schedule best balances short-term incentives with long-term sustainability?</li>
                </ul>
                
                <p>
                  <Link href="/simulator" className="text-blue-600 hover:underline">Try our simulator</Link> to experiment with different supply dynamics parameters and see how they affect your token's value over time.
                </p>
                
                <h3>Next Steps</h3>
                <p>
                  In the next lesson, we'll explore staking mechanisms and how they interact with token supply dynamics to create economic security and incentives.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-8">
                  <p className="font-medium text-blue-700">
                    Ready to move on? Continue to the next lesson on Staking Mechanisms or try the simulator to experiment with supply dynamics.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <Link 
                      href="/lessons/staking-mechanisms" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                      Next Lesson
                    </Link>
                    <Link 
                      href="/simulator" 
                      className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded"
                    >
                      Try Simulator
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-8 px-4 sm:px-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>Tokenomics Academy - A fully client-rendered learning platform built with Next.js 14</p>
          <p className="mt-2">
            <Link href="/about" className="text-blue-600 hover:underline">About</Link>
            {" • "}
            <a href="https://github.com/udhaykumarbala/tokenomics-academy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}