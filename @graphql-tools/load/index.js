'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const utils = require('@graphql-tools/utils');
const process = require('process');
const graphql = require('graphql');
const pLimit = _interopDefault(require('p-limit'));
const module$1 = require('module');
const path = require('path');
const schema = require('@graphql-tools/schema');

function normalizePointers(unnormalizedPointerOrPointers) {
    const ignore = [];
    const pointerOptionMap = {};
    const handlePointer = (rawPointer, options = {}) => {
        if (rawPointer.startsWith('!')) {
            ignore.push(rawPointer.replace('!', ''));
        }
        else {
            pointerOptionMap[rawPointer] = options;
        }
    };
    for (const rawPointer of utils.asArray(unnormalizedPointerOrPointers)) {
        if (typeof rawPointer === 'string') {
            handlePointer(rawPointer);
        }
        else if (typeof rawPointer === 'object') {
            for (const [path, options] of Object.entries(rawPointer)) {
                handlePointer(path, options);
            }
        }
        else {
            throw new Error(`Invalid pointer '${rawPointer}'.`);
        }
    }
    return { ignore, pointerOptionMap };
}

function applyDefaultOptions(options) {
    options.cache = options.cache || {};
    options.cwd = options.cwd || process.cwd();
    options.sort = 'sort' in options ? options.sort : true;
}

