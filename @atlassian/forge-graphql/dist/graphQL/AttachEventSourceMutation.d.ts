import * as Types from '../graphql-types';
export declare type AttachEventSourceMutationVariables = Types.Exact<{
    input: Types.AttachEventSourceInput;
}>;
export declare type AttachEventSourceMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        attachEventSource?: Types.Maybe<{
            __typename?: 'AttachEventSourcePayload';
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
export declare const AttachEventSource = "\n    mutation AttachEventSource($input: AttachEventSourceInput!) {\n  compass {\n    attachEventSource(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n    }\n  }\n}\n    ";
