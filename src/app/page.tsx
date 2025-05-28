"use client";

import { AnimatedLink } from "@/components/animations";
import { Navigation, Footer } from "@/components/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen background-gradient-blur-container">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <div className="flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
            >
              Master Tokenomics Through Interactive Learning
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base sm:text-lg mb-6 sm:mb-8"
            >
              Take your understanding of crypto-economic design from zero to hero with our
              bite-sized lessons and interactive simulator.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex gap-4 flex-wrap"
            >
              <AnimatedLink 
                href="/lessons/introduction" 
                className="bg-primary hover:bg-gradient text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Start Learning
              </AnimatedLink>
              <AnimatedLink
                href="/simulator" 
                className="bg-white border border-primary text-primary hover:bg-primary-light-opacity font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Try Simulator
              </AnimatedLink>
              <AnimatedLink
                href="/glossary" 
                className="text-primary hover:text-primary-dark underline font-medium py-3 px-1"
              >
                View Glossary
              </AnimatedLink>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-glass border border-gray-200 rounded-xl p-6 sm:p-8 flex flex-col text-white backdrop-blur-md"
          >
            <h3 className="text-xl font-semibold mb-4">What you'll learn:</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-success mr-2">✓</span>
                <span>Supply dynamics: inflation, burns, and vesting</span>
              </li>
              <li className="flex items-start">
                <span className="text-success mr-2">✓</span>
                <span>Staking mechanics and reward systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-success mr-2">✓</span>
                <span>Governance parameters and voting power</span>
              </li>
              <li className="flex items-start">
                <span className="text-success mr-2">✓</span>
                <span>Tokenomic sustainability and long-term design</span>
              </li>
            </ul>
            <div className="mt-auto">
              <div className="text-sm text-gray-300">
                Fully interactive simulator helps you visualize how token metrics evolve over time
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16 sm:mt-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl font-bold mb-6 text-center"
          >
            How It Works
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-glass p-5 sm:p-6 rounded-lg shadow-sm border border-gray-100 text-white"
            >
              <div className="text-primary font-bold text-lg sm:text-xl mb-2">1. Learn Concepts</div>
              <p>Start with bite-sized lessons on tokenomics fundamentals and advanced concepts.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-glass p-5 sm:p-6 rounded-lg shadow-sm border border-gray-100 text-white"
            >
              <div className="text-primary font-bold text-lg sm:text-xl mb-2">2. Experiment</div>
              <p>Use the simulator to adjust parameters and see how they affect token metrics over time.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-glass p-5 sm:p-6 rounded-lg shadow-sm border border-gray-100 text-white"
            >
              <div className="text-primary font-bold text-lg sm:text-xl mb-2">3. Master</div>
              <p>Apply your knowledge to design robust token economies with balanced incentives.</p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