async function loadFile(pointer, options) {
    var _a;
    let results = (_a = options.cache) === null || _a === void 0 ? void 0 : _a[pointer];
    if (!results) {
        results = [];
        const errors = [];
        await Promise.all(options.loaders.map(async (loader) => {
            try {
                const loaderResults = await loader.load(pointer, options);
                loaderResults === null || loaderResults === void 0 ? void 0 : loaderResults.forEach(result => results.push(result));
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
        }));
        if (results.length === 0 && errors.length > 0) {
            if (errors.length === 1) {
                throw errors[0];
            }
            throw new utils.AggregateError(errors, `Failed to find any GraphQL type definitions in: ${pointer};\n - ${errors
                .map(error => error.message)
                .join('\n  - ')}`);
        }
        if (options.cache) {
            options.cache[pointer] = results;
        }
    }
    return results;
}
function loadFileSync(pointer, options) {
    var _a;
    let results = (_a = options.cache) === null || _a === void 0 ? void 0 : _a[pointer];
    if (!results) {
        results = [];
        const errors = [];
        for (const loader of options.loaders) {
            try {
                // We check for the existence so it is okay to force non null
                const loaderResults = loader.loadSync(pointer, options);
                loaderResults === null || loaderResults === void 0 ? void 0 : loaderResults.forEach(result => results.push(result));
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
        }
        if (results.length === 0 && errors.length > 0) {
            if (errors.length === 1) {
                throw errors[0];
            }
            throw new utils.AggregateError(errors, `Failed to find any GraphQL type definitions in: ${pointer};\n - ${errors
                .map(error => error.message)
                .join('\n  - ')}`);
        }
        if (options.cache) {
            options.cache[pointer] = results;
        }
    }
    return results;
}

/**
 * Converts a string to 32bit integer
 */
function stringToHash(str) {
    let hash = 0;
    if (str.length === 0) {
        return hash;
    }
    let char;
    for (let i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        // tslint:disable-next-line: no-bitwise
        hash = (hash << 5) - hash + char;
        // tslint:disable-next-line: no-bitwise
        hash = hash & hash;
    }
    return hash;
}
function useStack(...fns) {
    return (input) => {
        function createNext(i) {
            if (i >= fns.length) {
                return () => { };
            }
            return function next() {
                fns[i](input, createNext(i + 1));
            };
        }
        fns[0](input, createNext(1));
    };
}
function useLimit(concurrency) {
    return pLimit(concurrency);
}

function getCustomLoaderByPath(path$1, cwd) {
    try {
        const requireFn = module$1.createRequire(path.join(cwd, 'noop.js'));
        const requiredModule = requireFn(path$1);
        if (requiredModule) {
            if (requiredModule.default && typeof requiredModule.default === 'function') {
                return requiredModule.default;
            }
            if (typeof requiredModule === 'function') {
                return requiredModule;
            }
        }
    }
    catch (e) { }
    return null;
}
async function useCustomLoader(loaderPointer, cwd) {
    let loader;
    if (typeof loaderPointer === 'string') {
        loader = await getCustomLoaderByPath(loaderPointer, cwd);
    }
    else if (typeof loaderPointer === 'function') {
        loader = loaderPointer;
    }
    if (typeof loader !== 'function') {
        throw new Error(`Failed to load custom loader: ${loaderPointer}`);
    }
    return loader;
}
function useCustomLoaderSync(loaderPointer, cwd) {
    let loader;
    if (typeof loaderPointer === 'string') {
        loader = getCustomLoaderByPath(loaderPointer, cwd);
    }
    else if (typeof loaderPointer === 'function') {
        loader = loaderPointer;
    }
    if (typeof loader !== 'function') {
        throw new Error(`Failed to load custom loader: ${loaderPointer}`);
    }
    return loader;
}

function useQueue(options) {
    const queue = [];
    const limit = (options === null || options === void 0 ? void 0 : options.concurrency) ? pLimit(options.concurrency) : async (fn) => fn();
    return {
        add(fn) {
            queue.push(() => limit(fn));
        },
        runAll() {
            return Promise.all(queue.map(fn => fn()));
        },
    };
}
function useSyncQueue() {
    const queue = [];
    return {
        add(fn) {
            queue.push(fn);
        },
        runAll() {
            for (const fn of queue) {
                fn();
            }
        },
    };
}

const CONCURRENCY_LIMIT = 50;
async function collectSources({ pointerOptionMap, options, }) {
    const sources = [];
    const queue = useQueue({ concurrency: CONCURRENCY_LIMIT });
    const { addSource, collect } = createHelpers({
        sources,
        stack: [collectDocumentString, collectCustomLoader, collectFallback],
    });
    for (const pointer in pointerOptionMap) {
        const pointerOptions = pointerOptionMap[pointer];
        collect({
            pointer,
            pointerOptions,
            pointerOptionMap,
            options,
            addSource,
            queue: queue.add,
        });
    }
    await queue.runAll();
    return sources;
}
function collectSourcesSync({ pointerOptionMap, options, }) {
    const sources = [];
    const queue = useSyncQueue();
    const { addSource, collect } = createHelpers({
        sources,
        stack: [collectDocumentString, collectCustomLoaderSync, collectFallbackSync],
    });
    for (const pointer in pointerOptionMap) {
        const pointerOptions = pointerOptionMap[pointer];
        collect({
            pointer,
            pointerOptions,
            pointerOptionMap,
            options,
            addSource,
            queue: queue.add,
        });
    }
    queue.runAll();
    return sources;
}
function createHelpers({ sources, stack }) {
    const addSource = ({ source }) => {
        sources.push(source);
    };
    const collect = useStack(...stack);
    return {
        addSource,
        collect,
    };
}
function addResultOfCustomLoader({ pointer, result, addSource, }) {
    if (graphql.isSchema(result)) {
        addSource({
            source: {
                location: pointer,
                schema: result,
                document: utils.getDocumentNodeFromSchema(result),
            },
            pointer,
            noCache: true,
        });
    }
    else if (result.kind && result.kind === graphql.Kind.DOCUMENT) {
        addSource({
            source: {
                document: result,
                location: pointer,
            },
            pointer,
        });
    }
    else if (result.document) {
        addSource({
            source: {
                location: pointer,
                ...result,
            },
            pointer,
        });
    }
}
function collectDocumentString({ pointer, pointerOptions, options, addSource, queue }, next) {
    if (utils.isDocumentString(pointer)) {
        return queue(() => {
            const source = utils.parseGraphQLSDL(`${stringToHash(pointer)}.graphql`, pointer, {
                ...options,
                ...pointerOptions,
            });
            addSource({
                source,
                pointer,
            });
        });
    }
    next();
}
function collectCustomLoader({ pointer, pointerOptions, queue, addSource, options, pointerOptionMap }, next) {
    if (pointerOptions.loader) {
        return queue(async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore TODO options.cwd is possibly undefined, but it seems like no test covers this path
            const loader = await useCustomLoader(pointerOptions.loader, options.cwd);
            const result = await loader(pointer, { ...options, ...pointerOptions }, pointerOptionMap);
            if (!result) {
                return;
            }
            addResultOfCustomLoader({ pointer, result, addSource });
        });
    }
    next();
}
function collectCustomLoaderSync({ pointer, pointerOptions, queue, addSource, options, pointerOptionMap }, next) {
    if (pointerOptions.loader) {
        return queue(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore TODO options.cwd is possibly undefined, but it seems like no test covers this path
            const loader = useCustomLoaderSync(pointerOptions.loader, options.cwd);
            const result = loader(pointer, { ...options, ...pointerOptions }, pointerOptionMap);
            if (result) {
                addResultOfCustomLoader({ pointer, result, addSource });
            }
        });
    }
    next();
}
function collectFallback({ queue, pointer, options, pointerOptions, addSource }) {
    return queue(async () => {
        const sources = await loadFile(pointer, {
            ...options,
            ...pointerOptions,
        });
        if (sources) {
            for (const source of sources) {
                addSource({ source, pointer });
            }
        }
    });
}
function collectFallbackSync({ queue, pointer, options, pointerOptions, addSource }) {
    return queue(() => {
        const sources = loadFileSync(pointer, {
            ...options,
            ...pointerOptions,
        });
        if (sources) {
            for (const source of sources) {
                addSource({ source, pointer });
            }
        }
    });
}

