import formatDistanceToNow from 'date-fns/formatDistanceToNow';

/**
 * Provides the time of the last build,
 * formatted as a string relative to the current time.
 */
const getLastBuilt = (): string => {
  const lastBuilt = new Date(Number(process.env.NEXT_PUBLIC_LAST_BUILT));
  return formatDistanceToNow(lastBuilt);
};

export default getLastBuilt;
