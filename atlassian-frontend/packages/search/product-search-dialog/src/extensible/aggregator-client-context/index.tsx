export type {
  GenericAggregatorClient,
  AggregatorClientFeatures,
  Props as ClientContextProviderProps,
} from './aggregator-client-context';

export {
  AggregatorClientContextProvider,
  useAggregatorClient,
  useTypedAggregatorClient,
} from './aggregator-client-context';

// TODO: Remove this and have a more descriptive experience
export const PLACEHOLDER_EXPERIENCE = 'product-search-dialog';
