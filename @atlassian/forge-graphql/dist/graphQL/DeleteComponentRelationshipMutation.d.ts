import * as Types from '../graphql-types';
export declare type DeleteCompassComponentRelationshipMutationVariables = Types.Exact<{
    input: Types.DeleteCompassRelationshipInput;
}>;
export declare type DeleteCompassComponentRelationshipMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        deleteRelationship?: Types.Maybe<{
            __typename?: 'DeleteCompassRelationshipPayload';
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
        }>;
    }>;
};
export declare const DeleteCompassComponentRelationship = "\n    mutation DeleteCompassComponentRelationship($input: DeleteCompassRelationshipInput!) {\n  compass {\n    deleteRelationship(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n    }\n  }\n}\n    ";
