import * as Types from '../graphql-types';
export declare type DeleteCompassComponentLinkMutationVariables = Types.Exact<{
    input: Types.DeleteCompassComponentLinkInput;
}>;
export declare type DeleteCompassComponentLinkMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        deleteComponentLink?: Types.Maybe<{
            __typename?: 'DeleteCompassComponentLinkPayload';
            success: boolean;
            deletedCompassLinkId?: Types.Maybe<string>;
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
export declare const DeleteCompassComponentLink = "\n    mutation DeleteCompassComponentLink($input: DeleteCompassComponentLinkInput!) {\n  compass {\n    deleteComponentLink(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n      deletedCompassLinkId\n    }\n  }\n}\n    ";
