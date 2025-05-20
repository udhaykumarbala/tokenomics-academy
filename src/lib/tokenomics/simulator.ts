import { TokenomicsParams, SimulationResult } from './types';

/**
 * Simulates tokenomics based on provided parameters
 * @param params Tokenomics parameters
 * @returns Array of simulation results for each year
 */
export function simulateTokenomics(params: TokenomicsParams): SimulationResult[] {
  const {
    initialSupply,
    maxSupply,
    inflationRate,
    burnRate,
    stakingReward,
    lockupPeriod,
    governanceThreshold,
    simulationYears
  } = params;

  const results: SimulationResult[] = [];
  
  // Initialize simulation state
  let totalSupply = initialSupply;
  let circulatingSupply = initialSupply * 0.2; // Assuming 20% is in circulation at start
  let stakedSupply = initialSupply * 0.05; // Assuming 5% is staked at start
  let burnedSupply = 0;
  
  // Run simulation for each year
  for (let year = 0; year <= simulationYears; year++) {
    // Calculate staking participation (as percentage of circulating supply)
    const stakingParticipation = (stakedSupply / circulatingSupply) * 100;
    
    // Calculate governance participation (simplified model)
    // Assuming governance participation is correlated with staking but has a threshold
    const governanceParticipation = stakingParticipation * 
      (stakingParticipation >= governanceThreshold ? 0.8 : 0.3);
    
    // Record current state
    results.push({
      year,
      totalSupply,
      circulatingSupply,
      stakedSupply,
      burnedSupply,
      effectiveInflation: 0, // Will calculate after we know the new supply
      stakingParticipation,
      governanceParticipation
    });
    
    if (year === simulationYears) break;
    
    // Calculate new tokens from inflation (but respect max supply)
    const newTokens = Math.min(
      totalSupply * (inflationRate / 100),
      maxSupply - totalSupply
    );
    
    // Apply token burning
    const tokensToBurn = circulatingSupply * (burnRate / 100);
    burnedSupply += tokensToBurn;
    
    // Update supply figures
    totalSupply = totalSupply + newTokens - tokensToBurn;
    
    // Calculate staking rewards
    const stakingRewards = stakedSupply * (stakingReward / 100);
    
    // Update circulating supply (vesting, rewards, etc.)
    // Simple model: 10% of non-circulating supply vests each year
    const newlyVestedTokens = (totalSupply - circulatingSupply - stakedSupply) * 0.1;
    
    circulatingSupply = circulatingSupply + newlyVestedTokens + newTokens - tokensToBurn;
    
    // Update staked supply (considering rewards and a model for stake/unstake behavior)
    // Simplified model: staking increases proportionally to rewards and decreases with longer lockup
    const lockupFactor = 1 / (1 + lockupPeriod / 365); // Higher lockup period = lower staking growth
    const stakingGrowthRate = stakingReward / 100 - lockupFactor / 10;
    
    stakedSupply = stakedSupply * (1 + stakingGrowthRate) + stakingRewards;
    
    // Ensure staked supply doesn't exceed circulating supply
    stakedSupply = Math.min(stakedSupply, circulatingSupply * 0.8); // Assume max 80% can be staked
    
    // Calculate effective inflation for the year
    results[year].effectiveInflation = ((totalSupply - results[year].totalSupply) / results[year].totalSupply) * 100;
  }
  
  return results;
}