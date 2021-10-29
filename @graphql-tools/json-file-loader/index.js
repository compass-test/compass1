'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const utils = require('@graphql-tools/utils');
const path = require('path');
const fs = require('fs');
const process = require('process');
const globby = _interopDefault(require('globby'));
const unixify = _interopDefault(require('unixify'));

const { readFile, access } = fs.promises;
const FILE_EXTENSIONS = ['.json'];
function createGlobbyOptions(options) {
    return { absolute: true, ...options, ignore: [] };
}
const buildIgnoreGlob = (path) => `!${path}`;
/**
 * This loader loads documents and type definitions from JSON files.
 *
 * The JSON file can be the result of an introspection query made against a schema:
 *
 * ```js
 * const schema = await loadSchema('schema-introspection.json', {
 *   loaders: [
 *     new JsonFileLoader()
 *   ]
 * });
 * ```
 *
 * Or it can be a `DocumentNode` object representing a GraphQL document or type definitions:
 *
 * ```js
 * const documents = await loadDocuments('queries/*.json', {
 *   loaders: [
 *     new GraphQLFileLoader()
 *   ]
 * });
 * ```
 */
class JsonFileLoader {
    async canLoad(pointer, options) {
        if (utils.isValidPath(pointer)) {
            if (FILE_EXTENSIONS.find(extension => pointer.endsWith(extension))) {
                const normalizedFilePath = path.isAbsolute(pointer) ? pointer : path.resolve(options.cwd || process.cwd(), pointer);
                try {
                    await access(normalizedFilePath);
                    return true;
                }
                catch (_a) {
                    return false;
                }
            }
        }
        return false;
    }
    canLoadSync(pointer, options) {
        if (utils.isValidPath(pointer)) {
            if (FILE_EXTENSIONS.find(extension => pointer.endsWith(extension))) {
                const normalizedFilePath = path.isAbsolute(pointer) ? pointer : path.resolve(options.cwd || process.cwd(), pointer);
                return fs.existsSync(normalizedFilePath);
            }
        }
        return false;
    }
    _buildGlobs(glob, options) {
        const ignores = utils.asArray(options.ignore || []);
        const globs = [unixify(glob), ...ignores.map(v => buildIgnoreGlob(unixify(v)))];
        return globs;
    }
    async resolveGlobs(glob, options) {
        const globs = this._buildGlobs(glob, options);
        const result = await globby(globs, createGlobbyOptions(options));
        return result;
    }
    resolveGlobsSync(glob, options) {
        const globs = this._buildGlobs(glob, options);
        const result = globby.sync(globs, createGlobbyOptions(options));
        return result;
    }
    async load(pointer, options) {
        const resolvedPaths = await this.resolveGlobs(pointer, options);
        const finalResult = [];
        const errors = [];
        await Promise.all(resolvedPaths.map(async (path$1) => {
            if (await this.canLoad(path$1, options)) {
                try {
                    const normalizedFilePath = path.isAbsolute(path$1) ? path$1 : path.resolve(options.cwd || process.cwd(), path$1);
                    const rawSDL = await readFile(normalizedFilePath, { encoding: 'utf8' });
                    finalResult.push(this.handleFileContent(normalizedFilePath, rawSDL, options));
                }
                catch (e) {
                    if (process.env['DEBUG']) {
                        console.error(e);
                    }
                    errors.push(e);
                }
            }
        }));
        if (errors.length > 0 && (options.noSilentErrors || finalResult.length === 0)) {
            if (errors.length === 1) {
                throw errors[0];
            }
            throw new utils.AggregateError(errors);
        }
        return finalResult;
    }
    loadSync(pointer, options) {
        const resolvedPaths = this.resolveGlobsSync(pointer, options);
        const finalResult = [];
        const errors = [];
        for (const path$1 of resolvedPaths) {
            if (this.canLoadSync(path$1, options)) {
                try {
                    const normalizedFilePath = path.isAbsolute(path$1) ? path$1 : path.resolve(options.cwd || process.cwd(), path$1);
                    const rawSDL = fs.readFileSync(normalizedFilePath, { encoding: 'utf8' });
                    finalResult.push(this.handleFileContent(normalizedFilePath, rawSDL, options));
                }
                catch (e) {
                    if (process.env['DEBUG']) {
                        console.error(e);
                    }
                    errors.push(e);
                }
            }
        }
        if (errors.length > 0 && (options.noSilentErrors || finalResult.length === 0)) {
            if (errors.length === 1) {
                throw errors[0];
            }
            throw new utils.AggregateError(errors);
        }
        return finalResult;
    }
    handleFileContent(normalizedFilePath, rawSDL, options) {
        try {
            return utils.parseGraphQLJSON(normalizedFilePath, rawSDL, options);
        }
        catch (e) {
            throw new Error(`Unable to read JSON file: ${normalizedFilePath}: ${e.message || /* istanbul ignore next */ e}`);
        }
    }
}

exports.JsonFileLoader = JsonFileLoader;
