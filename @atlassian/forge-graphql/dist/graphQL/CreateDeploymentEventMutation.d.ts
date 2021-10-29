import * as Types from '../graphql-types';
export declare type CreateDeploymentEventMutationVariables = Types.Exact<{
    input: Types.CreateDeploymentEventInput;
}>;
export declare type CreateDeploymentEventMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        createDeploymentEvent?: Types.Maybe<{
            __typename?: 'CreateDeploymentEventsPayload';
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
export declare const CreateDeploymentEvent = "\n    mutation createDeploymentEvent($input: CreateDeploymentEventInput!) {\n  compass {\n    createDeploymentEvent(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n    }\n  }\n}\n    ";
