import * as Types from '../graphql-types';
export declare type AddComponentLabelsMutationVariables = Types.Exact<{
    input: Types.AddCompassComponentLabelsInput;
}>;
export declare type AddComponentLabelsMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        addComponentLabels?: Types.Maybe<{
            __typename?: 'AddCompassComponentLabelsPayload';
            success: boolean;
            addedLabels?: Types.Maybe<Array<{
                __typename?: 'CompassComponentLabel';
                name?: Types.Maybe<string>;
            }>>;
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
export declare const AddComponentLabels = "\n    mutation addComponentLabels($input: AddCompassComponentLabelsInput!) {\n  compass {\n    addComponentLabels(input: $input) {\n      success\n      addedLabels {\n        name\n      }\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n    }\n  }\n}\n    ";
