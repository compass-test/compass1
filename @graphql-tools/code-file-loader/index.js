'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
    if (e && e.__esModule) { return e; } else {
        var n = {};
        if (e) {
            Object.keys(e).forEach(function (k) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            });
        }
        n['default'] = e;
        return n;
    }
}

const graphql = require('graphql');
const utils = require('@graphql-tools/utils');
const graphqlTagPluck = require('@graphql-tools/graphql-tag-pluck');
const globby = _interopDefault(require('globby'));
const unixify = _interopDefault(require('unixify'));
const path = require('path');
const process = require('process');
const fs = require('fs');
const module$1 = require('module');

/**
 * @internal
 */
function pick(obj, keys) {
    for (const key of keys) {
        if (obj[key]) {
            return obj[key];
        }
    }
    return obj;
}
// checkers
/**
 * @internal
 */
function isSchemaText(obj) {
    return typeof obj === 'string';
}
/**
 * @internal
 */
function isWrappedSchemaJson(obj) {
    const json = obj;
    return json.data !== undefined && json.data.__schema !== undefined;
}
/**
 * @internal
 */
function isSchemaJson(obj) {
    const json = obj;
    return json !== undefined && json.__schema !== undefined;
}
/**
 * @internal
 */
function isSchemaAst(obj) {
    return obj.kind !== undefined;
}

const identifiersToLookFor = ['default', 'schema', 'typeDefs', 'data'];
// Pick exports
/**
 * @internal
 */
function pickExportFromModule({ module, filepath }) {
    ensureModule({ module, filepath });
    return resolveModule(ensureExports({ module, filepath }));
}
/**
 * @internal
 */
function pickExportFromModuleSync({ module, filepath }) {
    ensureModule({ module, filepath });
    return resolveModuleSync(ensureExports({ module, filepath }));
}
// module
async function resolveModule(identifiers) {
    const exportValue = await pick(await identifiers, identifiersToLookFor);
    return resolveExport(exportValue);
}
function resolveModuleSync(identifiers) {
    const exportValue = pick(identifiers, identifiersToLookFor);
    return resolveExport(exportValue);
}
// validate
function ensureModule({ module, filepath }) {
    if (!module) {
        throw new Error(`Invalid export from export file ${filepath}: empty export!`);
    }
}
function ensureExports({ module, filepath }) {
    const identifiers = pick(module, identifiersToLookFor);
    if (!identifiers) {
        throw new Error(`Invalid export from export file ${filepath}: missing default export or 'schema' export!`);
    }
    return identifiers;
}
// Decide what to do with an exported value
function resolveExport(fileExport) {
    try {
        if (graphql.isSchema(fileExport)) {
            return fileExport;
        }
        if (isSchemaText(fileExport)) {
            return graphql.parse(fileExport);
        }
        if (isWrappedSchemaJson(fileExport)) {
            return graphql.buildClientSchema(fileExport.data);
        }
        if (isSchemaJson(fileExport)) {
            return graphql.buildClientSchema(fileExport);
        }
        if (isSchemaAst(fileExport)) {
            return fileExport;
        }
        return null;
    }
    catch (e) {
        throw new Error('Exported schema must be of type GraphQLSchema, text, AST, or introspection JSON.');
    }
}

/**
 * @internal
 */
async function tryToLoadFromExport(rawFilePath) {
    try {
        const filepath = ensureFilepath(rawFilePath);
        const mod = await new Promise(function (resolve) { resolve(_interopNamespace(require(filepath))); });
        return await pickExportFromModule({ module: mod, filepath });
    }
    catch (e) {
        throw new Error(`Unable to load from file "${rawFilePath}": ${e.message}`);
    }
}
/**
 * @internal
 */
function tryToLoadFromExportSync(rawFilePath) {
    try {
        const filepath = ensureFilepath(rawFilePath);
        const mod = require(filepath);
        return pickExportFromModuleSync({ module: mod, filepath });
    }
    catch (e) {
        throw new Error(`Unable to load from file "${rawFilePath}": ${e.message}`);
    }
}
/**
 * @internal
 */
function ensureFilepath(filepath) {
    if (typeof require !== 'undefined' && require.cache) {
        filepath = require.resolve(filepath);
        if (require.cache[filepath]) {
            delete require.cache[filepath];
        }
    }
    return filepath;
}

const { readFile, access } = fs.promises;
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.vue'];
function createGlobbyOptions(options) {
    return { absolute: true, ...options, ignore: [] };
}
const buildIgnoreGlob = (path) => `!${path}`;
/**
 * This loader loads GraphQL documents and type definitions from code files
 * using `graphql-tag-pluck`.
 *
 * ```js
 * const documents = await loadDocuments('queries/*.js', {
 *   loaders: [
 *     new CodeFileLoader()
 *   ]
 * });
 * ```
 *
 * Supported extensions include: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`
 */
