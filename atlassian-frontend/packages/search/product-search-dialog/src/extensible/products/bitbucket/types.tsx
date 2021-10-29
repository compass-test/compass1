import { ScopedAggregatorResponse } from '../../../common/clients';
import { ScreenSpecificProps } from '../../product-router/product';

export enum BitbucketScope {
  BitbucketRepostitory = 'bitbucket.repository',
}

export interface BitbucketLink {
  href: string;
}

interface BitbucketWorkspaceLinksResponse {
  self: string;
  html: string;
  avatar: string;
}

interface BitbucketWorkspaceResponse {
  name: string;
  uuid: string;
  links: BitbucketWorkspaceLinksResponse;
}

export interface BitbucketRepositoryResponse {
  name: string;
  uuid: string;
  description?: string;
  links: {
    html: BitbucketLink;
    avatar: BitbucketLink;
    self: BitbucketLink;
  };
  workspace: BitbucketWorkspaceResponse;
}

export interface AggregatorBitbucketResponse
  extends ScopedAggregatorResponse<BitbucketScope> {
  results: BitbucketRepositoryResponse[];
}

export type BitbucketURLGenerators = {
  viewAllLinkGenerator: (query: string) => string;
  codeSearchUrlGenerator: (query: string) => string;
} & Pick<ScreenSpecificProps, 'urlGeneratorForNoResultsScreen'>;

export interface BitbucketFeatures {
  /**
   * Forces splitting calls to check for access to Bitbucket (via Aggregator's scopes/v1 endpoint) to a separate,
   * non batched call. Allows for different caching rules to be applied to the response.
   */
  enableSingleScopesCall?: boolean;
}

export const BITBUCKET_PRODUCT_ID = 'bitbucket';
