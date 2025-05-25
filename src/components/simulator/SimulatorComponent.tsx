"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { simulateTokenomics } from "@/lib/tokenomics/simulator";
import { TokenomicsParams, SimulationResult } from "@/lib/tokenomics/types";
import { motion } from "framer-motion";
import { 
  AnimatedButton, 
  AnimatedSlider, 
  AnimatedValue, 
  AnimatedInsight,
  chartEntrance,
  staggerContainer
} from "@/components/animations";

export default function SimulatorComponent() {
  const [params, setParams] = useState<TokenomicsParams>({
    initialSupply: 100000000,
    maxSupply: 1000000000,
    inflationRate: 5,
    burnRate: 1,
    stakingReward: 8,
    lockupPeriod: 30,
    governanceThreshold: 5,
    simulationYears: 10
  });

  const [results, setResults] = useState<SimulationResult[]>([]);
  const [isSimulated, setIsSimulated] = useState(false);
  const [autoRun, setAutoRun] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Configuration for chart lines visibility
  const [visibleLines, setVisibleLines] = useState({
    totalSupply: true,
    circulatingSupply: true,
    stakedSupply: true,
    burnedSupply: true,
    stakingParticipation: true,
    governanceParticipation: true
  });

  // Toggle chart line visibility
  const toggleLineVisibility = (lineKey: keyof typeof visibleLines) => {
    setVisibleLines(prev => ({
      ...prev,
      [lineKey]: !prev[lineKey]
    }));
  };

  // Custom tooltip formatter for charts
  const formatTooltipValue = (value: number, name: string) => {
    if (name.includes("%")) {
      return `${value.toFixed(2)}%`;
    } else if (value > 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    } else if (value > 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    }
    return value.toFixed(2);
  };

  // Determine token health status
  const getTokenomicsHealth = (): { status: string; color: string } => {
    if (!results || results.length === 0) return { status: 'Not evaluated', color: 'gray' };
    
    const lastResult = results[results.length - 1];
    const avgInflation = results.reduce((acc, curr) => acc + curr.effectiveInflation, 0) / results.length;
    
    if (avgInflation > 10) return { status: 'High Inflation', color: 'red' };
    if (lastResult.burnedSupply / lastResult.totalSupply > 0.3) return { status: 'Overburned', color: 'orange' };
    if (lastResult.stakingParticipation > 50) return { status: 'High Staking', color: 'blue' };
    if (avgInflation < 0) return { status: 'Deflationary', color: 'green' };
    
    return { status: 'Sustainable', color: 'green' };
  };
  
  // Memoize the runSimulation function to prevent unnecessary rerenders
  const runSimulation = useCallback(() => {
    const simulationResults = simulateTokenomics(params);
    setResults(simulationResults);
    setIsSimulated(true);
  }, [params]);

  // Run simulation when parameters change and autoRun is enabled
  useEffect(() => {
    if (autoRun) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      
      const timer = setTimeout(() => {
        runSimulation();
      }, 300); // 300ms debounce
      
      setDebounceTimer(timer);
      
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [params, autoRun, runSimulation, debounceTimer]);

  // Handle slider input changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);
    
    setParams((prev) => {
      // Special handling for initialSupply and maxSupply relationship
      if (name === 'initialSupply') {
        // If initialSupply is being increased beyond maxSupply, increase maxSupply as well
        if (parsedValue > prev.maxSupply) {
          return {
            ...prev,
            initialSupply: parsedValue,
            maxSupply: parsedValue
          };
        }
      } else if (name === 'maxSupply') {
        // Ensure maxSupply is not set lower than initialSupply
        if (parsedValue < prev.initialSupply) {
          return {
            ...prev,
            maxSupply: prev.initialSupply
          };
        }
      }
      
      // Default handling for other parameters
      return {
        ...prev,
        [name]: parsedValue
      };
    });
  };

  const toggleAutoRun = () => {
    const newAutoRunState = !autoRun;
    setAutoRun(newAutoRunState);
    if (newAutoRunState) {
      runSimulation();
    }
  };

  // Preset configurations
  const presets = {
    fixedSupply: {
      initialSupply: 100000000,
      maxSupply: 100000000, // Same as initial - no new tokens
      inflationRate: 0,
      burnRate: 0,
      stakingReward: 5,
      lockupPeriod: 30,
      governanceThreshold: 5,
      simulationYears: 10
    },
    highInflation: {
      initialSupply: 100000000,
      maxSupply: 1000000000,
      inflationRate: 15,
      burnRate: 0,
      stakingReward: 10,
      lockupPeriod: 30,
      governanceThreshold: 5,
      simulationYears: 10
    },
    stakingEconomy: {
      initialSupply: 100000000,
      maxSupply: 500000000,
      inflationRate: 8,
      burnRate: 1,
      stakingReward: 16,
      lockupPeriod: 90,
      governanceThreshold: 3,
      simulationYears: 10
    },
    deflationaryDAO: {
      initialSupply: 250000000,
      maxSupply: 250000000,
      inflationRate: 0,
      burnRate: 5,
      stakingReward: 12,
      lockupPeriod: 180,
      governanceThreshold: 3,
      simulationYears: 10
    }
  };
  
  // Apply preset configuration
  const applyPreset = (presetName: keyof typeof presets) => {
    setParams(presets[presetName]);
    if (autoRun) {
      // A small delay to ensure the UI updates before running the simulation
      setTimeout(() => runSimulation(), 50);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Tokenomics Parameters</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Auto-Run</span>
              <motion.button 
                onClick={toggleAutoRun}
                whileTap={{ scale: 0.95 }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${autoRun ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <motion.span 
                  animate={{ 
                    translateX: autoRun ? "1.3rem" : "0.15rem" 
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`inline-block h-4 w-4 transform rounded-full bg-white`} 
                />
              </motion.button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-gray-700">Preset Configurations</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <AnimatedButton 
                  onClick={() => applyPreset('fixedSupply')}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs py-1 px-2 rounded-md"
                >
                  Fixed Supply
                </AnimatedButton>
                <AnimatedButton 
                  onClick={() => applyPreset('highInflation')}
                  className="bg-orange-100 hover:bg-orange-200 text-orange-800 text-xs py-1 px-2 rounded-md"
                >
                  High Inflation
                </AnimatedButton>
                <AnimatedButton 
                  onClick={() => applyPreset('stakingEconomy')}
                  className="bg-green-100 hover:bg-green-200 text-green-800 text-xs py-1 px-2 rounded-md"
                >
                  Staking Economy
                </AnimatedButton>
                <AnimatedButton 
                  onClick={() => applyPreset('deflationaryDAO')}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs py-1 px-2 rounded-md"
                >
                  Deflationary DAO
                </AnimatedButton>
              </div>
            </div>
            <div>
              <label htmlFor="initialSupply" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                Initial Token Supply
                <span className="ml-1 group relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-10 -mt-2 w-48 p-2 text-xs bg-gray-900 text-white rounded-md pointer-events-none transform -translate-x-1/2 left-1/2 translate-y-1">
                    The total number of tokens created at genesis. Influences market cap and initial distribution.
                  </div>
                </span>
              </label>
              <div className="flex items-center space-x-3">
                <AnimatedSlider
                  id="initialSupply"
                  name="initialSupply"
                  value={params.initialSupply}
                  onChange={handleSliderChange}
                  min="1000000"
                  max="1000000000"
                  step="1000000"
                  className="slider-primary"
                  aria-label="Initial token supply"
                />
                <AnimatedValue className="slider-value" value={params.initialSupply.toLocaleString()} />
              </div>
            </div>
            
            <div>
              <label htmlFor="maxSupply" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                Maximum Token Supply
                <span className="ml-1 group relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-10 -mt-2 w-48 p-2 text-xs bg-gray-900 text-white rounded-md pointer-events-none transform -translate-x-1/2 left-1/2 translate-y-1">
                    The absolute maximum number of tokens that can ever exist. When reached, inflation stops.
                  </div>
                </span>
              </label>
              <div className="flex items-center space-x-3">
                <AnimatedSlider
                  id="maxSupply"
                  name="maxSupply"
                  value={params.maxSupply}
                  onChange={handleSliderChange}
                  min={params.initialSupply.toString()}
                  max="10000000000"
                  step="100000000"
                  className="slider-primary"
                  aria-label="Maximum token supply"
                />
                <AnimatedValue className="slider-value" value={params.maxSupply.toLocaleString()} />
              </div>
            </div>
            
            <div>
              <label htmlFor="inflationRate" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                Annual Inflation Rate (%)
                <span className="ml-1 group relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-10 -mt-2 w-48 p-2 text-xs bg-gray-900 text-white rounded-md pointer-events-none transform -translate-x-1/2 left-1/2 translate-y-1">
                    Percentage of new tokens created each year. Higher rates can fund growth but may dilute value.
                  </div>
                </span>
              </label>
              <div className="flex items-center space-x-3">
                <AnimatedSlider
                  id="inflationRate"
                  name="inflationRate"
                  value={params.inflationRate}
                  onChange={handleSliderChange}
                  min="0"
                  max="20"
                  step="0.1"
                  className="slider-primary"
                  aria-label="Annual inflation rate"
                />
                <AnimatedValue className="slider-value" value={`${params.inflationRate}%`} />
              </div>
            </div>
            
            <div>
              <label htmlFor="burnRate" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                Annual Burn Rate (%)
                <span className="ml-1 group relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-10 -mt-2 w-48 p-2 text-xs bg-gray-900 text-white rounded-md pointer-events-none transform -translate-x-1/2 left-1/2 translate-y-1">
                    Percentage of circulating tokens destroyed each year. Creates deflationary pressure.
                  </div>
                </span>
              </label>
              <div className="flex items-center space-x-3">
                <AnimatedSlider
                  id="burnRate"
                  name="burnRate"
                  value={params.burnRate}
                  onChange={handleSliderChange}
                  min="0"
                  max="10"
                  step="0.1"
                  className="slider-primary"
                  aria-label="Annual burn rate"
                />
                <AnimatedValue className="slider-value" value={`${params.burnRate}%`} />
              </div>
            </div>
            
            <div>
              <label htmlFor="stakingReward" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                Staking Reward APY (%)
                <span className="ml-1 group relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-10 -mt-2 w-48 p-2 text-xs bg-gray-900 text-white rounded-md pointer-events-none transform -translate-x-1/2 left-1/2 translate-y-1">
                    Annual percentage yield for staked tokens. Higher rewards attract more staking but can be inflationary.
                  </div>
                </span>
              </label>
              <div className="flex items-center space-x-3">
                <AnimatedSlider
                  id="stakingReward"
                  name="stakingReward"
                  value={params.stakingReward}
                  onChange={handleSliderChange}
                  min="0"
                  max="25"
                  step="0.5"
                  className="slider-primary"
                  aria-label="Staking reward APY"
                />
                <AnimatedValue className="slider-value" value={`${params.stakingReward}%`} />
              </div>
            </div>
            
            <div>
              <label htmlFor="lockupPeriod" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                Staking Lockup Period (days)
                <span className="ml-1 group relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-10 -mt-2 w-48 p-2 text-xs bg-gray-900 text-white rounded-md pointer-events-none transform -translate-x-1/2 left-1/2 translate-y-1">
                    Required lock duration for staked tokens. Longer periods reduce volatility but may deter stakers.
                  </div>
                </span>
              </label>
              <div className="flex items-center space-x-3">
                <AnimatedSlider
                  id="lockupPeriod"
                  name="lockupPeriod"
                  value={params.lockupPeriod}
                  onChange={handleSliderChange}
                  min="0"
                  max="365"
                  step="1"
                  className="slider-primary"
                  aria-label="Staking lockup period"
                />
                <AnimatedValue className="slider-value" value={params.lockupPeriod} />
              </div>
            </div>
            
            <div>
              <label htmlFor="governanceThreshold" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                Governance Proposal Threshold (%)
                <span className="ml-1 group relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-10 -mt-2 w-48 p-2 text-xs bg-gray-900 text-white rounded-md pointer-events-none transform -translate-x-1/2 left-1/2 translate-y-1">
                    Minimum percentage of supply needed to create governance proposals. Lower values are more democratic but can lead to spam.
                  </div>
                </span>
              </label>
              <div className="flex items-center space-x-3">
                <AnimatedSlider
                  id="governanceThreshold"
                  name="governanceThreshold"
                  value={params.governanceThreshold}
                  onChange={handleSliderChange}
                  min="0.1"
                  max="10"
                  step="0.1"
                  className="slider-primary"
                  aria-label="Governance proposal threshold"
                />
                <AnimatedValue className="slider-value" value={`${params.governanceThreshold}%`} />
              </div>
            </div>
            
            <div>
              <label htmlFor="simulationYears" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                Simulation Period (years)
                <span className="ml-1 group relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-10 -mt-2 w-48 p-2 text-xs bg-gray-900 text-white rounded-md pointer-events-none transform -translate-x-1/2 left-1/2 translate-y-1">
                    Number of years to project the tokenomic simulation. Longer periods help visualize long-term impacts.
                  </div>
                </span>
              </label>
              <div className="flex items-center space-x-3">
                <AnimatedSlider
                  id="simulationYears"
                  name="simulationYears"
                  value={params.simulationYears}
                  onChange={handleSliderChange}
                  min="1"
                  max="30"
                  step="1"
                  className="slider-primary"
                  aria-label="Simulation period in years"
                />
                <AnimatedValue className="slider-value" value={params.simulationYears} />
              </div>
            </div>
            
            {!autoRun && (
              <AnimatedButton
                onClick={runSimulation}
                className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md"
              >
                Run Simulation
              </AnimatedButton>
            )}
            {autoRun && (
              <div className="mt-4 text-center text-sm text-gray-600 italic">
                Changes are automatically applied to the simulation
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Simulation Results</h3>
            
            {isSimulated && (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium p-1 px-2 rounded-full" 
                  style={{ backgroundColor: `${getTokenomicsHealth().color}20`, color: getTokenomicsHealth().color }}>
                  {getTokenomicsHealth().status}
                </span>
              </div>
            )}
          </div>
          
          {!isSimulated ? (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
              <p className="text-gray-500">
                {autoRun ? "Change parameters to see results" : "Adjust parameters and run simulation to see results"}
              </p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="h-64">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-medium">Token Supply Over Time</h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <AnimatedButton 
                      onClick={() => toggleLineVisibility('totalSupply')} 
                      className={`px-1.5 py-0.5 rounded ${visibleLines.totalSupply ? 'bg-[#8884d8] text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      Total
                    </AnimatedButton>
                    <AnimatedButton 
                      onClick={() => toggleLineVisibility('circulatingSupply')} 
                      className={`px-1.5 py-0.5 rounded ${visibleLines.circulatingSupply ? 'bg-[#82ca9d] text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      Circulating
                    </AnimatedButton>
                    <AnimatedButton 
                      onClick={() => toggleLineVisibility('stakedSupply')} 
                      className={`px-1.5 py-0.5 rounded ${visibleLines.stakedSupply ? 'bg-[#ffc658] text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      Staked
                    </AnimatedButton>
                    <AnimatedButton 
                      onClick={() => toggleLineVisibility('burnedSupply')} 
                      className={`px-1.5 py-0.5 rounded ${visibleLines.burnedSupply ? 'bg-[#ff8042] text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      Burned
                    </AnimatedButton>
                  </div>
                </div>
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={chartEntrance}
                  className="w-full h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Supply', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        formatter={(value: number, name: string) => {
                          return [formatTooltipValue(value, name), name];
                        }} 
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      {visibleLines.totalSupply && <Line type="monotone" dataKey="totalSupply" stroke="#8884d8" name="Total Supply" animationDuration={1000} />}
                      {visibleLines.circulatingSupply && <Line type="monotone" dataKey="circulatingSupply" stroke="#82ca9d" name="Circulating Supply" animationDuration={1200} />}
                      {visibleLines.stakedSupply && <Line type="monotone" dataKey="stakedSupply" stroke="#ffc658" name="Staked Supply" animationDuration={1400} />}
                      {visibleLines.burnedSupply && <Line type="monotone" dataKey="burnedSupply" stroke="#ff8042" name="Burned Supply" animationDuration={1600} />}
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
              
              <div className="h-64">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-medium">Staking and Governance Metrics</h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button 
                      onClick={() => toggleLineVisibility('stakingParticipation')} 
                      className={`px-1.5 py-0.5 rounded ${visibleLines.stakingParticipation ? 'bg-[#ff7300] text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      Staking %
                    </button>
                    <button 
                      onClick={() => toggleLineVisibility('governanceParticipation')} 
                      className={`px-1.5 py-0.5 rounded ${visibleLines.governanceParticipation ? 'bg-[#007BFF] text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      Governance %
                    </button>
                  </div>
                </div>
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={chartEntrance}
                  className="w-full h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        formatter={(value: number, name: string) => {
                          return [`${value.toFixed(2)}%`, name];
                        }}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      {visibleLines.stakingParticipation && <Line type="monotone" dataKey="stakingParticipation" stroke="#ff7300" name="Staking %" animationDuration={1000} />}
                      {visibleLines.governanceParticipation && <Line type="monotone" dataKey="governanceParticipation" stroke="#007BFF" name="Governance %" animationDuration={1200} />}
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
              
              <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h4 className="text-lg font-medium mb-3">Key Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        <span>
                          <strong>Total supply at end:</strong>{" "}
                          {results[results.length - 1]?.totalSupply.toLocaleString()}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>
                          <strong>Circulating supply:</strong>{" "}
                          {results[results.length - 1]?.circulatingSupply.toLocaleString()}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        <span>
                          <strong>Staking participation:</strong>{" "}
                          {results[results.length - 1]?.stakingParticipation.toFixed(2)}%
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                        </svg>
                        <span>
                          <strong>Governance participation:</strong>{" "}
                          {results[results.length - 1]?.governanceParticipation.toFixed(2)}%
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                        <span>
                          <strong>Burned supply:</strong>{" "}
                          {results[results.length - 1]?.burnedSupply.toLocaleString()}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0115.5 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0119 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0122 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0125 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0128 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0131 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0134 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0136 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0138 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0140 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0142 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0144 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0146 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0148 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0150 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0152 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0154 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0156 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0158 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0160 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0162 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0164 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0166 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0168 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0170 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0172 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0174 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0176 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0178 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0180 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0182 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0184 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0186 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0188 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0190 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0192 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0194 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0196 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0198 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01100 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01102 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01104 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01106 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01108 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01110 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01112 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01114 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01116 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01118 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01120 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01122 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01124 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01126 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01128 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01131 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01134 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01137 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01140 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01143 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01146 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01149 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01152 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01155 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01158 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01161 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01164 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01167 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01170 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01173 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01176 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01179 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01182 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01185 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01188 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01191 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01194 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01197 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01200 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01203 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01206 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01209 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01212 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01215 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01218 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01221 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01224 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01227 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01230 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01233 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01236 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01239 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01242 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01245 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01248 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01251 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01254 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01257 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01260 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01263 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01266 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01269 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01272 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01275 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01278 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01281 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01284 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01287 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01290 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01293 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01296 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01299 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01302 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01305 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01308 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01311 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01314 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01317 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01320 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01323 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01326 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01329 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01332 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01335 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01338 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01341 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01344 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01347 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01350 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01353 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01356 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01359 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01362 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01365 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01368 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01371 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01374 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01377 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01380 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01383 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01386 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01389 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01392 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01395 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01398 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01401 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01404 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01407 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01410 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01413 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01416 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01419 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01422 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01425 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01428 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01431 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01434 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01437 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01440 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01443 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01446 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01449 2a1 1 0 01.707.293l.707.707.707-.707A1 1 0 01452 2z" />
                        </svg>
                        <span>
                          <strong>Average annual inflation:</strong>{" "}
                          {(results.reduce((acc, curr) => acc + curr.effectiveInflation, 0) / results.length).toFixed(2)}%
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Trend notes based on simulation results */}
                {results.length > 2 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                    <p className="font-medium text-blue-800 mb-1">Trend Analysis:</p>
                    <p className="text-blue-700">
                      {results[results.length - 1].stakingParticipation > results[0].stakingParticipation * 2 
                        ? "• Staking participation shows strong growth over time." 
                        : results[results.length - 1].stakingParticipation < results[0].stakingParticipation 
                          ? "• Staking participation is declining over time." 
                          : "• Staking participation remains relatively stable."}
                    </p>
                    <p className="text-blue-700">
                      {results[results.length - 1].totalSupply > results[0].totalSupply * 1.5
                        ? "• Token supply expands significantly over the simulation period." 
                        : results[results.length - 1].totalSupply < results[0].totalSupply
                          ? "• Token supply contracts over time, creating deflationary pressure." 
                          : "• Token supply remains relatively stable throughout the simulation."}
                    </p>
                  </div>
                )}

                {/* Related lessons based on parameters and simulation results */}
                <div className="mt-4 text-sm">
                  <p className="font-medium mb-1">Related lessons:</p>
                  <motion.div 
                    className="flex flex-col gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {/* Supply dynamics lessons based on parameters */}
                    {params.inflationRate > 8 && (
                      <div>
                        <a href="/lessons/supply-dynamics#emission-schedules" className="text-blue-600 hover:underline flex items-center">
                          <span>Supply Dynamics - Emission Schedules</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <p className="text-gray-600 text-xs mt-1 ml-4">Learn how high inflation impacts long-term token value</p>
                      </div>
                    )}
                    
                    {params.burnRate > 0 && (
                      <div>
                        <a href="/lessons/supply-dynamics#token-burns" className="text-blue-600 hover:underline flex items-center">
                          <span>Supply Dynamics - Burn Mechanisms</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <p className="text-gray-600 text-xs mt-1 ml-4">Understand how token burning creates deflationary pressure</p>
                      </div>
                    )}
                    
                    {/* Supply dynamics lessons based on simulation results */}
                    {results.length > 0 && results[results.length - 1].totalSupply < results[0].totalSupply && (
                      <div>
                        <a href="/lessons/supply-dynamics#understanding-token-supply-models" className="text-blue-600 hover:underline flex items-center">
                          <span>Supply Dynamics - Deflationary Supply</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <p className="text-gray-600 text-xs mt-1 ml-4">Learn about deflationary tokenomics and their market effects</p>
                      </div>
                    )}
                    
                    {/* Staking mechanism lessons based on parameters */}
                    {params.stakingReward > 10 && (
                      <div>
                        <a href="/lessons/staking-mechanisms#staking-economics" className="text-blue-600 hover:underline flex items-center">
                          <span>Staking Mechanisms - Reward Economics</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <p className="text-gray-600 text-xs mt-1 ml-4">Explore how high staking rewards influence participation and inflation</p>
                      </div>
                    )}
                    
                    {params.lockupPeriod > 60 && (
                      <div>
                        <a href="/lessons/staking-mechanisms#designing-effective-staking-mechanisms" className="text-blue-600 hover:underline flex items-center">
                          <span>Staking Mechanisms - Lockup Effects</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <p className="text-gray-600 text-xs mt-1 ml-4">Understand the tradeoffs between long lockup periods and liquidity</p>
                      </div>
                    )}
                    
                    {/* Staking mechanism lessons based on simulation results */}
                    {results.length > 0 && results[results.length - 1].stakingParticipation > 40 && (
                      <div>
                        <a href="/lessons/staking-mechanisms#staking-and-tokenomics" className="text-blue-600 hover:underline flex items-center">
                          <span>Staking Mechanisms - Supply Impact</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <p className="text-gray-600 text-xs mt-1 ml-4">Learn how high staking participation affects circulating supply</p>
                      </div>
                    )}
                    
                    {/* Governance lessons based on parameters */}
                    {params.governanceThreshold > 0 && (
                      <div>
                        <a href="/lessons/governance#voting-mechanisms" className="text-blue-600 hover:underline flex items-center">
                          <span>Token Governance - Voting Mechanisms</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <p className="text-gray-600 text-xs mt-1 ml-4">Learn about governance thresholds and decision-making models</p>
                      </div>
                    )}
                    
                    {/* Governance lessons based on simulation results */}
                    {results.length > 0 && results[results.length - 1].governanceParticipation > 30 && (
                      <div>
                        <a href="/lessons/governance#daos-decentralized-autonomous-organizations" className="text-blue-600 hover:underline flex items-center">
                          <span>Token Governance - DAO Structures</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <p className="text-gray-600 text-xs mt-1 ml-4">Explore how high governance participation enables decentralized organizations</p>
                      </div>
                    )}
                    
                    {/* Fallback if no specific lessons are shown */}
                    {!results.length && 
                      params.inflationRate <= 8 && 
                      params.burnRate === 0 && 
                      params.stakingReward <= 10 && 
                      params.lockupPeriod <= 60 && 
                      params.governanceThreshold === 0 && (
                      <div>
                        <a href="/lessons/supply-dynamics" className="text-blue-600 hover:underline flex items-center">
                          <span>Supply Dynamics</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <p className="text-gray-600 text-xs mt-1 ml-4">Explore fundamentals of token supply models</p>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Year-by-year breakdown button */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-4"
                >
                  <details className="bg-gray-50 rounded-lg">
                    <summary className="text-sm font-medium text-gray-700 cursor-pointer p-2 hover:bg-gray-100 rounded-lg focus:outline-none">
                      Show year-by-year data breakdown
                    </summary>
                    <div className="mt-2 p-2 overflow-x-auto">
                      <table className="min-w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-2 py-1 text-left">Year</th>
                            <th className="border border-gray-300 px-2 py-1 text-left">Total Supply</th>
                            <th className="border border-gray-300 px-2 py-1 text-left">Circulating</th>
                            <th className="border border-gray-300 px-2 py-1 text-left">Staked</th>
                            <th className="border border-gray-300 px-2 py-1 text-left">Burned</th>
                            <th className="border border-gray-300 px-2 py-1 text-left">Staking %</th>
                            <th className="border border-gray-300 px-2 py-1 text-left">Inflation %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((result, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="border border-gray-300 px-2 py-1">{result.year}</td>
                              <td className="border border-gray-300 px-2 py-1">{result.totalSupply.toLocaleString()}</td>
                              <td className="border border-gray-300 px-2 py-1">{result.circulatingSupply.toLocaleString()}</td>
                              <td className="border border-gray-300 px-2 py-1">{result.stakedSupply.toLocaleString()}</td>
                              <td className="border border-gray-300 px-2 py-1">{result.burnedSupply.toLocaleString()}</td>
                              <td className="border border-gray-300 px-2 py-1">{result.stakingParticipation.toFixed(2)}%</td>
                              <td className="border border-gray-300 px-2 py-1">{result.effectiveInflation.toFixed(2)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}