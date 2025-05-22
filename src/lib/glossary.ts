/**
 * Glossary of key tokenomics terms with definitions
 */
export interface GlossaryTerm {
  term: string;
  definition: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Tokenomics",
    definition: "The economics of a cryptocurrency or token, encompassing aspects like creation, distribution, supply mechanisms, and utility."
  },
  {
    term: "Initial Supply",
    definition: "The amount of tokens available at launch of a cryptocurrency or token project."
  },
  {
    term: "Maximum Supply",
    definition: "The maximum amount of tokens that will ever exist in a cryptocurrency ecosystem (if capped)."
  },
  {
    term: "Circulating Supply",
    definition: "The number of tokens currently in public circulation and available for trading."
  },
  {
    term: "Token Distribution",
    definition: "How tokens are allocated and distributed among stakeholders, including team, investors, and community."
  },
  {
    term: "Governance",
    definition: "The system that enables token holders to participate in decision-making processes for a protocol or platform."
  },
  {
    term: "Staking",
    definition: "Locking tokens to secure the network and earn rewards, often used to ensure network integrity."
  },
  {
    term: "DAO",
    definition: "Decentralized Autonomous Organization - an organization governed by rules encoded as computer programs and controlled by token holders."
  },
  {
    term: "Vetoken Model",
    definition: "Vote Escrow token model where tokens locked for governance gain multiplied voting power based on lock duration."
  },
  {
    term: "Bonding Curve",
    definition: "A mathematical formula that defines the relationship between a token's price and its supply."
  },
  {
    term: "Seigniorage",
    definition: "The profit made by a protocol from issuing a currency, particularly in algorithmic stablecoin systems."
  },
  {
    term: "Token Utility",
    definition: "The various use cases and functions of a token within its ecosystem."
  },
  {
    term: "Inflation",
    definition: "The rate at which new tokens are created and added to the circulating supply."
  },
  {
    term: "Burning",
    definition: "The process of permanently removing tokens from circulation, often to create deflationary pressure."
  },
  {
    term: "Liquidity Mining",
    definition: "A mechanism where users provide liquidity to a protocol and receive token rewards in return."
  }
];

/**
 * Returns a glossary term if it exists in the glossary
 */
export function getGlossaryTerm(term: string): GlossaryTerm | undefined {
  return glossaryTerms.find(
    (glossaryTerm) => 
      glossaryTerm.term.toLowerCase() === term.toLowerCase()
  );
}

/**
 * Returns all glossary terms sorted alphabetically
 */
export function getAllGlossaryTerms(): GlossaryTerm[] {
  return [...glossaryTerms].sort((a, b) => 
    a.term.localeCompare(b.term)
  );
}