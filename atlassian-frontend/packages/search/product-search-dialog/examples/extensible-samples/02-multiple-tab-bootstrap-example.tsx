import React from 'react';
import { injectIntl } from 'react-intl';
import { SearchDialogProduct } from '../../src/extensible/product-router';
import ExampleMultiProductDialogWithIntl from './utils/multi-product-dialog-util';

const preQueryItemSupplier = (product: string) =>
  Promise.resolve({
    sections: [
      {
        searchResults: [
          {
            title: `${product} item 1`,
            id: `preq-${product}-1`,
            meta: `preq-${product}-location`,
            url: `preq-${product}-url`,
            iconUrl: `preq-${product}-icon-url`,
            containerId: `preq-${product}-container-id`,
          },
          {
            title: `${product} item 2`,
            id: `preq-${product}-2`,
            meta: `preq-${product}-location`,
            url: `preq-${product}-url`,
            iconUrl: `preq-${product}-icon-url`,
            containerId: `preq-${product}-container-id`,
          },
          {
            title: `${product} item 3`,
            id: `preq-${product}-3`,
            meta: `preq-${product}-location`,
            url: `preq-${product}-url`,
            iconUrl: `preq-${product}-icon-url`,
            containerId: `preq-${product}-container-id`,
          },
        ],
        size: 3,
        id: 'pre-query-results-id',
        title: `${product} section title 1`,
      },
      {
        searchResults: [
          {
            title: `${product} item 4`,
            id: `preq-${product}-4`,
            meta: `preq-${product}-location`,
            url: `preq-${product}-url`,
            iconUrl: `preq-${product}-icon-url`,
            containerId: `preq-${product}-container-id`,
          },
          {
            title: `${product} item 5`,
            id: `preq-${product}-5`,
            meta: `preq-${product}-location`,
            url: `preq-${product}-url`,
            iconUrl: `preq-${product}-icon-url`,
            containerId: `preq-${product}-container-id`,
          },
          {
            title: `${product} item 6`,
            id: `preq-${product}-6`,
            meta: `preq-${product}-location`,
            url: `preq-${product}-url`,
            iconUrl: `preq-${product}-icon-url`,
            containerId: `preq-${product}-container-id`,
          },
        ],
        size: 3,
        id: 'pre-query-results-id',
        title: `${product} section title 2`,
      },
    ],
    size: 3,
  });

const postQueryItemSupplier = (product: string) =>
  Promise.resolve({
    sections: [
      {
        searchResults: [
          {
            title: `${product} item 1`,
            id: `postq-${product}-1`,
            meta: `postq-${product}-location`,
            url: `postq-${product}-url`,
            iconUrl: `postq-${product}-icon-url`,
            containerId: `postq-${product}-container-id`,
          },
          {
            title: `${product} item 2`,
            id: `postq-${product}-2`,
            meta: `postq-${product}-location`,
            url: `postq-${product}-url`,
            iconUrl: `postq-${product}-icon-url`,
            containerId: `postq-${product}-container-id`,
          },
          {
            title: `${product} item 3`,
            id: `postq-${product}-3`,
            meta: `postq-${product}-location`,
            url: `postq-${product}-url`,
            iconUrl: `postq-${product}-icon-url`,
            containerId: `postq-${product}-container-id`,
          },
        ],
        size: 3,
        id: 'post-query-results-id',
        title: `${product} section title 1`,
      },
      {
        searchResults: [
          {
            title: `${product} item 4`,
            id: `postq-${product}-4`,
            meta: `postq-${product}-location`,
            url: `postq-${product}-url`,
            iconUrl: `postq-${product}-icon-url`,
            containerId: `postq-${product}-container-id`,
          },
          {
            title: `${product} item 5`,
            id: `postq-${product}-5`,
            meta: `postq-${product}-location`,
            url: `postq-${product}-url`,
            iconUrl: `postq-${product}-icon-url`,
            containerId: `postq-${product}-container-id`,
          },
          {
            title: `${product} item 6`,
            id: `postq-${product}-6`,
            meta: `postq-${product}-location`,
            url: `postq-${product}-url`,
            iconUrl: `postq-${product}-icon-url`,
            containerId: `postq-${product}-container-id`,
          },
        ],
        size: 3,
        id: 'post-query-results-id',
        title: `${product} section title 2`,
      },
    ],
    size: 3,
  });

const ExampleProductTab = ({
  order,
  onRetry,
  product,
}: {
  order: number;
  onRetry: () => void;
  product: string;
}) => {
  const sections = [
    {
      id: `${product}.scope`,
      title: `${product} Section Title`,
      scope: `${product}.scope`,
      resultMapper: () => [],
    },
  ];

  return (
    <SearchDialogProduct
      order={order}
      onRetry={onRetry}
      urlGeneratorForNoResultsScreen={() => ''}
      preQueryItemSupplier={() => preQueryItemSupplier(product)}
      postQueryItemSupplier={() => postQueryItemSupplier(product)}
      id={`${product}`}
      title={`${product}`}
      sections={sections}
      permissionSupplier={() => Promise.resolve([`${product}.scope`])}
    ></SearchDialogProduct>
  );
};
const ExampleProductTabWithIntl = injectIntl(ExampleProductTab);

const MultiProductDialogWithIntl = () => (
  <ExampleMultiProductDialogWithIntl>
    {({ onRetry }) => {
      return (
        <>
          <ExampleProductTabWithIntl
            order={1}
            onRetry={onRetry}
            product={'bitbucket'}
          />
          <ExampleProductTabWithIntl
            order={2}
            onRetry={onRetry}
            product={'confluence'}
          />
          <ExampleProductTabWithIntl
            order={3}
            onRetry={onRetry}
            product={'jira'}
          />
        </>
      );
    }}
  </ExampleMultiProductDialogWithIntl>
);
export default MultiProductDialogWithIntl;
