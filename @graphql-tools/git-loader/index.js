'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const graphqlTagPluck = require('@graphql-tools/graphql-tag-pluck');
const micromatch = _interopDefault(require('micromatch'));
const unixify = _interopDefault(require('unixify'));
const child_process = require('child_process');
const os = _interopDefault(require('os'));
const utils = require('@graphql-tools/utils');
const graphql = require('graphql');
const isGlob = _interopDefault(require('is-glob'));
const process = require('process');

const createLoadError = (error) => new Error('Unable to load file from git: ' + error);
const createShowCommand = ({ ref, path }) => {
    return ['show', `${ref}:${path}`];
};
const createTreeError = (error) => new Error('Unable to load the file tree from git: ' + error);
const createTreeCommand = ({ ref }) => {
    return ['ls-tree', '-r', '--name-only', ref];
};
/**
 * @internal
 */
async function readTreeAtRef(ref) {
    try {
        return await new Promise((resolve, reject) => {
            child_process.execFile('git', createTreeCommand({ ref }), { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 1024 }, (error, stdout) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(stdout.split(os.EOL).map(line => line.trim()));
                }
            });
        });
    }
    catch (error) {
        throw createTreeError(error);
    }
}
/**
 * @internal
 */
function readTreeAtRefSync(ref) {
    try {
        return child_process.execFileSync('git', createTreeCommand({ ref }), { encoding: 'utf-8' })
            .split(os.EOL)
            .map(line => line.trim());
    }
    catch (error) {
        throw createTreeError(error);
    }
}
/**
 * @internal
 */
async function loadFromGit(input) {
    try {
        return await new Promise((resolve, reject) => {
            child_process.execFile('git', createShowCommand(input), { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 1024 }, (error, stdout) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(stdout);
                }
            });
        });
    }
    catch (error) {
        throw createLoadError(error);
    }
}
/**
 * @internal
 */
function loadFromGitSync(input) {
    try {
        return child_process.execFileSync('git', createShowCommand(input), { encoding: 'utf-8' });
    }
    catch (error) {
        throw createLoadError(error);
    }
}

/**
 * @internal
 */
function parse({ path, pointer, content, options, }) {
    if (/\.(gql|graphql)s?$/i.test(path)) {
        return utils.parseGraphQLSDL(pointer, content, options);
    }
    if (/\.json$/i.test(path)) {
        return utils.parseGraphQLJSON(pointer, content, options);
    }
}

// git:branch:path/to/file
function extractData(pointer) {
    const parts = pointer.replace(/^git\:/i, '').split(':');
    if (!parts || parts.length !== 2) {
        return null;
    }
    return {
        ref: parts[0],
        path: parts[1],
    };
}
/**
 * This loader loads a file from git.
 *
 * ```js
 * const typeDefs = await loadTypedefs('git:someBranch:some/path/to/file.js', {
 *   loaders: [new GitLoader()],
 * })
 * ```
 */
