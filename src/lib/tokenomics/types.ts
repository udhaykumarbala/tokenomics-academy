export interface TokenomicsParams {
  initialSupply: number;
  maxSupply: number;
  inflationRate: number;
  burnRate: number;
  stakingReward: number;
  lockupPeriod: number;
  governanceThreshold: number;
  simulationYears: number;
}

export interface SimulationResult {
  year: number;
  totalSupply: number;
  circulatingSupply: number;
  stakedSupply: number;
  burnedSupply: number;
  effectiveInflation: number;
  stakingParticipation: number;
  governanceParticipation: number;
}