/**
 * @internal
 */
const filterKind = (content, filterKinds) => {
    if (content && content.definitions && content.definitions.length && filterKinds && filterKinds.length > 0) {
        const invalidDefinitions = [];
        const validDefinitions = [];
        for (const definitionNode of content.definitions) {
            if (filterKinds.includes(definitionNode.kind)) {
                invalidDefinitions.push(definitionNode);
            }
            else {
                validDefinitions.push(definitionNode);
            }
        }
        if (invalidDefinitions.length > 0) {
            if (process.env['DEBUG']) {
                for (const d of invalidDefinitions) {
                    console.log(`Filtered document of kind ${d.kind} due to filter policy (${filterKinds.join(', ')})`);
                }
            }
        }
        return {
            kind: graphql.Kind.DOCUMENT,
            definitions: validDefinitions,
        };
    }
    return content;
};

function parseSource({ partialSource, options, pointerOptionMap, addValidSource }) {
    if (partialSource) {
        const input = prepareInput({
            source: partialSource,
            options,
            pointerOptionMap,
        });
        parseSchema(input);
        parseRawSDL(input);
        if (input.source.document) {
            useKindsFilter(input);
            useComments(input);
            collectValidSources(input, addValidSource);
        }
    }
}
//
function prepareInput({ source, options, pointerOptionMap, }) {
    let specificOptions = {
        ...options,
    };
    if (source.location) {
        specificOptions = {
            ...specificOptions,
            ...pointerOptionMap[source.location],
        };
    }
    return { source: { ...source }, options: specificOptions };
}
function parseSchema(input) {
    if (input.source.schema) {
        input.source.rawSDL = utils.printSchemaWithDirectives(input.source.schema, input.options);
    }
}
function parseRawSDL(input) {
    if (input.source.rawSDL) {
        input.source.document = utils.parseGraphQLSDL(input.source.location, input.source.rawSDL, input.options).document;
    }
}
function useKindsFilter(input) {
    if (input.options.filterKinds) {
        input.source.document = filterKind(input.source.document, input.options.filterKinds);
    }
}
function useComments(input) {
    if (!input.source.rawSDL && input.source.document) {
        input.source.rawSDL = utils.printWithComments(input.source.document);
        utils.resetComments();
    }
}
function collectValidSources(input, addValidSource) {
    var _a;
    if (((_a = input.source.document) === null || _a === void 0 ? void 0 : _a.definitions) && input.source.document.definitions.length > 0) {
        addValidSource(input.source);
    }
}

const CONCURRENCY_LIMIT$1 = 100;
/**
 * Asynchronously loads any GraphQL documents (i.e. executable documents like
 * operations and fragments as well as type system definitions) from the
 * provided pointers.
 * @param pointerOrPointers Pointers to the sources to load the documents from
 * @param options Additional options
 */
async function loadTypedefs(pointerOrPointers, options) {
    const { ignore, pointerOptionMap } = normalizePointers(pointerOrPointers);
    options.ignore = utils.asArray(options.ignore || []);
    options.ignore.push(...ignore);
    applyDefaultOptions(options);
    const sources = await collectSources({
        pointerOptionMap,
        options,
    });
    const validSources = [];
    // If we have few k of files it may be an issue
    const limit = useLimit(CONCURRENCY_LIMIT$1);
    await Promise.all(sources.map(partialSource => limit(() => parseSource({
        partialSource,
        options,
        pointerOptionMap,
        addValidSource(source) {
            validSources.push(source);
        },
    }))));
    return prepareResult({ options, pointerOptionMap, validSources });
}
/**
 * Synchronously loads any GraphQL documents (i.e. executable documents like
 * operations and fragments as well as type system definitions) from the
 * provided pointers.
 * @param pointerOrPointers Pointers to the sources to load the documents from
 * @param options Additional options
 */
function loadTypedefsSync(pointerOrPointers, options) {
    const { ignore, pointerOptionMap } = normalizePointers(pointerOrPointers);
    options.ignore = utils.asArray(options.ignore || []).concat(ignore);
    applyDefaultOptions(options);
    const sources = collectSourcesSync({
        pointerOptionMap,
        options,
    });
    const validSources = [];
    for (const partialSource of sources) {
        parseSource({
            partialSource,
            options,
            pointerOptionMap,
            addValidSource(source) {
                validSources.push(source);
            },
        });
    }
    return prepareResult({ options, pointerOptionMap, validSources });
}
//
function prepareResult({ options, pointerOptionMap, validSources, }) {
    const pointerList = Object.keys(pointerOptionMap);
    if (pointerList.length > 0 && validSources.length === 0) {
        throw new Error(`
      Unable to find any GraphQL type definitions for the following pointers:
        ${pointerList.map(p => `
          - ${p}
          `)}`);
    }
    return options.sort
        ? validSources.sort((left, right) => utils.compareStrings(left.location, right.location))
        : validSources;
}

