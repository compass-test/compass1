import * as Types from '../graphql-types';
export declare type DeleteCompassComponentExternalAliasMutationVariables = Types.Exact<{
    input: Types.DeleteCompassComponentExternalAliasInput;
}>;
export declare type DeleteCompassComponentExternalAliasMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        deleteComponentExternalAlias?: Types.Maybe<{
            __typename?: 'DeleteCompassComponentExternalAliasPayload';
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
            deletedCompassExternalAlias?: Types.Maybe<{
                __typename?: 'CompassExternalAlias';
                externalSource?: Types.Maybe<string>;
                externalAliasId: string;
            }>;
        }>;
    }>;
};
export declare const DeleteCompassComponentExternalAlias = "\n    mutation DeleteCompassComponentExternalAlias($input: DeleteCompassComponentExternalAliasInput!) {\n  compass {\n    deleteComponentExternalAlias(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n      deletedCompassExternalAlias {\n        externalSource\n        externalAliasId\n      }\n    }\n  }\n}\n    ";
