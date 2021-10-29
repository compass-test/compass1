import * as Types from '../graphql-types';
export declare type CreateEventSourceMutationVariables = Types.Exact<{
    input: Types.CreateEventSourceInput;
}>;
export declare type CreateEventSourceMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        createEventSource?: Types.Maybe<{
            __typename?: 'CreateEventSourcePayload';
            success: boolean;
            eventSource?: Types.Maybe<{
                __typename?: 'EventSource';
                id: string;
            }>;
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
export declare const CreateEventSource = "\n    mutation CreateEventSource($input: CreateEventSourceInput!) {\n  compass {\n    createEventSource(input: $input) {\n      eventSource {\n        id\n      }\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n    }\n  }\n}\n    ";
