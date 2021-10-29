import {
  createProviderWithCustomFetchData,
  ExportedDataProvider,
} from '../../common/providers/create-data-provider';
import { JoinableSitesResponse } from '../../types';
import { ProviderRetryConfig } from '../../common/providers/as-data-provider';

export type JoinableSiteDataFetcher = () => Promise<JoinableSitesResponse>;

export const fetchEmptyData: JoinableSiteDataFetcher = () =>
  Promise.resolve({ sites: undefined });

export const createJoinableSitesProvider = (
  fetchData: JoinableSiteDataFetcher = fetchEmptyData,
  retryConfig?: ProviderRetryConfig,
): ExportedDataProvider<JoinableSitesResponse> => {
  return createProviderWithCustomFetchData<JoinableSitesResponse>(
    'joinableSites',
    fetchData,
    retryConfig,
  );
};
