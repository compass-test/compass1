import * as Types from '../graphql-types';
export declare type CreateCompassComponentExternalAliasMutationVariables = Types.Exact<{
    input: Types.CreateCompassComponentExternalAliasInput;
}>;
export declare type CreateCompassComponentExternalAliasMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        createComponentExternalAlias?: Types.Maybe<{
            __typename?: 'CreateCompassComponentExternalAliasPayload';
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
            createdCompassExternalAlias?: Types.Maybe<{
                __typename?: 'CompassExternalAlias';
                externalSource?: Types.Maybe<string>;
                externalAliasId: string;
            }>;
        }>;
    }>;
};
export declare const CreateCompassComponentExternalAlias = "\n    mutation CreateCompassComponentExternalAlias($input: CreateCompassComponentExternalAliasInput!) {\n  compass {\n    createComponentExternalAlias(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n      createdCompassExternalAlias {\n        externalSource\n        externalAliasId\n      }\n    }\n  }\n}\n    ";
