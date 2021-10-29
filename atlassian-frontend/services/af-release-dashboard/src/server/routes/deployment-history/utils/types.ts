export type PrSummary = { commit: string; timestamp: string; date: Date };

export type PullRequestsMetadata = {
  latestPr: PrSummary;
  deployedPr: PrSummary;
  prAfterDeployed?: PrSummary;
  numPrsBehind: number;
};
