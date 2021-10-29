/**
 *
 * client
 *
 */
import { RequestParams, Sink, ExecutionResult } from './common';
/** This file is the entry point for browsers, re-export common elements. */
export * from './common';
/** @category Client */
export interface ClientOptions {
    /**
     * Reuses a single SSE connection for all GraphQL operations.
     *
     * When instantiating with `false` (default), the client will run
     * in a "distinct connections mode" mode. Meaning, a new SSE
     * connection will be established on each subscribe.
     *
     * On the other hand, when instantiating with `true`, the client
     * will run in a "single connection mode" mode. Meaning, a single SSE
     * connection will be used to transmit all operation results while
     * separate HTTP requests will be issued to dictate the behaviour.
     *
     * @default false
     */
    singleConnection?: boolean;
    /**
     * Controls when should the connection be established while using the
     * client in "single connection mode" (see `singleConnection ` option).
     *
     * - `false`: Establish a connection immediately.
     * - `true`: Establish a connection on first subscribe and close on last unsubscribe.
     *
     * Note that the `lazy` option has NO EFFECT when using the client
     * in "distinct connection mode" (`singleConnection = false`).
     *
     * @default true
     */
    lazy?: boolean;
    /**
     * Used ONLY when the client is in non-lazy mode (`lazy = false`). When
     * using this mode, errors might have no sinks to report to; however,
     * to avoid swallowing errors, `onNonLazyError` will be called when either:
     * - An unrecoverable error/close event occurs
     * - Silent retry attempts have been exceeded
     *
     * After a client has errored out, it will NOT perform any automatic actions.
     *
     * @default console.error
     */
    onNonLazyError?: (error: unknown) => void;
    /**
     * URL of the GraphQL over SSE server to connect.
     *
     * If the option is a function, it will be called on each connection attempt.
     * Returning a Promise is supported too and the connection phase will stall until it
     * resolves with the URL.
     *
     * A good use-case for having a function is when using the URL for authentication,
     * where subsequent reconnects (due to auth) may have a refreshed identity token in
     * the URL.
     */
    url: string | (() => Promise<string> | string);
    /**
     * HTTP headers to pass along the request.
     *
     * If the option is a function, it will be called on each connection attempt.
     * Returning a Promise is supported too and the connection phase will stall until it
     * resolves with the headers.
     *
     * A good use-case for having a function is when using the headers for authentication,
     * where subsequent reconnects (due to auth) may have a refreshed identity token in
     * the header.
     */
    headers?: Record<string, string> | (() => Promise<Record<string, string>> | Record<string, string>);
    /**
     * The Fetch function to use.
     *
     * For NodeJS environments consider using [`node-fetch`](https://github.com/node-fetch/node-fetch).
     *
     * @default global.fetch
     */
    fetchFn?: unknown;
    /**
     * The AbortController implementation to use.
     *
     * For NodeJS environments before v15 consider using [`node-abort-controller`](https://github.com/southpolesteve/node-abort-controller).
     *
     * @default global.AbortController
     */
    abortControllerImpl?: unknown;
    /**
     * A custom ID generator for identifying subscriptions.
     *
     * The default generates a v4 UUID to be used as the ID using `Math`
     * as the random number generator. Supply your own generator
     * in case you need more uniqueness.
     *
     * Reference: https://gist.github.com/jed/982883
     */
    generateID?: () => string;
    /**
     * How many times should the client try to reconnect before it errors out?
     *
     * @default 5
     */
    retryAttempts?: number;
    /**
     * Control the wait time between retries. You may implement your own strategy
     * by timing the resolution of the returned promise with the retries count.
     *
     * `retries` argument counts actual reconnection attempts, so it will begin with
     * 0 after the first retryable disconnect.
     *
     * @default 'Randomised exponential backoff, 5 times'
     */
    retry?: (retries: number) => Promise<void>;
}
/** @category Client */
export interface Client {
    /**
     * Subscribes to receive through a SSE connection.
     *
     * It uses the `sink` to emit received data or errors. Returns a _dispose_
     * function used for dropping the subscription and cleaning up.
     */
    subscribe<Data = Record<string, unknown>, Extensions = unknown>(request: RequestParams, sink: Sink<ExecutionResult<Data, Extensions>>): () => void;
    /**
     * Dispose of the client, destroy connections and clean up resources.
     */
    dispose: () => void;
}
/**
 * Creates a disposable GraphQL over SSE client to transmit
 * GraphQL operation results.
 *
 * If you have an HTTP/2 server, it is recommended to use the client
 * in "distinct connections mode" (`singleConnection = true`) which will
 * create a new SSE connection for each subscribe. This is the default.
 *
 * However, when dealing with HTTP/1 servers from a browser, consider using
 * the "single connection mode" (`singleConnection = false`) which will
 * use only one SSE connection.
 *
 * @category Client
 */
export declare function createClient(options: ClientOptions): Client;
/**
 * A network error caused by the client or an unexpected response from the server.
 *
 * Network errors are considered retryable, all others error types will be reported
 * immediately.
 *
 * @category Client
 */
export declare class NetworkError extends Error {
    /**
     * The underlyig response thats considered an error.
     *
     * Will be undefined when no response is received,
     * instead an unexpected network error.
     */
    response: Response | undefined;
    constructor(msgOrErrOrResponse: string | Error | Response);
    static isResponse(msgOrErrOrResponse: string | Error | Response): msgOrErrOrResponse is Response;
}
