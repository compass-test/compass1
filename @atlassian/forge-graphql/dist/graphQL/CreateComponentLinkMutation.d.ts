import * as Types from '../graphql-types';
export declare type CreateCompassComponentLinkMutationVariables = Types.Exact<{
    input: Types.CreateCompassComponentLinkInput;
}>;
export declare type CreateCompassComponentLinkMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        createComponentLink?: Types.Maybe<{
            __typename?: 'CreateCompassComponentLinkPayload';
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
            createdComponentLink?: Types.Maybe<{
                __typename?: 'CompassLink';
                id: string;
                type: Types.CompassLinkType;
                url: any;
                name?: Types.Maybe<string>;
            }>;
        }>;
    }>;
};
export declare const CreateCompassComponentLink = "\n    mutation CreateCompassComponentLink($input: CreateCompassComponentLinkInput!) {\n  compass {\n    createComponentLink(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n      createdComponentLink {\n        ... on CompassLink {\n          id\n          type\n          url\n          name\n        }\n      }\n    }\n  }\n}\n    ";
