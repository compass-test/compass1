import * as Types from '../graphql-types';
export declare type ComponentByExternalAliasQueryVariables = Types.Exact<{
    cloudId: Types.Scalars['ID'];
    externalSource?: Types.Maybe<Types.Scalars['ID']>;
    externalId: Types.Scalars['ID'];
}>;
export declare type ComponentByExternalAliasQuery = {
    __typename?: 'Query';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogQueryApi';
        componentByExternalAlias?: Types.Maybe<{
            __typename?: 'CompassComponent';
            id: string;
            name: string;
            type: Types.CompassComponentType;
            description?: Types.Maybe<string>;
            ownerId?: Types.Maybe<string>;
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
            labels?: Types.Maybe<Array<{
                __typename?: 'CompassComponentLabel';
                name?: Types.Maybe<string>;
            }>>;
            links?: Types.Maybe<Array<{
                __typename?: 'CompassLink';
                name?: Types.Maybe<string>;
                type: Types.CompassLinkType;
                id: string;
                url: any;
            }>>;
            relationships?: Types.Maybe<{
                __typename?: 'CompassRelationshipConnection';
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
                __typename?: 'QueryError';
            }>;
            dataManager?: Types.Maybe<{
                __typename?: 'CompassComponentDataManager';
                externalSourceURL?: Types.Maybe<any>;
            }>;
        } | {
            __typename?: 'QueryError';
            message?: Types.Maybe<string>;
            extensions?: Types.Maybe<Array<{
                __typename?: 'GenericQueryErrorExtension';
                statusCode?: Types.Maybe<number>;
                errorType?: Types.Maybe<string>;
            }>>;
        }>;
    }>;
};
export declare const ComponentByExternalAlias = "\n    query componentByExternalAlias($cloudId: ID!, $externalSource: ID, $externalId: ID!) {\n  compass {\n    componentByExternalAlias(\n      cloudId: $cloudId\n      externalSource: $externalSource\n      externalID: $externalId\n    ) {\n      ... on CompassComponent {\n        id\n        name\n        type\n        description\n        ownerId\n        fields {\n          ... on CompassEnumField {\n            value\n            definition {\n              ... on CompassFieldDefinition {\n                id\n                name\n                description\n                type\n                options {\n                  __typename\n                  ... on CompassEnumFieldDefinitionOptions {\n                    values\n                    default\n                  }\n                }\n              }\n            }\n          }\n        }\n        labels {\n          name\n        }\n        links {\n          name\n          type\n          id\n          url\n        }\n        relationships {\n          ... on CompassRelationshipConnection {\n            nodes {\n              startNode {\n                id\n              }\n              endNode {\n                id\n              }\n              type\n            }\n          }\n        }\n        dataManager {\n          ... on CompassComponentDataManager {\n            externalSourceURL\n          }\n        }\n      }\n      ... on QueryError {\n        message\n        extensions {\n          statusCode\n          errorType\n        }\n      }\n    }\n  }\n}\n    ";