/**
 * Kinds of AST nodes that are included in executable documents
 */
const OPERATION_KINDS = [graphql.Kind.OPERATION_DEFINITION, graphql.Kind.FRAGMENT_DEFINITION];
/**
 * Kinds of AST nodes that are included in type system definition documents
 */
const NON_OPERATION_KINDS = Object.keys(graphql.Kind)
    .reduce((prev, v) => [...prev, graphql.Kind[v]], [])
    .filter(v => !OPERATION_KINDS.includes(v));
/**
 * Asynchronously loads executable documents (i.e. operations and fragments) from
 * the provided pointers. The pointers may be individual files or a glob pattern.
 * The files themselves may be `.graphql` files or `.js` and `.ts` (in which
 * case they will be parsed using graphql-tag-pluck).
 * @param pointerOrPointers Pointers to the files to load the documents from
 * @param options Additional options
 */
function loadDocuments(pointerOrPointers, options) {
    return loadTypedefs(pointerOrPointers, { noRequire: true, filterKinds: NON_OPERATION_KINDS, ...options });
}
/**
 * Synchronously loads executable documents (i.e. operations and fragments) from
 * the provided pointers. The pointers may be individual files or a glob pattern.
 * The files themselves may be `.graphql` files or `.js` and `.ts` (in which
 * case they will be parsed using graphql-tag-pluck).
 * @param pointerOrPointers Pointers to the files to load the documents from
 * @param options Additional options
 */
function loadDocumentsSync(pointerOrPointers, options) {
    return loadTypedefsSync(pointerOrPointers, { noRequire: true, filterKinds: NON_OPERATION_KINDS, ...options });
}

/**
 * Asynchronously loads a schema from the provided pointers.
 * @param schemaPointers Pointers to the sources to load the schema from
 * @param options Additional options
 */
async function loadSchema(schemaPointers, options) {
    var _a;
    const sources = await loadTypedefs(schemaPointers, {
        ...options,
        filterKinds: OPERATION_KINDS,
    });
    const { schemas, typeDefs } = collectSchemasAndTypeDefs(sources);
    const mergeSchemasOptions = {
        ...options,
        schemas: schemas.concat((_a = options.schemas) !== null && _a !== void 0 ? _a : []),
        typeDefs,
    };
    const schema$1 = schema.mergeSchemas(mergeSchemasOptions);
    if (options === null || options === void 0 ? void 0 : options.includeSources) {
        includeSources(schema$1, sources);
    }
    return options.sort ? graphql.lexicographicSortSchema(schema$1) : schema$1;
}
/**
 * Synchronously loads a schema from the provided pointers.
 * @param schemaPointers Pointers to the sources to load the schema from
 * @param options Additional options
 */
function loadSchemaSync(schemaPointers, options) {
    const sources = loadTypedefsSync(schemaPointers, {
        filterKinds: OPERATION_KINDS,
        ...options,
    });
    const { schemas, typeDefs } = collectSchemasAndTypeDefs(sources);
    const schema$1 = schema.mergeSchemas({
        schemas,
        typeDefs,
        ...options,
    });
    if (options === null || options === void 0 ? void 0 : options.includeSources) {
        includeSources(schema$1, sources);
    }
    return options.sort ? graphql.lexicographicSortSchema(schema$1) : schema$1;
}
function includeSources(schema, sources) {
    const finalSources = [];
    for (const source of sources) {
        if (source.rawSDL) {
            finalSources.push(new graphql.Source(source.rawSDL, source.location));
        }
        else if (source.document) {
            finalSources.push(new graphql.Source(graphql.print(source.document), source.location));
        }
    }
    schema.extensions = {
        ...schema.extensions,
        sources: finalSources,
        extendedSources: sources,
    };
}
function collectSchemasAndTypeDefs(sources) {
    const schemas = [];
    const typeDefs = [];
    for (const source of sources) {
        if (source.schema) {
            schemas.push(source.schema);
        }
        else if (source.document) {
            typeDefs.push(source.document);
        }
    }
    return {
        schemas,
        typeDefs,
    };
}

exports.NON_OPERATION_KINDS = NON_OPERATION_KINDS;
exports.OPERATION_KINDS = OPERATION_KINDS;
exports.filterKind = filterKind;
exports.loadDocuments = loadDocuments;
exports.loadDocumentsSync = loadDocumentsSync;
exports.loadSchema = loadSchema;
exports.loadSchemaSync = loadSchemaSync;
exports.loadTypedefs = loadTypedefs;
exports.loadTypedefsSync = loadTypedefsSync;
