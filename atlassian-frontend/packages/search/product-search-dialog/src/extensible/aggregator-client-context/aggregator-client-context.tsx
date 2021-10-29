import React, { useContext, useMemo, FunctionComponent } from 'react';
import {
  AggregatorClient,
  ScopedAggregatorResponse,
} from '../../common/clients';
import { FilterInterface } from '../../common/clients/common-types';

// Scope is a string, Filters must be extended from FilterInterface
export type GenericAggregatorClient = AggregatorClient<
  ScopedAggregatorResponse<string>,
  FilterInterface
>;

type AggregatorClientContext = GenericAggregatorClient | undefined;

const AggregatorClientContext = React.createContext<AggregatorClientContext>(
  undefined,
);

export interface AggregatorClientFeatures {}

export interface Props {
  abTestCloudId: string;
  aggregatorUrl: string;
  features?: AggregatorClientFeatures;
}

export const AggregatorClientContextProvider: FunctionComponent<Props> = ({
  abTestCloudId,
  aggregatorUrl,
  children,
}) => {
  const aggregatorClient = useMemo(
    () =>
      new AggregatorClient<ScopedAggregatorResponse<string>, FilterInterface>({
        url: aggregatorUrl,
        cloudId: abTestCloudId,
        siteMasterList: [],
      }),
    [abTestCloudId, aggregatorUrl],
  );

  return (
    <AggregatorClientContext.Provider value={aggregatorClient}>
      {children}
    </AggregatorClientContext.Provider>
  );
};

/**
 * Returns a generic Aggregator client with no typing
 * @deprecated use {@link useTypedAggregatorClient} instead
 */
export const useAggregatorClient = () => {
  const aggregatorClient = useContext(AggregatorClientContext);
  return aggregatorClient;
};

/**
 * Fetch an Aggregator client from the context.
 * @typeParam Response the client's response type
 * @typeParam Scope the client's scope type
 * @returns an {@link AggregatorClient}
 */
export const useTypedAggregatorClient = <
  Response extends ScopedAggregatorResponse<Scope>,
  Scope = Response['id']
>() => {
  // Casting done here to ensure that the result types match the scopes requested
  const untypedClient: any = useContext(AggregatorClientContext);
  return untypedClient as AggregatorClient<Response, FilterInterface>;
};
