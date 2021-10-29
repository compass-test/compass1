import * as Types from '../graphql-types';
export declare type CreateCompassComponentMutationVariables = Types.Exact<{
    cloudId: Types.Scalars['ID'];
    input: Types.CreateCompassComponentInput;
}>;
export declare type CreateCompassComponentMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        createComponent?: Types.Maybe<{
            __typename?: 'CreateCompassComponentPayload';
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
            componentDetails?: Types.Maybe<{
                __typename?: 'CompassComponent';
                id: string;
                name: string;
            }>;
        }>;
    }>;
};
export declare const CreateCompassComponent = "\n    mutation CreateCompassComponent($cloudId: ID!, $input: CreateCompassComponentInput!) {\n  compass {\n    createComponent(cloudId: $cloudId, input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n      componentDetails {\n        id\n        name\n      }\n    }\n  }\n}\n    ";