class GitLoader {
    async canLoad(pointer) {
        return this.canLoadSync(pointer);
    }
    canLoadSync(pointer) {
        return typeof pointer === 'string' && pointer.toLowerCase().startsWith('git:');
    }
    async resolveGlobs(glob, ignores) {
        const data = extractData(glob);
        if (data === null) {
            return [];
        }
        const refsForPaths = new Map();
        const { ref, path } = data;
        if (!refsForPaths.has(ref)) {
            refsForPaths.set(ref, []);
        }
        refsForPaths.get(ref).push(unixify(path));
        for (const ignore of ignores) {
            const data = extractData(ignore);
            if (data === null) {
                continue;
            }
            const { ref, path } = data;
            if (!refsForPaths.has(ref)) {
                refsForPaths.set(ref, []);
            }
            refsForPaths.get(ref).push(`!${unixify(path)}`);
        }
        const resolved = [];
        await Promise.all([...refsForPaths.entries()].map(async ([ref, paths]) => {
            resolved.push(...micromatch(await readTreeAtRef(ref), paths).map(filePath => `git:${ref}:${filePath}`));
        }));
        return resolved;
    }
    resolveGlobsSync(glob, ignores) {
        const data = extractData(glob);
        if (data === null) {
            return [];
        }
        const { ref, path } = data;
        const refsForPaths = new Map();
        if (!refsForPaths.has(ref)) {
            refsForPaths.set(ref, []);
        }
        refsForPaths.get(ref).push(unixify(path));
        for (const ignore of ignores) {
            const data = extractData(ignore);
            if (data === null) {
                continue;
            }
            const { ref, path } = data;
            if (!refsForPaths.has(ref)) {
                refsForPaths.set(ref, []);
            }
            refsForPaths.get(ref).push(`!${unixify(path)}`);
        }
        const resolved = [];
        for (const [ref, paths] of refsForPaths.entries()) {
            resolved.push(...micromatch(readTreeAtRefSync(ref), paths).map(filePath => `git:${ref}:${filePath}`));
        }
        return resolved;
    }
    async handleSingularPointerAsync(pointer, options) {
        const result = extractData(pointer);
        if (result === null) {
            return [];
        }
        const { ref, path } = result;
        const content = await loadFromGit({ ref, path });
        const parsed = parse({ path, options, pointer, content });
        if (parsed) {
            return [parsed];
        }
        const sources = await graphqlTagPluck.gqlPluckFromCodeString(pointer, content, options.pluckConfig);
        return sources.map(source => ({
            location: pointer,
            document: graphql.parse(source, options),
        }));
    }
    async load(pointer, options) {
        const result = extractData(pointer);
        if (result === null) {
            return [];
        }
        const { path } = result;
        const finalResult = [];
        const errors = [];
        try {
            if (isGlob(path)) {
                const resolvedPaths = await this.resolveGlobs(pointer, utils.asArray(options.ignore || []));
                await Promise.all(resolvedPaths.map(async (path) => {
                    const results = await this.load(path, options);
                    results === null || results === void 0 ? void 0 : results.forEach(result => finalResult.push(result));
                }));
            }
            else if (await this.canLoad(pointer)) {
                const results = await this.handleSingularPointerAsync(pointer, options);
                results === null || results === void 0 ? void 0 : results.forEach(result => finalResult.push(result));
            }
        }
        catch (error) {
            if (process.env['DEBUG']) {
                console.error(error);
            }
            if (error instanceof utils.AggregateError) {
                for (const errorElement of error.errors) {
                    errors.push(errorElement);
                }
            }
            else {
                errors.push(error);
            }
        }
        if (finalResult.length === 0 && errors.length > 0) {
            if (errors.length === 1) {
                throw errors[0];
            }
            throw new utils.AggregateError(errors);
        }
        return finalResult;
    }
    handleSingularPointerSync(pointer, options) {
        const result = extractData(pointer);
        if (result === null) {
            return [];
        }
        const { ref, path } = result;
        const content = loadFromGitSync({ ref, path });
        const parsed = parse({ path, options, pointer, content });
        if (parsed) {
            return [parsed];
        }
        const sources = graphqlTagPluck.gqlPluckFromCodeStringSync(pointer, content, options.pluckConfig);
        return sources.map(source => ({
            location: pointer,
            document: graphql.parse(source, options),
        }));
    }
    loadSync(pointer, options) {
        const result = extractData(pointer);
        if (result === null) {
            return [];
        }
        const { path } = result;
        const finalResult = [];
        const errors = [];
        try {
            if (isGlob(path)) {
                const resolvedPaths = this.resolveGlobsSync(pointer, utils.asArray(options.ignore || []));
                const finalResult = [];
                for (const path of resolvedPaths) {
                    if (this.canLoadSync(path)) {
                        const results = this.loadSync(path, options);
                        for (const result of results) {
                            finalResult.push(result);
                        }
                    }
                }
            }
            else if (this.canLoadSync(pointer)) {
                const results = this.handleSingularPointerSync(pointer, options);
                for (const result of results) {
                    finalResult.push(result);
                }
            }
        }
        catch (error) {
            if (process.env['DEBUG']) {
                console.error(error);
            }
            if (error instanceof utils.AggregateError) {
                for (const errorElement of error.errors) {
                    errors.push(errorElement);
                }
            }
            else {
                errors.push(error);
            }
        }
        if (finalResult.length === 0 && errors.length > 0) {
            if (errors.length === 1) {
                throw errors[0];
            }
            throw new utils.AggregateError(errors);
        }
        return finalResult;
    }
}

exports.GitLoader = GitLoader;
