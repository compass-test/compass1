const Cache = require('node-cache');

const CACHE_TTL = process.env.TECHSTACK_CACHE_TTL || 1200; // Cache Time To Live in seconds

const cacheConfig = {
  stdTTL: CACHE_TTL,
  checkperiod: 0,
  useClones: false,
};

const techStackCache = new Cache(cacheConfig);

module.exports = techStackCache;
