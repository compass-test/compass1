import { RequestInit, Response } from 'node-fetch';
import { QueryApi } from '@forge/storage';
import { authorize } from './authorization';
import { Route } from './safeUrl';
import { webTrigger } from './webTrigger';
export declare type APIResponse = Pick<Response, 'json' | 'text' | 'arrayBuffer' | 'ok' | 'status' | 'statusText' | 'headers'>;
export declare type FetchMethod = (url: string, init?: RequestInit) => Promise<APIResponse>;
export declare type FetchMethodAllowingRoute = (url: string | Route, init?: RequestInit) => Promise<APIResponse>;
export declare type RequestProductMethod = (url: Route, init?: RequestInit) => Promise<APIResponse>;
export declare type FetchOptions = RequestInit;
export interface RequestProductMethods {
    requestJira: RequestProductMethod;
    requestConfluence: RequestProductMethod;
}
export interface GraphQLFetchMethods {
    requestGraph: (query: string, variables?: any, headers?: Record<string, any>) => Promise<APIResponse>;
}
export interface StorageMethods {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
    delete: (key: string) => Promise<void>;
}
export interface PropertiesAPI {
    onJiraProject: (context: string) => StorageMethods;
    onJiraIssue: (context: string) => StorageMethods;
    onConfluencePage: (context: string) => StorageMethods;
    onConfluenceSpace: (context: string) => StorageMethods;
}
export interface StorageAPI extends StorageMethods, QueryApi {
}
export interface ForgeStorageAPI extends StorageAPI {
    getSecret: (key: string) => Promise<any>;
    setSecret: (key: string, value: any) => Promise<void>;
    deleteSecret: (key: string) => Promise<void>;
}
export interface StoreAPI extends PropertiesAPI {
    onJiraProject: (context: string) => StorageMethods;
    onJiraIssue: (context: string) => StorageMethods;
    onConfluencePage: (context: string) => StorageMethods;
    onConfluenceSpace: (context: string) => StorageMethods;
}
export interface FetchAPI extends RequestProductMethods {
    asUser(): RequestProductMethods & GraphQLFetchMethods;
    asApp(): RequestProductMethods & GraphQLFetchMethods;
    fetch: FetchMethodAllowingRoute;
}
export interface ForgeAPI extends FetchAPI {
    store: StoreAPI;
}
declare const asUser: () => RequestProductMethods & GraphQLFetchMethods;
declare const asApp: () => RequestProductMethods & GraphQLFetchMethods;
declare const fetch: FetchMethodAllowingRoute;
declare const requestJira: RequestProductMethod;
declare const requestConfluence: RequestProductMethod;
declare const store: PropertiesAPI;
declare const storage: ForgeStorageAPI;
declare const properties: PropertiesAPI;
declare const API: ForgeAPI;
export declare const privacy: {
    reportPersonalData: (accounts: import("./privacy").Account[]) => Promise<import("./privacy").AccountUpdate[]>;
};
export default API;
export { asUser, asApp, authorize, fetch, requestJira, requestConfluence, store, storage, properties, webTrigger };
export { QueryBuilder, QueryApi, Condition, ListResult, Predicate, Result, Value } from '@forge/storage';
export { startsWith } from '@forge/storage';
export { route, assumeTrustedRoute, Route } from './safeUrl';
//# sourceMappingURL=index.d.ts.map