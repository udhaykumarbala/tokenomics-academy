import Link from "next/link";

export default function TokenomicPatternsLessonPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 sm:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Tokenomics Lessons</h1>
          <p className="mt-2 text-lg">Tokenomic Patterns</p>
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
                <li className="hover:bg-gray-50 p-2 rounded transition-colors">
                  <Link href="/lessons/supply-dynamics" className="block text-gray-700">Supply Dynamics</Link>
                </li>
                <li className="hover:bg-gray-50 p-2 rounded transition-colors">
                  <Link href="/lessons/staking-mechanisms" className="block text-gray-700">Staking Mechanisms</Link>
                </li>
                <li className="hover:bg-gray-50 p-2 rounded transition-colors">
                  <Link href="/lessons/governance" className="block text-gray-700">Token Governance</Link>
                </li>
                <li className="bg-blue-50 text-blue-700 font-medium p-2 rounded">
                  <Link href="/lessons/tokenomic-patterns" className="block">Tokenomic Patterns</Link>
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
              <h2 className="text-3xl font-bold mb-6">Tokenomic Patterns</h2>
              
              <div className="prose max-w-none">
                <p>
                  Tokenomic patterns are proven templates for token economics that address specific use cases or value propositions. Understanding these patterns can help you design more effective token systems.
                </p>
                
                <h3>Why Study Tokenomic Patterns?</h3>
                <p>
                  Like design patterns in software engineering, tokenomic patterns:
                </p>
                <ul>
                  <li><strong>Provide Tested Solutions</strong>: Based on real-world implementations that have proven successful</li>
                  <li><strong>Create Common Language</strong>: Help teams communicate complex economic systems</li>
                  <li><strong>Avoid Common Pitfalls</strong>: Learn from mistakes that others have already made</li>
                  <li><strong>Accelerate Design</strong>: Start with a pattern and customize, rather than designing from scratch</li>
                </ul>
                
                <div className="key-takeaway">
                  Tokenomic patterns are not rigid templates but rather flexible frameworks that can be adapted to specific project needs and contexts.
                </div>
                
                <div className="section-divider"></div>
                
                <h3>Core Tokenomic Patterns</h3>
                
                <h4>1. Work Token Model</h4>
                <p>
                  In this pattern, tokens represent the right to provide services to the network and earn fees.
                </p>
                <p>
                  <strong>Key characteristics</strong>:
                </p>
                <ul>
                  <li>Tokens must be staked to perform work</li>
                  <li>Work quality is incentivized through stake slashing</li>
                  <li>Rewards come from fees, not inflation</li>
                </ul>
                <p>
                  <strong>Examples</strong>: Keep Network, Livepeer, The Graph
                </p>
                
                <div className="case-study">
                  Livepeer requires video transcoding providers to stake tokens, with rewards distributed based on work performed and penalties for poor service.
                </div>
                
                <h4>2. Usage Token / Payment Token</h4>
                <p>
                  Tokens are used directly as payment for services within the ecosystem.
                </p>
                <p>
                  <strong>Key characteristics</strong>:
                </p>
                <ul>
                  <li>Value tied to demand for network services</li>
                  <li>Often include burn mechanisms to create deflationary pressure</li>
                  <li>May offer discounts compared to fiat payment options</li>
                </ul>
                <p>
                  <strong>Examples</strong>: BNB, FIL, RNDR
                </p>
                
                <div className="example">
                  <div className="example-header">BNB Token Usage</div>
                  <p>
                    Binance's BNB token was initially designed primarily as a discount token for trading fees. The more you use the Binance platform for trading, the more value you get from holding BNB tokens.
                  </p>
                </div>
                
                <div className="section-divider"></div>
                
                <h4>3. Governance Token</h4>
                <p>
                  Primary value comes from the right to participate in protocol decision-making.
                </p>
                <p>
                  <strong>Key characteristics</strong>:
                </p>
                <ul>
                  <li>Voting rights on protocol changes</li>
                  <li>Often paired with fee-sharing mechanisms</li>
                  <li>Value derives from future protocol revenue/growth expectations</li>
                </ul>
                <p>
                  <strong>Examples</strong>: UNI, COMP, AAVE
                </p>
                
                <div className="callout">
                  Governance tokens give holders a say in protocol development, parameter adjustments, treasury management, and other crucial decisions. The more tokens held, the greater the voting power.
                </div>
                
                <h4>4. Discount Token</h4>
                <p>
                  Tokens provide fee discounts when using platform services.
                </p>
                <p>
                  <strong>Key characteristics</strong>:
                </p>
                <ul>
                  <li>Creates strong buy pressure when platform usage grows</li>
                  <li>Incentivizes long-term holding for frequent users</li>
                  <li>Often combined with other utility</li>
                </ul>
                <p>
                  <strong>Examples</strong>: BNB, CRO, FTT (historical)
                </p>
                
                <h4>5. Seigniorage Shares</h4>
                <p>
                  A multi-token system designed to maintain a stablecoin peg.
                </p>
                <p>
                  <strong>Key characteristics</strong>:
                </p>
                <ul>
                  <li>Separate tokens for stability and growth</li>
                  <li>Algorithmic expansion and contraction</li>
                  <li>Incentives aligned with maintaining peg</li>
                </ul>
                <p>
                  <strong>Examples</strong>: Basis (original design), Empty Set Dollar, Frax (modified version)
                </p>
                
                <h3>Hybrid Models and Innovations</h3>
                
                <h4>Multi-Token Ecosystems</h4>
                <p>
                  Many projects use multiple tokens with specialized functions:
                </p>
                <p>
                  <strong>Examples</strong>:
                </p>
                <ul>
                  <li>MakerDAO: DAI (stablecoin) and MKR (governance)</li>
                  <li>Curve: CRV (governance) and various liquidity tokens</li>
                  <li>Axie Infinity: AXS (governance) and SLP (in-game rewards)</li>
                </ul>
                
                <h4>Vetoken Model (Vote Escrow)</h4>
                <p>
                  Tokens locked for governance gain multiplied voting power based on lock duration.
                </p>
                <p>
                  <strong>Key characteristics</strong>:
                </p>
                <ul>
                  <li>Longer locks = more governance power</li>
                  <li>Aligns incentives for long-term thinking</li>
                  <li>Often includes boosted rewards based on lock time</li>
                </ul>
                <p>
                  <strong>Examples</strong>: Curve (veCRV), Balancer (veBAL), Frax (veFXS)
                </p>
                
                <div className="text-center my-6">
                  <div className="italic text-sm text-gray-500">
                    Vote Escrow Model
                  </div>
                </div>
                
                <h4>Rage Quit and Moloch Models</h4>
                <p>
                  DAO patterns that protect minority stakeholders by allowing them to exit with their fair share of assets if they disagree with a decision.
                </p>
                <p>
                  <strong>Examples</strong>: MolochDAO, DAOhaus
                </p>
                
                <h3>Tokenomic Anti-Patterns</h3>
                
                <h4>Infinite Supply Without Utility</h4>
                <p>
                  Tokens with unlimited supply and insufficient burn mechanisms or utility typically fail.
                </p>
                <p>
                  <strong>Warning signs</strong>:
                </p>
                <ul>
                  <li>High inflation with no corresponding value creation</li>
                  <li>Rewards solely from new token issuance</li>
                  <li>Lack of sustainable use cases</li>
                </ul>
                
                <h4>Ponzinomics</h4>
                <p>
                  Models that rely primarily on new entrants buying tokens to pay returns to earlier participants.
                </p>
                <p>
                  <strong>Warning signs</strong>:
                </p>
                <ul>
                  <li>Marketing focused on APY rather than utility</li>
                  <li>Returns dependent on token price appreciation</li>
                  <li>Excessive referral rewards</li>
                </ul>
                
                <h4>Complexity Without Purpose</h4>
                <p>
                  Over-engineered token systems that users and investors can't understand.
                </p>
                <p>
                  <strong>Warning signs</strong>:
                </p>
                <ul>
                  <li>Multiple interconnected tokens without clear purposes</li>
                  <li>Convoluted mechanics that obscure economic flows</li>
                  <li>Frequent mechanic changes to "fix" price action</li>
                </ul>
                
                <h3>Industry-Specific Patterns</h3>
                
                <h4>DeFi Token Patterns</h4>
                <ul>
                  <li><strong>Protocol Owned Liquidity</strong>: Protocols own their own trading liquidity (e.g., Olympus DAO)</li>
                  <li><strong>Liquidity Mining</strong>: Token rewards for providing liquidity (e.g., Compound, Uniswap)</li>
                  <li><strong>Lending Platforms</strong>: Collateralized loans with interest sharing (e.g., Aave, Compound)</li>
                </ul>
                
                <h4>GameFi Token Patterns</h4>
                <ul>
                  <li><strong>Dual-Token Model</strong>: Separating governance and in-game currency (e.g., Axie Infinity)</li>
                  <li><strong>Play-to-Earn</strong>: Rewarding gameplay with tokens (e.g., StepN, Thetan Arena)</li>
                  <li><strong>NFT + Utility Token</strong>: NFTs representing assets, tokens for actions (e.g., Gods Unchained)</li>
                </ul>
                
                <h4>DAO Token Patterns</h4>
                <ul>
                  <li><strong>Contribution Mining</strong>: Tokens earned through work contributions (e.g., GitcoinDAO)</li>
                  <li><strong>Reputation Systems</strong>: Non-transferable influence based on contributions (e.g., DAOstack)</li>
                  <li><strong>Investment DAOs</strong>: Pooling capital with shared governance (e.g., MetaCartel Ventures)</li>
                </ul>
                
                <h3>Designing With Patterns</h3>
                <p>
                  When designing a token economy, consider:
                </p>
                <ol>
                  <li><strong>Start With Use Case</strong>: Select patterns that match your core value proposition</li>
                  <li><strong>Mix and Match</strong>: Combine elements from different patterns as needed</li>
                  <li><strong>Simplify</strong>: Only add complexity when it serves a clear purpose</li>
                  <li><strong>Test and Iterate</strong>: Simulate different scenarios before implementation</li>
                  <li><strong>Consider All Stakeholders</strong>: Ensure incentives align for all ecosystem participants</li>
                </ol>
                
                <h3>Evaluating Tokenomic Patterns</h3>
                <p>
                  When evaluating a token design, ask:
                </p>
                <ul>
                  <li>Is there sustainable value accrual?</li>
                  <li>Are incentives aligned for all participants?</li>
                  <li>Is the model resilient to market downturns?</li>
                  <li>Does it solve a real economic problem?</li>
                  <li>Are supply and demand mechanics balanced?</li>
                </ul>
                
                <div className="key-takeaway">
                  The most effective tokenomics systems align incentives between token holders, users, and the protocol itself, creating sustainable value for all participants.
                </div>
                
                <div className="section-divider"></div>
                
                <h3>Next Steps</h3>
                <p>
                  Congratulations! You've completed our tokenomics curriculum. Now you can put your knowledge to work:
                </p>
                <ul>
                  <li>Use our <Link href="/simulator" className="text-blue-600 hover:underline">interactive simulator</Link> to test different tokenomic designs</li>
                  <li>Review case studies of successful and failed projects</li>
                  <li>Connect with other tokenomics enthusiasts and designers</li>
                  <li>Start designing your own token economy</li>
                </ul>
                
                <p>
                  We hope these lessons have provided a solid foundation for understanding and creating effective token economies. The field continues to evolve rapidly, so keep learning and experimenting!
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-8">
                  <p className="font-medium text-blue-700">
                    You've completed all lessons! Start again or try the simulator to apply what you've learned.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <Link 
                      href="/lessons/introduction" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                      Start Over
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
            <a href="https://github.com/udhaykumarbala/tokenomics-simulator" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}