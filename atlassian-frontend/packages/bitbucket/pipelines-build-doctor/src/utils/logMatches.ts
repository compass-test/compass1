const logMatches = (log: string, pattern: string): boolean => {
  const matcher = log.match(new RegExp(pattern));
  return !!(pattern && matcher !== null && matcher.length !== 0);
};

export default logMatches;
