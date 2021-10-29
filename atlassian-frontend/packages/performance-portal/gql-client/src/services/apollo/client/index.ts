import { useMemo } from 'react';

import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';
import { RetryLink } from '@apollo/client/link/retry';

export const useGqlClient = (onGqlError: (errors: Error[]) => void) => {
  return useMemo(() => {
    const link = ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (networkError) {
          onGqlError([networkError]);
        }
        if (graphQLErrors) {
          onGqlError([...(graphQLErrors ?? [])]);
        }
      }),
      new RetryLink({
        attempts: {
          max: 5,
        },
      }),
      new HttpLink({
        uri: ({ operationName }) =>
          `/graphql?operation=${encodeURIComponent(
            operationName || 'unknown',
          )}`,
      }),
    ]);
    return new ApolloClient({
      cache: new InMemoryCache({
        possibleTypes: {
          // TODO consider generating this automatically
          // https://www.apollographql.com/docs/react/data/fragments/#generating-possibletypes-automatically
          Metric: [
            'BrowserMetric',
            'PageLoadMetric',
            'InlineResultMetric',
            'CustomMetric',
            'PageSegmentLoadMetric',
            'WebVitalsMetric',
          ],
          BrowserMetric: [
            'BrowserMetric',
            'PageLoadMetric',
            'InlineResultMetric',
            'CustomMetric',
            'PageSegmentLoadMetric',
            'WebVitalsMetric',
          ],
        },
      }),
      link,
    });
  }, [onGqlError]);
};
