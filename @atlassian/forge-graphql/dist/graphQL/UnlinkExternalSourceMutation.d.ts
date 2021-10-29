import * as Types from '../graphql-types';
export declare type UnlinkExternalSourceMutationVariables = Types.Exact<{
    input: Types.UnlinkExternalSourceInput;
}>;
export declare type UnlinkExternalSourceMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        unlinkExternalSource?: Types.Maybe<{
            __typename?: 'UnlinkExternalSourcePayload';
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
export declare const UnlinkExternalSource = "\n    mutation unlinkExternalSource($input: UnlinkExternalSourceInput!) {\n  compass {\n    unlinkExternalSource(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n    }\n  }\n}\n    ";
