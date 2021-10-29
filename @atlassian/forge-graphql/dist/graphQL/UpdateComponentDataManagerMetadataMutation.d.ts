import * as Types from '../graphql-types';
export declare type UpdateComponentDataManagerMetadataMutationVariables = Types.Exact<{
    input: Types.UpdateCompassComponentDataManagerMetadataInput;
}>;
export declare type UpdateComponentDataManagerMetadataMutation = {
    __typename?: 'Mutation';
    compass?: Types.Maybe<{
        __typename?: 'CompassCatalogMutationApi';
        updateComponentDataManagerMetadata?: Types.Maybe<{
            __typename?: 'UpdateCompassComponentDataManagerMetadataPayload';
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
                    lastSyncEvent?: Types.Maybe<{
                        __typename?: 'ComponentSyncEvent';
                        time: any;
                        status: Types.ComponentSyncEventStatus;
                        lastSyncErrors?: Types.Maybe<Array<string>>;
                    }>;
                }>;
            }>;
        }>;
    }>;
};
export declare const UpdateComponentDataManagerMetadata = "\n    mutation UpdateComponentDataManagerMetadata($input: UpdateCompassComponentDataManagerMetadataInput!) {\n  compass {\n    updateComponentDataManagerMetadata(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n        }\n      }\n      componentDetails {\n        id\n        name\n        dataManager {\n          ecosystemAppId\n          externalSourceURL\n          lastSyncEvent {\n            time\n            status\n            lastSyncErrors\n          }\n        }\n      }\n    }\n  }\n}\n    ";
