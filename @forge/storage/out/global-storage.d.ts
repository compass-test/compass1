import { FetchMethod } from './index';
import { ListOptions } from './queries';
import { StorageAdapter } from './storage-adapter';
interface ListResults {
    results: {
        key: string;
        value: any;
    }[];
    nextCursor?: string;
}
export declare class GlobalStorage implements StorageAdapter {
    private getAppContextAri;
    private apiClient;
    private readonly endpoint;
    constructor(getAppContextAri: (() => string) | string, apiClient: FetchMethod);
    private doGetAppContextAri;
    get(key: string): Promise<any>;
    getSecret(key: string): Promise<any>;
    list(options: ListOptions): Promise<ListResults>;
    set(key: string, value: any): Promise<void>;
    setSecret(key: string, value: any): Promise<void>;
    delete(key: string): Promise<void>;
    deleteSecret(key: string): Promise<void>;
    private getInternal;
    private buildRequest;
    private query;
    private mutation;
}
export {};
//# sourceMappingURL=global-storage.d.ts.map