class CodeFileLoader {
    constructor(config) {
        this.config = config !== null && config !== void 0 ? config : {};
    }
    getMergedOptions(options) {
        return { ...this.config, ...options };
    }
    async canLoad(pointer, options) {
        options = this.getMergedOptions(options);
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
        options = this.getMergedOptions(options);
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
        options = this.getMergedOptions(options);
        const globs = this._buildGlobs(glob, options);
        return globby(globs, createGlobbyOptions(options));
    }
    resolveGlobsSync(glob, options) {
        options = this.getMergedOptions(options);
        const globs = this._buildGlobs(glob, options);
        return globby.sync(globs, createGlobbyOptions(options));
    }
    async load(pointer, options) {
        options = this.getMergedOptions(options);
        const resolvedPaths = await this.resolveGlobs(pointer, options);
        const finalResult = [];
        const errors = [];
        await Promise.all(resolvedPaths.map(async (path) => {
            try {
                const result = await this.handleSinglePath(path, options);
                result === null || result === void 0 ? void 0 : result.forEach(result => finalResult.push(result));
            }
            catch (e) {
                if (process.env['DEBUG']) {
                    console.error(e);
                }
                errors.push(e);
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
        options = this.getMergedOptions(options);
        const resolvedPaths = this.resolveGlobsSync(pointer, options);
        const finalResult = [];
        const errors = [];
        for (const path of resolvedPaths) {
            if (this.canLoadSync(path, options)) {
                try {
                    const result = this.handleSinglePathSync(path, options);
                    result === null || result === void 0 ? void 0 : result.forEach(result => finalResult.push(result));
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
    async handleSinglePath(location, options) {
        if (!(await this.canLoad(location, options))) {
            return [];
        }
        options = this.getMergedOptions(options);
        const normalizedFilePath = ensureAbsolutePath(location, options);
        const errors = [];
        if (!options.noPluck) {
            try {
                const content = await readFile(normalizedFilePath, { encoding: 'utf-8' });
                const sources = await graphqlTagPluck.gqlPluckFromCodeString(normalizedFilePath, content, options.pluckConfig);
                if (sources.length) {
                    return sources.map(source => ({
                        rawSDL: source.body,
                        document: graphql.parse(source),
                        location,
                    }));
                }
            }
            catch (e) {
                if (process.env['DEBUG']) {
                    console.error(`Failed to load schema from code file "${normalizedFilePath}": ${e.message}`);
                }
                errors.push(e);
            }
        }
        if (!options.noRequire) {
            try {
                if (options && options.require) {
                    await Promise.all(utils.asArray(options.require).map(m => new Promise(function (resolve) { resolve(_interopNamespace(require(m))); })));
                }
                const loaded = await tryToLoadFromExport(normalizedFilePath);
                const sources = utils.asArray(loaded)
                    .map(value => resolveSource(location, value, options))
                    .filter(Boolean);
                if (sources.length) {
                    return sources;
                }
            }
            catch (e) {
                errors.push(e);
            }
        }
        if (errors.length > 0) {
            throw errors[0];
        }
        return [];
    }
    handleSinglePathSync(location, options) {
        if (!this.canLoadSync(location, options)) {
            return [];
        }
        options = this.getMergedOptions(options);
        const normalizedFilePath = ensureAbsolutePath(location, options);
        const errors = [];
        if (!options.noPluck) {
            try {
                const content = fs.readFileSync(normalizedFilePath, { encoding: 'utf-8' });
                const sources = graphqlTagPluck.gqlPluckFromCodeStringSync(normalizedFilePath, content, options.pluckConfig);
                if (sources.length) {
                    return sources.map(source => ({
                        rawSDL: source.body,
                        document: graphql.parse(source),
                        location,
                    }));
                }
            }
            catch (e) {
                if (process.env['DEBUG']) {
                    console.error(`Failed to load schema from code file "${normalizedFilePath}": ${e.message}`);
                }
                errors.push(e);
            }
        }
        if (!options.noRequire) {
            try {
                if (options && options.require) {
                    const cwdRequire = module$1.createRequire(options.cwd || process.cwd());
                    for (const m of utils.asArray(options.require)) {
                        cwdRequire(m);
                    }
                }
                const loaded = tryToLoadFromExportSync(normalizedFilePath);
                const sources = utils.asArray(loaded)
                    .map(value => resolveSource(location, value, options))
                    .filter(Boolean);
                if (sources.length) {
                    return sources;
                }
            }
            catch (e) {
                errors.push(e);
            }
        }
        if (errors.length > 0) {
            throw errors[0];
        }
        return null;
    }
}
function resolveSource(pointer, value, options) {
    if (typeof value === 'string') {
        return utils.parseGraphQLSDL(pointer, value, options);
    }
    else if (graphql.isSchema(value)) {
        return {
            location: pointer,
            schema: value,
        };
    }
    else if (utils.isDocumentNode(value)) {
        return {
            location: pointer,
            document: value,
        };
    }
    return null;
}
function ensureAbsolutePath(pointer, options) {
    return path.isAbsolute(pointer) ? pointer : path.resolve(options.cwd || process.cwd(), pointer);
}

exports.CodeFileLoader = CodeFileLoader;
