import Link from "next/link";

export default function GovernanceLessonPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 sm:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Tokenomics Lessons</h1>
          <p className="mt-2 text-lg">Token Governance</p>
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
                <li className="bg-blue-50 text-blue-700 font-medium p-2 rounded">
                  <Link href="/lessons/governance" className="block">Token Governance</Link>
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
              <h2 className="text-3xl font-bold mb-6">Token Governance</h2>
              
              <div className="prose max-w-none">
                <p>
                  Token governance is the system by which token holders participate in decision-making processes for a protocol or platform. Effective governance models are critical for sustainable and decentralized crypto projects.
                </p>
                
                <h3>Why Token Governance Matters</h3>
                <p>
                  Governance is essential to crypto projects for several reasons:
                </p>
                <ul>
                  <li><strong>Decentralization</strong>: Distributes decision-making power among stakeholders</li>
                  <li><strong>Adaptability</strong>: Enables protocols to evolve and improve over time</li>
                  <li><strong>Community Alignment</strong>: Creates mechanisms to resolve conflicts and build consensus</li>
                  <li><strong>Regulatory Resilience</strong>: Reduces central points of failure and control</li>
                </ul>
                
                <div className="key-takeaway">
                  Well-designed governance systems balance efficiency in decision-making with broad stakeholder representation, avoiding both gridlock and capture by large holders.
                </div>
                
                <div className="section-divider"></div>
                
                <h3>Governance Models</h3>
                
                <h4>1. On-Chain Governance</h4>
                <p>
                  In on-chain governance, voting and execution of decisions happen directly on the blockchain.
                </p>
                <p>
                  <strong>Key characteristics</strong>:
                </p>
                <ul>
                  <li>Voting record is transparent and immutable</li>
                  <li>Results can be automatically executed via smart contracts</li>
                  <li>Typically requires token staking or locking for vote weight</li>
                </ul>
                <p>
                  <strong>Examples</strong>: Tezos, Compound, MakerDAO
                </p>
                
                <div className="case-study">
                  MakerDAO uses an on-chain governance system where MKR token holders vote on critical protocol parameters like stability fees and debt ceilings. The voting weight is proportional to the amount of MKR each holder stakes in the voting contract.
                </div>
                
                <h4>2. Off-Chain Governance</h4>
                <p>
                  Off-chain governance involves discussion and signaling that occurs outside the blockchain, even if final implementation happens on-chain.
                </p>
                <p>
                  <strong>Key characteristics</strong>:
                </p>
                <ul>
                  <li>More flexible discussion format</li>
                  <li>Lower transaction costs</li>
                  <li>Often uses "signaling votes" that don't directly trigger code changes</li>
                </ul>
                <p>
                  <strong>Examples</strong>: Ethereum, Bitcoin, Uniswap (initial versions)
                </p>
                
                <div className="callout">
                  Despite being criticized for centralization risks, off-chain governance can enable more nuanced decision-making and wider participation from stakeholders who may not be able to afford on-chain voting costs.
                </div>
                
                <div className="section-divider"></div>
                
                <h4>3. Hybrid Models</h4>
                <p>
                  Many projects use elements of both on-chain and off-chain governance.
                </p>
                <p>
                  <strong>Common flow</strong>:
                </p>
                <ol>
                  <li>Off-chain discussion and proposal drafting</li>
                  <li>On-chain signaling vote</li>
                  <li>Final on-chain vote with executable code</li>
                  <li>Automatic or multi-sig execution</li>
                </ol>
                
                <h3>Voting Mechanisms</h3>
                
                <h4>Token-Weighted Voting</h4>
                <p>
                  The most common model where voting power is proportional to token holdings.
                </p>
                <p>
                  <strong>Pros</strong>:
                </p>
                <ul>
                  <li>Simple to implement and understand</li>
                  <li>Aligns voting power with economic stake</li>
                  <li>Clear and deterministic outcomes</li>
                </ul>
                <p>
                  <strong>Cons</strong>:
                </p>
                <ul>
                  <li>Susceptible to plutocracy ("rich get richer")</li>
                  <li>Vulnerable to vote buying and exchange voting</li>
                  <li>May lead to low participation from smaller holders</li>
                </ul>
                
                <h4>Quadratic Voting</h4>
                <p>
                  Voting power scales as the square root of tokens held, giving diminishing returns to large holders.
                </p>
                <div className="formula">
                  Voting Power = √(Token Holdings)
                </div>
                <p>
                  <strong>Pros</strong>:
                </p>
                <ul>
                  <li>More equitable distribution of influence</li>
                  <li>Reduces plutocratic control</li>
                  <li>Incentivizes broader participation</li>
                </ul>
                <p>
                  <strong>Cons</strong>:
                </p>
                <ul>
                  <li>Vulnerable to Sybil attacks (identity splitting)</li>
                  <li>More complex to implement</li>
                  <li>May still favor wealthy participants</li>
                </ul>
                
                <div className="example">
                  <div className="example-header">Quadratic Voting Example</div>
                  <p>
                    In a standard token voting system, a wallet with 100 tokens would have 100 votes. With quadratic voting, they would have √100 = 10 votes. This means that 10 users with 1 token each would have the same voting power (10 votes total) as one user with 100 tokens.
                  </p>
                </div>
                
                <div className="section-divider"></div>
                
                <h4>Conviction Voting</h4>
                <p>
                  Voting power increases the longer tokens are locked in support of a proposal.
                </p>
                <p>
                  <strong>Pros</strong>:
                </p>
                <ul>
                  <li>Rewards long-term commitment</li>
                  <li>Reduces vote flipping and manipulation</li>
                  <li>Can enable continuous funding decisions</li>
                </ul>
                <p>
                  <strong>Cons</strong>:
                </p>
                <ul>
                  <li>More complex UX</li>
                  <li>Slower decision-making</li>
                  <li>Can favor patient capital over urgent needs</li>
                </ul>
                
                <h3>Delegation and Liquid Democracy</h3>
                <p>
                  Many governance systems allow token holders to delegate their voting power.
                </p>
                <p>
                  <strong>Benefits of delegation</strong>:
                </p>
                <ul>
                  <li>Improves participation rates</li>
                  <li>Enables expertise-based voting</li>
                  <li>Reduces costs for individual voters</li>
                </ul>
                
                <div className="case-study">
                  <strong>Case Study</strong>: Compound's delegation system allowed users to maintain liquidity while still participating in governance through trusted delegates.
                </div>
                
                <div className="section-divider"></div>
                
                <h3>Common Governance Components</h3>
                
                <h4>1. Proposal System</h4>
                <p>
                  Methods for suggesting changes to the protocol:
                </p>
                <ul>
                  <li><strong>Forum discussions</strong>: Initial ideation and feedback gathering</li>
                  <li><strong>Improvement proposals</strong>: Standardized format for suggesting changes</li>
                  <li><strong>Formal proposal submission</strong>: On-chain action to initiate voting</li>
                </ul>
                
                <h4>2. Voting Mechanisms</h4>
                <p>
                  Parameters that define how votes are counted:
                </p>
                <ul>
                  <li><strong>Quorum</strong>: Minimum participation required for a valid vote</li>
                  <li><strong>Approval threshold</strong>: Percentage of "yes" votes needed to pass</li>
                  <li><strong>Voting period</strong>: Time window during which votes can be cast</li>
                  <li><strong>Vote counting method</strong>: Simple majority, supermajority, etc.</li>
                </ul>
                
                <h4>3. Execution Systems</h4>
                <p>
                  How approved decisions are implemented:
                </p>
                <ul>
                  <li><strong>Timelock</strong>: Delay between approval and execution</li>
                  <li><strong>Multi-signature</strong>: Requires multiple keyholders to approve execution</li>
                  <li><strong>Automatic execution</strong>: Smart contracts implement changes without intervention</li>
                </ul>
                
                <h3>Governance Challenges</h3>
                
                <h4>Voter Apathy</h4>
                <p>
                  Many governance systems suffer from low participation rates.
                </p>
                <p>
                  <strong>Potential solutions</strong>:
                </p>
                <ul>
                  <li>Vote incentives (governance mining)</li>
                  <li>Delegation systems</li>
                  <li>Simpler voting interfaces</li>
                  <li>Educational resources</li>
                </ul>
                
                <h4>Governance Attacks</h4>
                <p>
                  Several attack vectors threaten token governance:
                </p>
                <ul>
                  <li><strong>Governance tokens as attack vector</strong>: Acquiring enough tokens to force malicious proposals</li>
                  <li><strong>Flash loan attacks</strong>: Borrowing tokens temporarily to influence votes</li>
                  <li><strong>Bribery</strong>: Paying token holders to vote a certain way</li>
                </ul>
                
                <p>
                  <strong>Mitigation strategies</strong>:
                </p>
                <ul>
                  <li>Voting delays</li>
                  <li>Token lockups before voting</li>
                  <li>Graduated voting weight based on holding period</li>
                </ul>
                
                <h3>DAOs (Decentralized Autonomous Organizations)</h3>
                <p>
                  DAOs are organizations where governance and operations are coordinated through blockchain mechanisms.
                </p>
                
                <h4>Types of DAOs</h4>
                <ul>
                  <li><strong>Protocol DAOs</strong>: Govern decentralized protocols (e.g., MakerDAO)</li>
                  <li><strong>Investment DAOs</strong>: Pool capital for investments (e.g., The LAO)</li>
                  <li><strong>Service DAOs</strong>: Provide services to clients (e.g., Raid Guild)</li>
                  <li><strong>Social DAOs</strong>: Community-focused organizations (e.g., Friends With Benefits)</li>
                  <li><strong>Collector DAOs</strong>: Acquire and manage assets (e.g., PleasrDAO)</li>
                </ul>
                
                <h3>Designing Effective Governance</h3>
                <p>
                  When designing token governance, consider:
                </p>
                <ol>
                  <li><strong>Accessibility</strong>: Can average users participate meaningfully?</li>
                  <li><strong>Security</strong>: Is the system resistant to attacks and manipulation?</li>
                  <li><strong>Efficiency</strong>: Can decisions be made in a timely manner?</li>
                  <li><strong>Inclusivity</strong>: Do all stakeholder types have appropriate representation?</li>
                  <li><strong>Flexibility</strong>: Can the system evolve as needs change?</li>
                </ol>
                
                <div className="key-takeaway">
                  The most effective governance systems are those that balance power among different stakeholders, remain accessible to participants of varying sizes, and can adapt based on the protocol's evolving needs.
                </div>
                
                <div className="section-divider"></div>
                
                <h3>Next Steps</h3>
                <p>
                  In our final lesson, we'll explore common tokenomic patterns that combine supply dynamics, staking, and governance into cohesive economic systems.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-8">
                  <p className="font-medium text-blue-700">
                    Ready to move on? Continue to our final lesson on Tokenomic Patterns or try the simulator to experiment with governance parameters.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <Link 
                      href="/lessons/tokenomic-patterns" 
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
            <a href="https://github.com/udhaykumarbala/tokenomics-simulator" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}