import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import {
  AggregatorClientContextProvider,
  useAggregatorClient,
} from './aggregator-client-context';

export default {
  title: 'Extensible/Client Provider',
  decorators: [withKnobs],
};

const ClientProvider: React.FC<{ enableGetRequests: boolean }> = ({
  children,
  enableGetRequests,
}) => {
  const aggregatorURL = text(
    'Aggregator URL',
    'https://sdog.jira-dev.com/gateway/api/xpsearch-aggregator',
  );
  const cloudId = text(
    'Cloud Id (sdog by default)',
    'DUMMY-7c8a2b74-595a-41c7-960c-fd32f8572cea',
  );
  return (
    <AggregatorClientContextProvider
      abTestCloudId={cloudId}
      aggregatorUrl={aggregatorURL}
      features={{
        useGetForScopesAPI: enableGetRequests,
      }}
    >
      {children}
    </AggregatorClientContextProvider>
  );
};

export const Basic = () => {
  const enableGetRequests = boolean('Enable GET Scopes requests', false);

  const Inner = () => {
    const aggregatorClient = useAggregatorClient();

    const [scopes, setScopes] = useState<string[]>([]);
    const product = select(
      'Product',
      {
        jira: 'jira',
        confluence: 'confluence',
        bitbucket: 'bitbucket',
        avocado: 'avocado',
      },
      'jira',
    );

    useEffect(() => {
      aggregatorClient
        ?.batchedGetExtensibleProductPermission(product, {
          experience: 'storybook',
          productIds: [product],
        })
        .then((scopes) => setScopes(scopes));
    }, [aggregatorClient, setScopes, product]);

    return (
      <div>
        <p>The following scopes for {product} are enabled</p>
        {scopes.map((scope) => (
          <pre key={scope}>{scope}</pre>
        ))}
      </div>
    );
  };

  return (
    <ClientProvider enableGetRequests={enableGetRequests}>
      <Inner />
    </ClientProvider>
  );
};
