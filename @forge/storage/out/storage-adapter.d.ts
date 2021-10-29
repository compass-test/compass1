export interface StorageAdapter {
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<void>;
    delete(key: string): Promise<void>;
    getSecret(key: string): Promise<any>;
    setSecret(key: string, value: any): Promise<void>;
    deleteSecret(key: string): Promise<void>;
}
export interface QueryApi {
    query(): QueryBuilder;
}
export declare type Value = string;
export interface Predicate {
    condition: 'STARTS_WITH';
    value: Value;
}
export declare type Condition = Predicate;
export interface QueryBuilder {
    where(field: 'key', condition: Condition): QueryBuilder;
    cursor(cursor: string): QueryBuilder;
    limit(limit: number): QueryBuilder;
    getMany(): Promise<ListResult>;
    getOne(): Promise<Result | undefined>;
}
export interface Result {
    key: string;
    value: object;
}
export interface ListResult {
    results: Result[];
    nextCursor?: string;
}
//# sourceMappingURL=storage-adapter.d.ts.map