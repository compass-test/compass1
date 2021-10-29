export const GUARANTEED = 'guaranteed';
export const MAYBE = 'maybe';
export const NONE = 'none';
export type ProbabilityOfBug = typeof GUARANTEED | typeof MAYBE | typeof NONE;
