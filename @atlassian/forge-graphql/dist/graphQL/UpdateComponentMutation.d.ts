import * as Types from '../graphql-types';
export declare type UpdateCompassComponentMutationVariables = Types.Exact<{
    input: Types.UpdateCompassComponentInput;
}>;
export declare type UpdateCompassComponentMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        updateComponent?: Types.Maybe<{
            __typename?: 'UpdateCompassComponentPayload';
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
export declare const UpdateCompassComponent = "\n    mutation UpdateCompassComponent($input: UpdateCompassComponentInput!) {\n  compass {\n    updateComponent(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n      componentDetails {\n        id\n        name\n      }\n    }\n  }\n}\n    ";
