import { GqlError, SdkError, MutationError } from '../compound-types';
import { CompassCatalogQueryApi } from '../graphql-types';
declare const mapGqlErrors: (errors?: Array<GqlError>) => Array<SdkError>;
declare function mapQueryErrors(result: CompassCatalogQueryApi, queryErrorPaths: Array<string>): Array<SdkError>;
declare function mapMutationErrors(mutationErrors: Array<MutationError>): Array<SdkError>;
declare function parsingResponseError(e: Error): SdkError;
declare function parseCompoundMutationErrors(aggResp: any, variables: any): Array<SdkError>;
export { mapGqlErrors, mapQueryErrors, mapMutationErrors, parsingResponseError, parseCompoundMutationErrors };
