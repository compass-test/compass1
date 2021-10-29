import * as Types from '../graphql-types';
export declare type CreateCompassComponentRelationshipMutationVariables = Types.Exact<{
    input: Types.CreateCompassRelationshipInput;
}>;
export declare type CreateCompassComponentRelationshipMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        createRelationship?: Types.Maybe<{
            __typename?: 'CreateCompassRelationshipPayload';
            success: boolean;
            errors?: Types.Maybe<Array<{
                __typename?: 'MutationError';
                message?: Types.Maybe<string>;
                extensions?: Types.Maybe<{
                    __typename?: 'GenericMutationErrorExtension';
                    errorType?: Types.Maybe<string>;
                    statusCode?: Types.Maybe<number>;
                } | {
                    __typename?: 'InvokeExtensionPayloadErrorExtension';
                    errorType?: Types.Maybe<string>;
                    statusCode?: Types.Maybe<number>;
                }>;
            }>>;
            createdCompassRelationship?: Types.Maybe<{
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
            }>;
        }>;
    }>;
};
export declare const CreateCompassComponentRelationship = "\n    mutation CreateCompassComponentRelationship($input: CreateCompassRelationshipInput!) {\n  compass {\n    createRelationship(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n      createdCompassRelationship {\n        ... on CompassRelationship {\n          type\n          startNode {\n            id\n          }\n          endNode {\n            id\n          }\n        }\n      }\n    }\n  }\n}\n    ";
