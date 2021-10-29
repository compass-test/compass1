import * as Types from '../graphql-types';
export declare type DeleteComponentMutationVariables = Types.Exact<{
    input: Types.DeleteCompassComponentInput;
}>;
export declare type DeleteComponentMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        deleteComponent?: Types.Maybe<{
            __typename?: 'DeleteCompassComponentPayload';
            success: boolean;
            deletedComponentId?: Types.Maybe<string>;
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
        }>;
    }>;
};
export declare const DeleteComponent = "\n    mutation deleteComponent($input: DeleteCompassComponentInput!) {\n  compass {\n    deleteComponent(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n      deletedComponentId\n    }\n  }\n}\n    ";
