import * as Types from '../graphql-types';
export declare type RemoveComponentLabelsMutationVariables = Types.Exact<{
    input: Types.RemoveCompassComponentLabelsInput;
}>;
export declare type RemoveComponentLabelsMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        removeComponentLabels?: Types.Maybe<{
            __typename?: 'RemoveCompassComponentLabelsPayload';
            success: boolean;
            removedLabelNames?: Types.Maybe<Array<string>>;
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
export declare const RemoveComponentLabels = "\n    mutation removeComponentLabels($input: RemoveCompassComponentLabelsInput!) {\n  compass {\n    removeComponentLabels(input: $input) {\n      success\n      removedLabelNames\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n    }\n  }\n}\n    ";
