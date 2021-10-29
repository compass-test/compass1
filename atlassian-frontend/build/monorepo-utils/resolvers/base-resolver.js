/**
 * Base resolver, used by tool-specific resolvers.
 * This is used to make sure that packages resolve using the same algorithm as our webpack config
 *  (checking for "atlaskit:src", etc) meaning that we dont need the old root index.js hack anymore
 */
const fs = require('fs');
const path = require('path');
const resolveFrom = require('resolve-from');
const enhancedResolve = require('enhanced-resolve');
const json5 = require('json5');

const readUnstrictJSON = file => json5.parse(fs.readFileSync(file, 'UTF-8'));

const BASE_DIR = path.resolve(__dirname, '..', '..', '..');
const entryPoints = readUnstrictJSON(
  require.resolve(path.join(BASE_DIR, 'tsconfig.entry-points.json')),
).compilerOptions.paths;

const requireCache = new Map();

const cached = (key, fn) => {
  if (requireCache.has(key)) {
    return requireCache.get(key);
  }
  const result = fn();
  requireCache.set(key, result);
  return result;
};

// This is the resolver used by webpack, which we configure similarly
// to AK website (see ./website/webpack.config.js - "resolve" field)
const wpResolver = enhancedResolve.ResolverFactory.createResolver({
  fileSystem: new enhancedResolve.CachedInputFileSystem(fs, 4000),
  useSyncFileSystemCalls: true,
  mainFields: ['atlaskit:src', 'browser', 'main'],
  extensions: ['.js', '.ts', '.tsx', '.json', '.d.ts'],
});

const resolveModule = (basePath, module) =>
  cached(`m:${basePath}/${module}`, () => {
    try {
      return wpResolver.resolveSync({}, basePath, module);
    } catch (e) {
      return undefined;
    }
  });

const followSymLink = file =>
  // Dereference symlinks to ensure we don't create a separate
  // module instance depending on how it was referenced.
  // @link https://github.com/facebook/jest/pull/4761
  fs.realpathSync(file);

const resolveRelative = (modulePath /*: string */, opts /*: Object */) => {
  // If resolving relative paths, make sure we use resolveFrom and not resolve
  if (modulePath.startsWith('.') || modulePath.startsWith(path.sep)) {
    return cached(`r:${opts.basedir}/${modulePath}`, () => {
      try {
        // resolveFrom could not "see" .ts/.tsx files
        // the only registered extensions are `.js`, `.json` and `.node`
        return resolveFrom(opts.basedir, modulePath);
      } catch (e) {
        return undefined;
      }
    });
  }
  return undefined;
};

const resolveNamedEntry = (modulePath /*: string */) => {
  const entryPoint = entryPoints[modulePath];
  if (entryPoint) {
    /**
     * Depends on entry points as written by file://./../multi-entry-tools/src/cli/get-tsconfig-paths.ts#L43
     */
    return resolveModule(BASE_DIR, entryPoint[0]);
  }
  return undefined;
};

const resolveAbsolute = (modulePath /*: string */, opts /*: Object */) =>
  resolveModule(opts.basedir, modulePath);

/**
 * @typedef {Object} Opts - resolver options
 * @property {string} basedir - The base directory of the file importing modulePath
 */
/**
 * Base resolver
 *
 * @param {string} modulePath - The module path to be resolved
 * @param {Opts} opts - Resolver options
 */
module.exports = function resolver(
  modulePath /*: string */,
  opts /*: Object */,
) {
  return (
    resolveRelative(modulePath, opts) ||
    resolveNamedEntry(modulePath, opts) ||
    followSymLink(resolveAbsolute(modulePath, opts))
  );
};
