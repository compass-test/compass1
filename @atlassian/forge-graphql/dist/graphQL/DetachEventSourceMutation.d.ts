import * as Types from '../graphql-types';
export declare type DetachEventSourceMutationVariables = Types.Exact<{
    input: Types.DetachEventSourceInput;
}>;
export declare type DetachEventSourceMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        detachEventSource?: Types.Maybe<{
            __typename?: 'DetachEventSourcePayload';
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
export declare const DetachEventSource = "\n    mutation DetachEventSource($input: DetachEventSourceInput!) {\n  compass {\n    detachEventSource(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n    }\n  }\n}\n    ";
