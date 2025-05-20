"use client";

import { useState } from "react";
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

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const runSimulation = () => {
    const simulationResults = simulateTokenomics(params);
    setResults(simulationResults);
    setIsSimulated(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Tokenomics Parameters</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="initialSupply" className="block text-sm font-medium text-gray-700 mb-1">
                Initial Token Supply
              </label>
              <input
                type="number"
                id="initialSupply"
                name="initialSupply"
                value={params.initialSupply}
                onChange={handleParamChange}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            
            <div>
              <label htmlFor="maxSupply" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Token Supply
              </label>
              <input
                type="number"
                id="maxSupply"
                name="maxSupply"
                value={params.maxSupply}
                onChange={handleParamChange}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            
            <div>
              <label htmlFor="inflationRate" className="block text-sm font-medium text-gray-700 mb-1">
                Annual Inflation Rate (%)
              </label>
              <input
                type="number"
                id="inflationRate"
                name="inflationRate"
                value={params.inflationRate}
                onChange={handleParamChange}
                min="0"
                max="100"
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            
            <div>
              <label htmlFor="burnRate" className="block text-sm font-medium text-gray-700 mb-1">
                Annual Burn Rate (%)
              </label>
              <input
                type="number"
                id="burnRate"
                name="burnRate"
                value={params.burnRate}
                onChange={handleParamChange}
                min="0"
                max="100"
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            
            <div>
              <label htmlFor="stakingReward" className="block text-sm font-medium text-gray-700 mb-1">
                Staking Reward APY (%)
              </label>
              <input
                type="number"
                id="stakingReward"
                name="stakingReward"
                value={params.stakingReward}
                onChange={handleParamChange}
                min="0"
                max="100"
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            
            <div>
              <label htmlFor="lockupPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                Staking Lockup Period (days)
              </label>
              <input
                type="number"
                id="lockupPeriod"
                name="lockupPeriod"
                value={params.lockupPeriod}
                onChange={handleParamChange}
                min="0"
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            
            <div>
              <label htmlFor="governanceThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                Governance Proposal Threshold (%)
              </label>
              <input
                type="number"
                id="governanceThreshold"
                name="governanceThreshold"
                value={params.governanceThreshold}
                onChange={handleParamChange}
                min="0"
                max="100"
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            
            <div>
              <label htmlFor="simulationYears" className="block text-sm font-medium text-gray-700 mb-1">
                Simulation Period (years)
              </label>
              <input
                type="number"
                id="simulationYears"
                name="simulationYears"
                value={params.simulationYears}
                onChange={handleParamChange}
                min="1"
                max="50"
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            
            <button
              onClick={runSimulation}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Run Simulation
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Simulation Results</h3>
          
          {!isSimulated ? (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                Adjust parameters and run simulation to see results
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="h-64">
                <h4 className="text-lg font-medium mb-2">Token Supply Over Time</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Supply', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="totalSupply" stroke="#8884d8" name="Total Supply" />
                    <Line type="monotone" dataKey="circulatingSupply" stroke="#82ca9d" name="Circulating Supply" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-64">
                <h4 className="text-lg font-medium mb-2">Staking and Governance Metrics</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="stakingParticipation" stroke="#ff7300" name="Staking %" />
                    <Line type="monotone" dataKey="governanceParticipation" stroke="#0088fe" name="Governance %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Key Insights</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Total supply at end of simulation:</strong>{" "}
                    {results[results.length - 1]?.totalSupply.toLocaleString()}
                  </li>
                  <li>
                    <strong>Circulating supply at end of simulation:</strong>{" "}
                    {results[results.length - 1]?.circulatingSupply.toLocaleString()}
                  </li>
                  <li>
                    <strong>Staking participation at end of simulation:</strong>{" "}
                    {results[results.length - 1]?.stakingParticipation.toFixed(2)}%
                  </li>
                  <li>
                    <strong>Average annual inflation:</strong>{" "}
                    {(results.reduce((acc, curr) => acc + curr.effectiveInflation, 0) / results.length).toFixed(2)}%
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}