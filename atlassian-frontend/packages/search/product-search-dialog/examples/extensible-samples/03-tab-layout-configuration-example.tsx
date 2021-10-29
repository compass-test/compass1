import React from 'react';
import { injectIntl } from 'react-intl';
import { SearchDialogProduct } from '../../src/extensible/product-router';
import ExampleMultiProductDialogWithIntl from './utils/multi-product-dialog-util';

const ExampleCustomHeader: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'red', height: 100 }}>
      <p>This is a custom header</p>
    </div>
  );
};
const ExampleCustomBody: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'lightblue', height: 100 }}>
      <p>This is a custom body</p>
    </div>
  );
};
const ExampleCustomFooter: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'lightgreen', height: 100 }}>
      <p>This is a custom footer</p>
    </div>
  );
};

const ExampleProductTab = ({
  order,
  onRetry,
}: {
  order: number;
  onRetry: () => void;
}) => {
  const sections = [
    {
      id: 'product.scope',
      title: 'Product Section Title',
      scope: 'product.scope',
      resultMapper: () => [],
    },
  ];

  const preQueryItemSupplier = () =>
    Promise.resolve({
      sections: [
        {
          searchResults: [
            {
              title: 'Pre Query Repository 1',
              id: 'preq-rep1',
              meta: 'preq-rep1-workspace',
              url: 'preq-rep1-url',
              iconUrl: 'preq-rep1-icon-url',
              containerId: 'preq-rep1-container-id',
            },
            {
              title: 'Pre Query Repository 2',
              id: 'preq-rep2',
              meta: 'preq-rep2-workspace',
              url: 'preq-rep2-url',
              iconUrl: 'preq-rep2-icon-url',
              containerId: 'preq-rep2-container-id',
            },
          ],
          size: 2,
          id: 'pre-query-results-id',
          title: 'pre query results title',
        },
      ],
      size: 2,
    });

  const postQueryItemSupplier = () =>
    Promise.resolve({
      sections: [
        {
          searchResults: [
            {
              title: 'Post Query Repository 1',
              id: 'postq-rep1',
              meta: 'postq-rep1-workspace',
              url: 'postq-rep1-url',
              iconUrl: 'postq-rep1-icon-url',
              containerId: 'postq-rep1-container-id',
            },
            {
              title: 'Post Query Repository 2',
              id: 'postq-rep2',
              meta: 'postq-rep2-workspace',
              url: 'postq-rep2-url',
              iconUrl: 'postq-rep2-icon-url',
              containerId: 'postq-rep2-container-id',
            },
          ],
          size: 2,
          id: 'post-query-results1',
          title: 'post query results title',
        },
      ],
      size: 2,
    });

  return (
    <SearchDialogProduct
      order={order}
      onRetry={onRetry}
      urlGeneratorForNoResultsScreen={() => ''}
      preQueryItemSupplier={preQueryItemSupplier}
      postQueryItemSupplier={postQueryItemSupplier}
      id={'product'}
      title={'Product Title'}
      sections={sections}
      permissionSupplier={() => Promise.resolve(['product.scope'])}
    >
      {() => {
        return {
          Header: () => <ExampleCustomHeader />,
          Body: () => <ExampleCustomBody />,
          Footer: () => <ExampleCustomFooter />,
        };
      }}
    </SearchDialogProduct>
  );
};
const ExampleProductTabWithIntl = injectIntl(ExampleProductTab);

const MultiProductDialogWithIntl = () => (
  <ExampleMultiProductDialogWithIntl>
    {({ onRetry }: { onRetry: () => void }) => {
      return <ExampleProductTabWithIntl order={1} onRetry={onRetry} />;
    }}
  </ExampleMultiProductDialogWithIntl>
);

export default MultiProductDialogWithIntl;
