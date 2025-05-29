"use client";

import Link from "next/link";
import { useState, useEffect } from "react"; // Added useEffect
import { useRouter } from "next/navigation"; // Added useRouter
import { CollapsibleCard, StickyKeyTakeaway, QuizModal, SkipAheadModal } from "@/components/interactive"; // Added SkipAheadModal
import { getRandomQuestion, getLessonIdFromPath } from "@/content/quizzes";
import { lessonOrder } from "@/lib/lessonOrder"; // Added lessonOrder
import { usePathname } from "next/navigation";

export default function StakingMechanismsLessonPage() {
  const pathname = usePathname();
  const router = useRouter(); // Added router
  const lessonId = getLessonIdFromPath(pathname);
  const randomQuestion = getRandomQuestion(lessonId);
  
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showSkipAheadModal, setShowSkipAheadModal] = useState(false); // Added state for SkipAheadModal
  const [firstIncompleteLessonPath, setFirstIncompleteLessonPath] = useState<string | null>(null); // Added state for firstIncompleteLessonPath

  useEffect(() => {
    if (typeof window !== "undefined") {
      const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
      const currentLessonIndex = lessonOrder.indexOf(lessonId);

      if (currentLessonIndex > 0) { // Only check for lessons after the first one
        for (let i = 0; i < currentLessonIndex; i++) {
          const previousLessonId = lessonOrder[i];
          if (!completedLessons.includes(previousLessonId)) {
            setFirstIncompleteLessonPath(`/lessons/${previousLessonId}`);
            setShowSkipAheadModal(true);
            break;
          }
        }
      }
    }
  }, [lessonId]);

  const handleGoToFirstIncomplete = (path: string) => {
    router.push(path);
    setShowSkipAheadModal(false);
  };

  const handleMarkPreviousComplete = () => {
    const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
    const currentLessonIndex = lessonOrder.indexOf(lessonId);
    
    for (let i = 0; i < currentLessonIndex; i++) {
      const previousLessonId = lessonOrder[i];
      if (!completedLessons.includes(previousLessonId)) {
        completedLessons.push(previousLessonId);
      }
    }
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
    setShowSkipAheadModal(false);
    // Potentially trigger a re-render or event for LessonSideNav if necessary
  };

  const handleNextLessonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowQuizModal(true);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 sm:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Tokenomics Lessons</h1>
          <p className="mt-2 text-lg">Staking Mechanisms</p>
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
                <li className="bg-blue-50 text-blue-700 font-medium p-2 rounded">
                  <Link href="/lessons/staking-mechanisms" className="block">Staking Mechanisms</Link>
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
              <h2 className="text-3xl font-bold mb-6">Staking Mechanisms</h2>
              
              <div className="prose max-w-none">
                <p>
                  Staking is the process of locking tokens in a cryptocurrency network to support its operations while earning rewards in return. It's a fundamental component of many modern tokenomic designs.
                </p>
                
                <h3>What is Staking?</h3>
                <p>
                  Staking serves multiple purposes in token economies:
                </p>
                <ul>
                  <li><strong>Network Security</strong>: Validators stake tokens as collateral, creating economic disincentives for malicious behavior</li>
                  <li><strong>Governance Participation</strong>: Staked tokens often grant voting rights in protocol decisions</li>
                  <li><strong>Economic Alignment</strong>: Rewards those who commit capital to the long-term success of the protocol</li>
                  <li><strong>Supply Regulation</strong>: Controls circulating supply by incentivizing holders to lock tokens</li>
                </ul>
                
                <div className="key-takeaway">
                  Well-designed staking mechanisms align participant incentives with network security and long-term sustainability while providing appropriate rewards for capital commitment.
                </div>
                
                <StickyKeyTakeaway>
                  Well-designed staking mechanisms align incentives with network security and sustainability while properly rewarding capital commitment.
                </StickyKeyTakeaway>
                
                <h3>Proof of Stake (PoS) Variations</h3>
                
                <h4>Delegated Proof of Stake (DPoS)</h4>
                <p>
                  In DPoS systems, token holders vote for a limited set of validators who secure the network.
                </p>
                <p>
                  <strong>Examples</strong>: EOS, Tron, Cosmos (variations)
                </p>
                <p>
                  <strong>Pros</strong>:
                </p>
                <ul>
                  <li>Higher transaction throughput</li>
                  <li>Lower barrier to participation for regular users</li>
                  <li>Energy efficient</li>
                </ul>
                <p>
                  <strong>Cons</strong>:
                </p>
                <ul>
                  <li>More centralized than other PoS systems</li>
                  <li>Potential for validator collusion</li>
                  <li>"Rich get richer" dynamics</li>
                </ul>
                
                <CollapsibleCard
                  title={
                    <div>
                      <h4 className="text-lg font-medium mb-2">PoS vs DPoS: Key Differences</h4>
                      <p>How do Proof of Stake and Delegated Proof of Stake differ?</p>
                    </div>
                  }
                  content={
                    <div>
                      <h4 className="text-lg font-medium mb-2">PoS vs DPoS Comparison:</h4>
                      <table className="text-sm">
                        <tbody>
                          <tr>
                            <td className="border-b border-gray-300 dark:border-gray-700 py-1 pr-2 font-medium">Validators</td>
                            <td className="border-b border-gray-300 dark:border-gray-700 py-1">PoS: Many potential validators<br/>DPoS: Limited set of elected validators</td>
                          </tr>
                          <tr>
                            <td className="border-b border-gray-300 dark:border-gray-700 py-1 pr-2 font-medium">Participation</td>
                            <td className="border-b border-gray-300 dark:border-gray-700 py-1">PoS: Direct staking required<br/>DPoS: Can delegate without running node</td>
                          </tr>
                          <tr>
                            <td className="py-1 pr-2 font-medium">Decentralization</td>
                            <td className="py-1">PoS: Generally more decentralized<br/>DPoS: More efficient but less decentralized</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  }
                />
                
                <h4>Bonded Proof of Stake</h4>
                <p>
                  Validators and delegators lock (bond) their tokens as collateral, subject to slashing if they misbehave.
                </p>
                <p>
                  <strong>Examples</strong>: Cosmos, Polkadot, Ethereum 2.0
                </p>
                <p>
                  <strong>Key features</strong>:
                </p>
                <ul>
                  <li>Unbonding periods (typically 7-28 days)</li>
                  <li>Slashing conditions for protocol violations</li>
                  <li>Delegation mechanisms</li>
                </ul>
                
                <h4>Liquid Staking</h4>
                <p>
                  Liquid staking allows users to stake tokens while receiving a liquid representation that can be used elsewhere in the ecosystem.
                </p>
                <p>
                  <strong>Examples</strong>: Lido (stETH), Marinade (mSOL)
                </p>
                <p>
                  <strong>Benefits</strong>:
                </p>
                <ul>
                  <li>Maintains liquidity of staked assets</li>
                  <li>Enables capital efficiency</li>
                  <li>Allows participation in DeFi while staking</li>
                </ul>
                
                <div className="bg-yellow-50 p-4 my-4 border-l-4 border-yellow-500 italic">
                  <strong>Important</strong>: Liquid staking derivatives create new systemic risks and dependencies between protocols.
                </div>
                
                <h3>Staking Economics</h3>
                
                <h4>Reward Mechanisms</h4>
                <p>
                  Staking rewards typically come from:
                </p>
                <ol>
                  <li><strong>Inflation</strong>: New tokens created as rewards (inflationary)</li>
                  <li><strong>Transaction Fees</strong>: A portion of network fees distributed to stakers</li>
                  <li><strong>Protocol Revenue</strong>: Other revenue streams the protocol generates</li>
                </ol>
                
                <h4>Calculating Staking APR/APY</h4>
                <p>
                  The basic formula for annual percentage rate (APR) in a staking system is:
                </p>
                <pre className="bg-gray-100 p-4 rounded">
                  Annual Rewards = (Total Rewards per Year / Total Tokens Staked) * 100%
                </pre>
                <p>
                  Factors affecting staking returns:
                </p>
                <ul>
                  <li><strong>Staking Ratio</strong>: Percentage of total supply that is staked</li>
                  <li><strong>Inflation Rate</strong>: Rate at which new tokens are created</li>
                  <li><strong>Token Price</strong>: Market value of the token (impacts real returns)</li>
                  <li><strong>Lockup Period</strong>: Duration tokens must remain staked</li>
                </ul>
                
                <h3>Staking and Tokenomics</h3>
                
                <h4>Impact on Circulating Supply</h4>
                <p>
                  Staking effectively reduces circulating supply by:
                </p>
                <ul>
                  <li>Locking tokens for defined periods</li>
                  <li>Creating opportunity costs for token holders</li>
                  <li>Reducing sell pressure</li>
                </ul>
                
                <div className="text-center my-6">
                  <div className="italic text-sm text-gray-500">
                    Staking Impact on Supply
                  </div>
                </div>
                
                <h4>Equilibrium Staking Rate</h4>
                <p>
                  Most protocols aim for an equilibrium staking rate where:
                </p>
                <ul>
                  <li>Enough tokens are staked to secure the network</li>
                  <li>Sufficient tokens remain in circulation for liquidity</li>
                  <li>Rewards are attractive but sustainable</li>
                </ul>
                
                <p>
                  Factors influencing this equilibrium:
                </p>
                <ul>
                  <li>Reward rate</li>
                  <li>Lockup requirements</li>
                  <li>Alternative uses for the token</li>
                  <li>Risk perception</li>
                </ul>
                
                <h3>Slashing and Security</h3>
                <p>
                  Slashing is the mechanism by which validators lose a portion of their staked tokens if they act maliciously or fail to perform their duties.
                </p>
                
                <h4>Common Slashing Conditions</h4>
                <ul>
                  <li><strong>Double signing</strong>: Validating conflicting blocks</li>
                  <li><strong>Downtime</strong>: Failing to participate in consensus for extended periods</li>
                  <li><strong>Malicious behavior</strong>: Attempting to attack or subvert the network</li>
                </ul>
                
                <h4>Slashing Parameters</h4>
                <table className="border-collapse border border-gray-300 min-w-full mt-4 mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Parameter</th>
                      <th className="border border-gray-300 px-4 py-2">Description</th>
                      <th className="border border-gray-300 px-4 py-2">Typical Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Severity</td>
                      <td className="border border-gray-300 px-4 py-2">Percentage of stake slashed</td>
                      <td className="border border-gray-300 px-4 py-2">0.1-100%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Jailing Time</td>
                      <td className="border border-gray-300 px-4 py-2">Period validator cannot participate</td>
                      <td className="border border-gray-300 px-4 py-2">1-14 days</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Evidence Window</td>
                      <td className="border border-gray-300 px-4 py-2">Time to submit proof of violation</td>
                      <td className="border border-gray-300 px-4 py-2">1 hour - 2 weeks</td>
                    </tr>
                  </tbody>
                </table>
                
                <h3>Advanced Staking Concepts</h3>
                
                <h4>Nomination Pools</h4>
                <p>
                  Allow smaller token holders to pool resources to meet minimum staking requirements.
                </p>
                <p>
                  <strong>Examples</strong>: Polkadot, Kusama
                </p>
                
                <h4>Superfluid Staking</h4>
                <p>
                  Tokens staked for security can simultaneously provide liquidity or other utility.
                </p>
                <p>
                  <strong>Examples</strong>: Osmosis, THORChain (variations)
                </p>
                
                <h4>Restaking and EigenLayer</h4>
                <p>
                  Restaking allows the same staked ETH to secure multiple protocols, amplifying capital efficiency but also increasing systemic risk.
                </p>
                
                <h3>Designing Effective Staking Mechanisms</h3>
                <p>
                  When designing staking for your token, consider:
                </p>
                <ol>
                  <li><strong>Security vs Decentralization</strong>: Higher returns may increase staking ratio but concentrate tokens</li>
                  <li><strong>Lockup Periods</strong>: Longer periods increase security but reduce liquidity</li>
                  <li><strong>Minimum Stake</strong>: Lower minimums increase participation but may reduce validator quality</li>
                  <li><strong>Reward Distribution</strong>: Equal distribution vs. proportional to stake amount</li>
                </ol>
                
                <h3>Next Steps</h3>
                <p>
                  In the next lesson, we'll explore token governance systems and how they enable decentralized decision-making in crypto protocols.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-8">
                  <p className="font-medium text-blue-700">
                    Ready to move on? Continue to the next lesson on Token Governance or try the simulator to experiment with staking parameters.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <Link 
                      href="/lessons/governance" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                      onClick={handleNextLessonClick}
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
      
      {/* Quiz modal */}
      {randomQuestion && (
        <QuizModal
          isOpen={showQuizModal}
          onClose={() => setShowQuizModal(false)}
          question={randomQuestion.question}
          options={randomQuestion.options}
          correctAnswer={randomQuestion.correctAnswer}
          nextLessonPath="/lessons/governance"
          currentLessonId={lessonId} // Pass the lessonId here
        />
      )}

      {firstIncompleteLessonPath && (
        <SkipAheadModal
          isOpen={showSkipAheadModal}
          onClose={() => setShowSkipAheadModal(false)}
          firstIncompleteLessonPath={firstIncompleteLessonPath}
          onGoToFirstIncomplete={handleGoToFirstIncomplete}
          onMarkPreviousComplete={handleMarkPreviousComplete}
        />
      )}
    </div>
  );
}