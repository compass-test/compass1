export declare const getQuery: (contextAri: string, key: string, encrypted: boolean) => {
    query: string;
    variables: {
        contextAri: string;
        key: string;
        encrypted: boolean;
    };
};
export interface WhereClause {
    field: string;
    condition: 'STARTS_WITH';
    value: string;
}
export interface ListOptions {
    where?: Array<WhereClause>;
    cursor?: string;
    limit?: number;
}
export declare const listQuery: (contextAri: string, options: ListOptions) => {
    query: string;
    variables: {
        contextAri: string;
        where: WhereClause[] | null;
        cursor: string | null;
        limit: number | null;
    };
};
export declare const listQueryForCleanup: (contextAri: string, options: ListOptions) => {
    query: string;
    variables: {
        contextAri: string;
        where: WhereClause[] | null;
        cursor: string | null;
        limit: number | null;
    };
};
export declare const setQuery: (contextAri: string, key: string, value: any, encrypted: boolean) => {
    query: string;
    variables: {
        input: {
            contextAri: string;
            key: string;
            value: any;
            encrypted: boolean;
        };
    };
};
export declare const deleteQuery: (contextAri: string, key: string, encrypted: boolean) => {
    query: string;
    variables: {
        input: {
            contextAri: string;
            key: string;
            encrypted: boolean;
        };
    };
};
//# sourceMappingURL=queries.d.ts.map