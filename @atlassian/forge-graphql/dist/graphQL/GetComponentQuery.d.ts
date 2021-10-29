import * as Types from '../graphql-types';
export declare type GetComponentQueryVariables = Types.Exact<{
    componentId: Types.Scalars['ID'];
}>;
export declare type GetComponentQuery = {
    __typename?: 'Query';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogQueryApi';
        component?: Types.Maybe<{
            __typename: 'CompassComponent';
            id: string;
            name: string;
            description?: Types.Maybe<string>;
            type: Types.CompassComponentType;
            links?: Types.Maybe<Array<{
                __typename?: 'CompassLink';
                id: string;
                name?: Types.Maybe<string>;
                type: Types.CompassLinkType;
                url: any;
            }>>;
            labels?: Types.Maybe<Array<{
                __typename?: 'CompassComponentLabel';
                name?: Types.Maybe<string>;
            }>>;
            fields?: Types.Maybe<Array<{
                __typename?: 'CompassEnumField';
                value?: Types.Maybe<Array<string>>;
                definition?: Types.Maybe<{
                    __typename?: 'CompassFieldDefinition';
                    id: string;
                    name: string;
                    description: string;
                    type: Types.CompassFieldType;
                    options: {
                        __typename: 'CompassEnumFieldDefinitionOptions';
                        values?: Types.Maybe<Array<string>>;
                        default?: Types.Maybe<Array<string>>;
                    };
                }>;
            }>>;
            relationships?: Types.Maybe<{
                __typename: 'CompassRelationshipConnection';
                nodes?: Types.Maybe<Array<{
                    __typename?: 'CompassRelationship';
                    type: Types.CompassRelationshipType;
                    startNode?: Types.Maybe<{
                        __typename?: 'CompassComponent';
                        id: string;
                    }>;
                    endNode?: Types.Maybe<{
                        __typename?: 'CompassComponent';
                        id: string;
                    }>;
                }>>;
            } | {
                __typename: 'QueryError';
                identifier?: Types.Maybe<string>;
                message?: Types.Maybe<string>;
                extensions?: Types.Maybe<Array<{
                    __typename?: 'GenericQueryErrorExtension';
                    statusCode?: Types.Maybe<number>;
                    errorType?: Types.Maybe<string>;
                }>>;
            }>;
            externalAliases?: Types.Maybe<Array<{
                __typename?: 'CompassExternalAlias';
                externalSource?: Types.Maybe<string>;
                externalAliasId: string;
            }>>;
            dataManager?: Types.Maybe<{
                __typename?: 'CompassComponentDataManager';
                externalSourceURL?: Types.Maybe<any>;
            }>;
        } | {
            __typename: 'QueryError';
            identifier?: Types.Maybe<string>;
            message?: Types.Maybe<string>;
            extensions?: Types.Maybe<Array<{
                __typename?: 'GenericQueryErrorExtension';
                statusCode?: Types.Maybe<number>;
                errorType?: Types.Maybe<string>;
            }>>;
        }>;
    }>;
};
export declare const GetComponent = "\n    query getComponent($componentId: ID!) {\n  compass {\n    component(id: $componentId) {\n      __typename\n      ... on CompassComponent {\n        id\n        name\n        description\n        type\n        links {\n          ... on CompassLink {\n            id\n            name\n            type\n            url\n          }\n        }\n        labels {\n          ... on CompassComponentLabel {\n            name\n          }\n        }\n        fields {\n          ... on CompassEnumField {\n            value\n            definition {\n              ... on CompassFieldDefinition {\n                id\n                name\n                description\n                type\n                options {\n                  __typename\n                  ... on CompassEnumFieldDefinitionOptions {\n                    values\n                    default\n                  }\n                }\n              }\n            }\n          }\n        }\n        relationships {\n          __typename\n          ... on CompassRelationshipConnection {\n            nodes {\n              type\n              startNode {\n                id\n              }\n              endNode {\n                id\n              }\n            }\n          }\n          ... on QueryError {\n            identifier\n            message\n            extensions {\n              statusCode\n              errorType\n            }\n          }\n        }\n        externalAliases {\n          externalSource\n          externalAliasId\n        }\n        dataManager {\n          externalSourceURL\n        }\n      }\n      ... on QueryError {\n        identifier\n        message\n        extensions {\n          statusCode\n          errorType\n        }\n      }\n    }\n  }\n}\n    ";
