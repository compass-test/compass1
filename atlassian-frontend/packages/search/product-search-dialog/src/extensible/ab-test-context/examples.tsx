import React, { FunctionComponent } from 'react';
import { presetConfig } from '../../../examples/storybook-utils/instance-config';
import { AggregatorClientContextProvider } from '../aggregator-client-context';
import { SearchDialogProduct, ProductRouter } from '../product-router';
import { noResultSuppliers } from '../result-supplier';
import { useABTest, ABTestContextProvider } from './';

export default {
  title: 'AB Test Context Provider',
  decorators: [(story: () => React.ElementType) => story()],
};

const ABTestDisplay: FunctionComponent = () => {
  const abTest = useABTest();

  return (
    <>
      <div style={{ color: abTest ? 'green' : 'red' }}>
        The current ab test data is {JSON.stringify(abTest)}
      </div>
    </>
  );
};

export const Basic = () => {
  return (
    <AggregatorClientContextProvider
      abTestCloudId={presetConfig.sdog.cloudId}
      aggregatorUrl={presetConfig.sdog.searchAggregatorServiceUrl}
    >
      <ProductRouter>
        <ABTestContextProvider>
          <div>
            The primary product will register and ab test data will be retrieved
          </div>
          <ABTestDisplay />
          <SearchDialogProduct
            id="jira"
            title="jira"
            sections={[{ id: 'jira.issue', title: 'Jira Issue' }]}
            order={1}
            onRetry={() => null}
            urlGeneratorForNoResultsScreen={() => ''}
            {...noResultSuppliers()}
          ></SearchDialogProduct>
        </ABTestContextProvider>
      </ProductRouter>
    </AggregatorClientContextProvider>
  );
};
