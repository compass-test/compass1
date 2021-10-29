"use strict";
/**
 *
 * handler
 *
 */
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncGenerator = exports.createHandler = void 0;
const graphql_1 = require("graphql");
const utils_1 = require("./utils");
/**
 * Makes a Protocol complient HTTP GraphQL server  handler. The handler can
 * be used with your favourite server library.
 *
 * Read more about the Protocol in the PROTOCOL.md documentation file.
 *
 * @category Server
 */
function createHandler(options) {
    const { schema, context, validate = graphql_1.validate, execute = graphql_1.execute, subscribe = graphql_1.subscribe, authenticate = function extractOrCreateStreamToken(req) {
        var _a;
        const headerToken = req.headers['x-graphql-event-stream-token'] ||
            req.headers['x-graphql-stream-token']; // @deprecated >v1.0.0
        if (headerToken)
            return Array.isArray(headerToken) ? headerToken.join('') : headerToken;
        const urlToken = new URL((_a = req.url) !== null && _a !== void 0 ? _a : '', 'http://localhost/').searchParams.get('token');
        if (urlToken)
            return urlToken;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }, onConnecting, onConnected, onSubscribe, onOperation, onNext, onComplete, onDisconnect, } = options;
    const streams = {};
    function createStream(token) {
        let request = null, response = null, pinger, disposed = false;
        const pendingMsgs = [];
        const ops = {};
        function write(msg) {
            return new Promise((resolve, reject) => {
                if (disposed || !response || !response.writable)
                    return resolve(false);
                response.write(msg, (err) => {
                    if (err)
                        return reject(err);
                    // if (err) return resolve(false);
                    resolve(true);
                });
            });
        }
        async function emit(event, data) {
            let msg = `event: ${event}`;
            if (data)
                msg += `\ndata: ${JSON.stringify(data)}`;
            msg += '\n\n';
            const wrote = await write(msg);
            if (!wrote)
                pendingMsgs.push(msg);
        }
        async function dispose() {
            if (disposed)
                return;
            disposed = true;
            // make room for another potential stream while this one is being disposed
            if (typeof token === 'string')
                delete streams[token];
            // complete all operations and flush messages queue before ending the stream
            for (const op of Object.values(ops)) {
                if (isAsyncGenerator(op))
                    await op.return(undefined);
            }
            while (pendingMsgs.length) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const msg = pendingMsgs.shift();
                await write(msg);
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            response.end(); // response must exist at this point
            response = null;
            clearInterval(pinger);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onDisconnect === null || onDisconnect === void 0 ? void 0 : onDisconnect(request); // request must exist at this point
            request = null;
        }
        return {
            get open() {
                return disposed || Boolean(response);
            },
            ops,
            async use(req, res) {
                request = req;
                response = res;
                req.socket.setTimeout(0);
                req.socket.setNoDelay(true);
                req.socket.setKeepAlive(true);
                res.once('close', dispose);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
                res.setHeader('Cache-Control', 'no-cache');
                res.setHeader('X-Accel-Buffering', 'no');
                if (req.httpVersionMajor < 2)
                    res.setHeader('Connection', 'keep-alive');
                res.flushHeaders();
                // write an empty message because some browsers (like Firefox and Safari)
                // dont accept the header flush
                await write(':\n\n');
                // ping client every 12 seconds to keep the connection alive
                pinger = setInterval(() => write(':\n\n'), 12000);
                while (pendingMsgs.length) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const msg = pendingMsgs.shift();
                    const wrote = await write(msg);
                    if (!wrote)
                        throw new Error('Unable to flush messages');
                }
                await (onConnected === null || onConnected === void 0 ? void 0 : onConnected(req));
            },
            async from(operationReq, args, result, opId) {
                var e_1, _a;
                if (isAsyncIterable(result)) {
                    try {
                        /** multiple emitted results */
                        for (var result_1 = __asyncValues(result), result_1_1; result_1_1 = await result_1.next(), !result_1_1.done;) {
                            let part = result_1_1.value;
                            const maybeResult = await (onNext === null || onNext === void 0 ? void 0 : onNext(operationReq, args, part));
                            if (maybeResult)
                                part = maybeResult;
                            await emit('next', opId
                                ? {
                                    id: opId,
                                    payload: part,
                                }
                                : part);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (result_1_1 && !result_1_1.done && (_a = result_1.return)) await _a.call(result_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    /** single emitted result */
                    const maybeResult = await (onNext === null || onNext === void 0 ? void 0 : onNext(operationReq, args, result));
                    if (maybeResult)
                        result = maybeResult;
                    await emit('next', opId
                        ? {
                            id: opId,
                            payload: result,
                        }
                        : result);
                }
                await emit('complete', opId ? { id: opId } : null);
                // end on complete when no operation id is present
                // because distinct event streams are used for each operation
                if (!opId)
                    await dispose();
                else
                    delete ops[opId];
                await (onComplete === null || onComplete === void 0 ? void 0 : onComplete(operationReq, args));
            },
        };
    }
    async function prepare(req, res, params) {
        let args, operation;
        const maybeExecArgs = await (onSubscribe === null || onSubscribe === void 0 ? void 0 : onSubscribe(req, res, params));
        if (maybeExecArgs)
            args = maybeExecArgs;
        else {
            // you either provide a schema dynamically through
            // `onSubscribe` or you set one up during the server setup
            if (!schema)
                throw new Error('The GraphQL schema is not provided');
            const { operationName, variables } = params;
            let { query } = params;
            if (typeof query === 'string') {
                try {
                    query = graphql_1.parse(query);
                }
                catch (_a) {
                    return res.writeHead(400, 'GraphQL query syntax error').end();
                }
            }
            const argsWithoutSchema = {
                operationName,
                document: query,
                variableValues: variables,
            };
            args = Object.assign(Object.assign({}, argsWithoutSchema), { schema: typeof schema === 'function'
                    ? await schema(req, argsWithoutSchema)
                    : schema });
        }
        try {
            const ast = graphql_1.getOperationAST(args.document, args.operationName);
            if (!ast)
                throw null;
            operation = ast.operation;
        }
        catch (_b) {
            return res.writeHead(400, 'Unable to detect operation AST').end();
        }
        // mutations cannot happen over GETs as per the spec
        // Read more: https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md#get
        if (operation === 'mutation' && req.method === 'GET')
            return res
                .writeHead(405, 'Cannot perform mutations over GET', {
                Allow: 'POST',
            })
                .end();
        if (!('contextValue' in args))
            args.contextValue =
                typeof context === 'function' ? await context(req, args) : context;
        // we validate after injecting the context because the process of
        // reporting the validation errors might need the supplied context value
        const validationErrs = validate(args.schema, args.document);
        if (validationErrs.length) {
            if (req.headers.accept === 'text/event-stream') {
                // accept the request and emit the validation error in event streams,
                // promoting graceful GraphQL error reporting
                // Read more: https://www.w3.org/TR/eventsource/#processing-model
                // Read more: https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md#document-validation
                return [
                    args,
                    function perform() {
                        return { errors: validationErrs };
                    },
                ];
            }
            res
                .writeHead(400, {
                'Content-Type': req.headers.accept === 'application/json'
                    ? 'application/json; charset=utf-8'
                    : 'application/graphql+json; charset=utf-8',
            })
                .write(JSON.stringify({ errors: validationErrs }));
            return res.end();
        }
        return [
            args,
            async function perform() {
                let result;
                result = operation === 'subscription' ? subscribe(args) : execute(args);
                const maybeResult = await (onOperation === null || onOperation === void 0 ? void 0 : onOperation(req, res, args, result));
                if (maybeResult)
                    result = maybeResult;
                return result;
            },
        ];
    }
    return async function handler(req, res, body) {
        var _a, _b, _c, _d;
        // authenticate first and acquire unique identification token
        const token = await authenticate(req, res);
        if (res.writableEnded)
            return;
        if (typeof token !== 'string')
            throw new Error('Token was not supplied');
        const accept = (_a = req.headers.accept) !== null && _a !== void 0 ? _a : '*/*';
        const stream = streams[token];
        if (accept === 'text/event-stream') {
            // if event stream is not registered, process it directly.
            // this means that distinct connections are used for graphql operations
            if (!stream) {
                let params;
                try {
                    params = await parseReq(req, body);
                }
                catch (err) {
                    return res.writeHead(400, err.message).end();
                }
                const distinctStream = createStream(null);
                // reserve space for the operation
                distinctStream.ops[''] = null;
                const prepared = await prepare(req, res, params);
                if (res.writableEnded)
                    return;
                if (!prepared)
                    throw new Error("Operation preparation didn't respond, yet it was not prepared");
                const [args, perform] = prepared;
                const result = await perform();
                if (res.writableEnded) {
                    if (isAsyncGenerator(result))
                        result.return(undefined);
                    return; // `onOperation` responded
                }
                if (isAsyncIterable(result))
                    distinctStream.ops[''] = result;
                await (onConnecting === null || onConnecting === void 0 ? void 0 : onConnecting(req, res));
                if (res.writableEnded)
                    return;
                await distinctStream.use(req, res);
                await distinctStream.from(req, args, result);
                return;
            }
            // open stream cant exist, only one per token is allowed
            if (stream.open)
                return res.writeHead(409, 'Stream already open').end();
            await (onConnecting === null || onConnecting === void 0 ? void 0 : onConnecting(req, res));
            if (res.writableEnded)
                return;
            await stream.use(req, res);
            return;
        }
        if (req.method === 'PUT') {
            // method PUT prepares a stream for future incoming connections.
            if (!['*/*', 'text/plain'].includes(accept))
                return res.writeHead(406).end();
            // streams mustnt exist if putting new one
            if (stream)
                return res.writeHead(409, 'Stream already registered').end();
            streams[token] = createStream(token);
            res
                .writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' })
                .write(token);
            return res.end();
        }
        else if (req.method === 'DELETE') {
            // method DELETE completes an existing operation streaming in streams
            // streams must exist when completing operations
            if (!stream)
                return res.writeHead(404, 'Stream not found').end();
            const opId = new URL((_b = req.url) !== null && _b !== void 0 ? _b : '', 'http://localhost/').searchParams.get('operationId');
            if (!opId)
                return res.writeHead(400, 'Operation ID is missing').end();
            const op = stream.ops[opId];
            if (isAsyncGenerator(op))
                op.return(undefined);
            delete stream.ops[opId]; // deleting the operation means no further activity should take place
            return res.writeHead(200).end();
        }
        else if (req.method !== 'GET' && req.method !== 'POST')
            // only POSTs and GETs are accepted at this point
            return res
                .writeHead(405, undefined, { Allow: 'GET, POST, PUT, DELETE' })
                .end();
        else if (!stream)
            // for all other requests, streams must exist to attach the result onto
            return res.writeHead(404, 'Stream not found').end();
        if (!['*/*', 'application/graphql+json', 'application/json'].includes(accept))
            return res.writeHead(406).end();
        let params;
        try {
            params = await parseReq(req, body);
        }
        catch (err) {
            return res.writeHead(400, err.message).end();
        }
        const opId = String((_d = (_c = params.extensions) === null || _c === void 0 ? void 0 : _c.operationId) !== null && _d !== void 0 ? _d : '');
        if (!opId)
            return res.writeHead(400, 'Operation ID is missing').end();
        if (opId in stream.ops)
            return res.writeHead(409, 'Operation with ID already exists').end();
        // reserve space for the operation through ID
        stream.ops[opId] = null;
        const prepared = await prepare(req, res, params);
        if (res.writableEnded)
            return;
        if (!prepared)
            throw new Error("Operation preparation didn't respond, yet it was not prepared");
        const [args, perform] = prepared;
        // operation might have completed before prepared
        if (!(opId in stream.ops))
            return res.writeHead(204).end();
        const result = await perform();
        if (res.writableEnded) {
            if (isAsyncGenerator(result))
                result.return(undefined);
            delete stream.ops[opId];
            return; // `onOperation` responded
        }
        // operation might have completed before performed
        if (!(opId in stream.ops)) {
            if (isAsyncGenerator(result))
                result.return(undefined);
            return res.writeHead(204).end();
        }
        if (isAsyncIterable(result))
            stream.ops[opId] = result;
        res.writeHead(202).end();
        // streaming to an empty reservation is ok (will be flushed on connect)
        await stream.from(req, args, result, opId);
    };
}
exports.createHandler = createHandler;
async function parseReq(req, body) {
    const params = {};
    if (req.method === 'GET') {
        await new Promise((resolve, reject) => {
            var _a, _b, _c;
            try {
                const url = new URL((_a = req.url) !== null && _a !== void 0 ? _a : '', 'http://localhost/');
                params.operationName =
                    (_b = url.searchParams.get('operationName')) !== null && _b !== void 0 ? _b : undefined;
                params.query = (_c = url.searchParams.get('query')) !== null && _c !== void 0 ? _c : undefined;
                const variables = url.searchParams.get('variables');
                if (variables)
                    params.variables = JSON.parse(variables);
                const extensions = url.searchParams.get('extensions');
                if (extensions)
                    params.extensions = JSON.parse(extensions);
                resolve();
            }
            catch (_d) {
                reject(new Error('Unparsable URL'));
            }
        });
    }
    else if (req.method === 'POST') {
        await new Promise((resolve, reject) => {
            const end = (body) => {
                try {
                    const data = utils_1.isObject(body) ? body : JSON.parse(String(body));
                    params.operationName = data.operationName;
                    params.query = data.query;
                    params.variables = data.variables;
                    params.extensions = data.extensions;
                    resolve();
                }
                catch (_a) {
                    reject(new Error('Unparsable body'));
                }
            };
            if (body != null)
                end(body);
            else {
                let body = '';
                req.on('data', (chunk) => (body += chunk));
                req.on('end', () => end(body));
            }
        });
    }
    else
        throw new Error(`Unsupported method ${req.method}`); // should never happen
    if (!params.query)
        throw new Error('Missing query');
    if (params.variables && typeof params.variables !== 'object')
        throw new Error('Invalid variables');
    if (params.extensions && typeof params.extensions !== 'object')
        throw new Error('Invalid extensions');
    return params;
}
function isAsyncIterable(val) {
    return typeof Object(val)[Symbol.asyncIterator] === 'function';
}
function isAsyncGenerator(val) {
    return (utils_1.isObject(val) &&
        typeof Object(val)[Symbol.asyncIterator] === 'function' &&
        typeof val.return === 'function'
    // for lazy ones, we only need the return anyway
    // typeof val.throw === 'function' &&
    // typeof val.next === 'function'
    );
}
exports.isAsyncGenerator = isAsyncGenerator;
