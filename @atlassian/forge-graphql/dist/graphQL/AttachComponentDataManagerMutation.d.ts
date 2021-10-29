import * as Types from '../graphql-types';
export declare type AttachComponentDataManagerMutationVariables = Types.Exact<{
    input: Types.AttachCompassComponentDataManagerInput;
}>;
export declare type AttachComponentDataManagerMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        attachComponentDataManager?: Types.Maybe<{
            __typename?: 'AttachCompassComponentDataManagerPayload';
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
            componentDetails?: Types.Maybe<{
                __typename?: 'CompassComponent';
                id: string;
                name: string;
                dataManager?: Types.Maybe<{
                    __typename?: 'CompassComponentDataManager';
                    ecosystemAppId: string;
                    externalSourceURL?: Types.Maybe<any>;
                }>;
            }>;
        }>;
    }>;
};
export declare const AttachComponentDataManager = "\n    mutation AttachComponentDataManager($input: AttachCompassComponentDataManagerInput!) {\n  compass {\n    attachComponentDataManager(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n      componentDetails {\n        id\n        name\n        dataManager {\n          ecosystemAppId\n          externalSourceURL\n        }\n      }\n    }\n  }\n}\n    ";
