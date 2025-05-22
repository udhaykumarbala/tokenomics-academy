import Link from "next/link";
import { Navigation, Footer, LessonSideNav } from "@/components/navigation";
import { FlipCard, StickyKeyTakeaway } from "@/components/interactive";

export default function IntroductionLessonPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation 
        title="Tokenomics Lessons" 
        subtitle="Introduction to Tokenomics" 
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
        
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1 order-2 md:order-1">
            <LessonSideNav />
          </div>
          
          <div className="md:col-span-3 order-1 md:order-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-3xl font-bold mb-6">Introduction to Tokenomics</h2>
              
              <div className="prose max-w-none">
                <h3>What is Tokenomics?</h3>
                <p>
                  Tokenomics refers to the economics of a cryptocurrency or token. It encompasses all aspects that make a particular token valuable and interesting to investors, including the token's creation, distribution, supply mechanisms, utility, and more. Good tokenomics is designed to incentivize certain behaviors that benefit the underlying protocol or application.
                </p>
                
                <div className="section-divider"></div>
                
                <h3>Why Tokenomics Matters</h3>
                <p>
                  Tokenomics is crucial because it directly impacts a token's:
                </p>
                <ul>
                  <li><strong>Value Stability</strong>: Well-designed tokenomics can help maintain price stability</li>
                  <li><strong>Network Growth</strong>: It incentivizes participation and usage</li>
                  <li><strong>Long-term Sustainability</strong>: It ensures the project can survive and thrive</li>
                </ul>
                
                <div className="key-takeaway">
                  Well-designed tokenomics creates a virtuous cycle where token utility drives demand, which supports price, which attracts participants, which increases utility.
                </div>
                
                <StickyKeyTakeaway>
                  Well-designed tokenomics creates a virtuous cycle where token utility drives demand, which supports price, which attracts participants, which increases utility.
                </StickyKeyTakeaway>
                
                <div className="section-divider"></div>
                
                <h3>Key Components of Tokenomics</h3>
                
                <h4>1. Token Supply</h4>
                <p>
                  The token supply refers to how many tokens exist or will exist in the future:
                </p>
                <ul>
                  <li><strong>Initial Supply</strong>: The amount of tokens available at launch</li>
                  <li><strong>Maximum Supply</strong>: The maximum amount of tokens that will ever exist (if capped)</li>
                  <li><strong>Circulating Supply</strong>: The number of tokens currently in public circulation</li>
                </ul>
                
                <FlipCard 
                  front={
                    <div>
                      <h4 className="text-lg font-medium mb-2">Token Supply Models</h4>
                      <p>What are the different models for managing token supply?</p>
                    </div>
                  }
                  back={
                    <div>
                      <h4 className="text-lg font-medium mb-2">Supply Models:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-white">
                        <li>Fixed Supply (like Bitcoin)</li>
                        <li>Inflationary (like Ethereum pre-EIP1559)</li>
                        <li>Deflationary (token burns)</li>
                        <li>Elastic Supply (algorithmically adjusted)</li>
                      </ul>
                    </div>
                  }
                />
                
                <div className="callout">
                  Bitcoin has a capped maximum supply of 21 million coins, while Ethereum has no maximum supply limit—instead, it has a controlled issuance rate.
                </div>
                
                <h4>2. Token Distribution</h4>
                <p>
                  How tokens are allocated and distributed is fundamental to a project's success:
                </p>
                <ul>
                  <li><strong>Team Allocation</strong>: Tokens reserved for the founding team and future employees</li>
                  <li><strong>Investor Allocation</strong>: Tokens reserved for early investors and venture capital</li>
                  <li><strong>Community Allocation</strong>: Tokens reserved for community incentives, airdrops, etc.</li>
                  <li><strong>Treasury/Foundation</strong>: Tokens reserved for ongoing development and ecosystem growth</li>
                </ul>
                
                <FlipCard 
                  front={
                    <div>
                      <h4 className="text-lg font-medium mb-2">Distribution Best Practices</h4>
                      <p>What distribution model helps ensure long-term success?</p>
                    </div>
                  }
                  back={
                    <div>
                      <h4 className="text-lg font-medium mb-2">Best Practices:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-white">
                        <li>Fair initial distribution to avoid concentration</li>
                        <li>Vesting schedules prevent early dumps</li>
                        <li>Community allocation increases decentralization</li>
                        <li>Transparently disclosed allocations build trust</li>
                      </ul>
                    </div>
                  }
                />
                
                <h4>3. Token Utility</h4>
                <p>
                  What can the token be used for within the ecosystem?
                </p>
                <ul>
                  <li><strong>Governance</strong>: Voting rights on protocol decisions</li>
                  <li><strong>Staking</strong>: Locking tokens to secure the network and earn rewards</li>
                  <li><strong>Transaction Fees</strong>: Payment for using the platform's services</li>
                  <li><strong>Collateral</strong>: Backing loans or other financial products</li>
                </ul>
                
                <div className="section-divider"></div>
                
                <h3>Next Steps</h3>
                <p>
                  In the following lessons, we'll explore each of these components in depth, and you'll learn how to analyze and design effective tokenomic systems. You'll also use our interactive simulator to experiment with different parameters and see their impact on token metrics over time.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-8">
                  <p className="font-medium text-blue-700">
                    Ready to move on? Continue to the next lesson on Supply Dynamics or try the simulator to get hands-on experience with tokenomic parameters.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <Link 
                      href="/lessons/supply-dynamics" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                      Next Lesson
                    </Link>
                    <Link 
                      href="/simulator" 
                      className="bg-white border border-primary text-primary hover:bg-primary-light-opacity font-medium py-2 px-4 rounded"
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

      <Footer />
    </div>
  );
}