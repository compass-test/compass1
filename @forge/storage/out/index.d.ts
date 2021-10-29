import { RequestInit, Response } from 'node-fetch';
import { GlobalStorage } from './global-storage';
import { DefaultQueryBuilder } from './query-api';
export declare type APIResponse = Pick<Response, 'json' | 'text' | 'arrayBuffer' | 'ok' | 'status' | 'statusText'>;
export declare type FetchMethod = (url: string, init: RequestInit) => Promise<APIResponse>;
export declare const getStorageInstanceWithQuery: (adapter: GlobalStorage) => {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
    delete: (key: string) => Promise<void>;
    getSecret: (key: string) => Promise<any>;
    setSecret: (key: string, value: any) => Promise<void>;
    deleteSecret: (key: string) => Promise<void>;
    query: () => DefaultQueryBuilder;
};
export { GlobalStorage } from './global-storage';
export { startsWith } from './conditions';
export { QueryBuilder, QueryApi, Condition, ListResult, Predicate, Result, Value } from './storage-adapter';
export { APIError } from './errors';
//# sourceMappingURL=index.d.ts.map