/**
 * Utility to either retrieve a value from a cache object or, if this value doesn't exist in the cache, create it.
 */

const getFromCache = (cache, key, creator) => {
  if (key in cache) {
    return cache[key];
  }

  const value = creator(key);
  // eslint-disable-next-line no-param-reassign
  cache[key] = value;
  return value;
};

module.exports = { getFromCache };
