import { CreateComponentInput, UpdateComponentInput, ApiPayload, Component } from './compound-types';
import { ComponentByExternalAliasQuery, ComponentByExternalAliasQueryVariables } from './graphQL/GetComponentByExternalAliasQuery';
declare type APIResponse<T> = {
    json: Promise<T>;
} & Pick<Response, 'json' | 'text' | 'arrayBuffer' | 'ok' | 'status' | 'statusText' | 'headers'>;
declare type InternalForgeAPI = {
    __requestAtlassian: (uri: string, params?: RequestInit) => Promise<Response>;
    requestGraph: <T>(query: string, variables: any) => Promise<APIResponse<T>>;
    createComponent: (variables: CreateComponentInput) => Promise<APIResponse<ApiPayload<Component>>>;
    getComponentByExternalAlias: (variables: ComponentByExternalAliasQueryVariables) => Promise<APIResponse<ComponentByExternalAliasQuery>>;
    updateComponent: (variables: UpdateComponentInput) => Promise<APIResponse<ApiPayload<Component>>>;
};
export { APIResponse, InternalForgeAPI };
