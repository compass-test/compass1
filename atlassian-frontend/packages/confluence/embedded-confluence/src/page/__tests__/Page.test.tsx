import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';

import { Page } from '../Page';
import type { PageProps } from '../Page';

const BasicPage = (props: PageProps) => (
  <IntlProvider locale="en">
    <Page {...props} />
  </IntlProvider>
);

test('should render view page correctly', () => {
  const { getByTestId } = render(
    <BasicPage
      url={
        'https://hello.atlassian.net/wiki/spaces/ABC/pages/123?parentProduct=TestProduct'
      }
    />,
  );

  expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
    'src',
    'https://hello.atlassian.net/wiki/spaces/ABC/pages/123?parentProduct=TestProduct&NO_SSR=1',
  );
  expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
    'title',
    'confluence-article-iframe',
  );
});

test('should render view blog correctly', () => {
  const { getByTestId } = render(
    <BasicPage
      url={
        'https://hello.atlassian.net/wiki/spaces/ABC/blog/123?parentProduct=TestProduct'
      }
    />,
  );

  expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
    'src',
    'https://hello.atlassian.net/wiki/spaces/ABC/pages/123?parentProduct=TestProduct&NO_SSR=1',
  );
  expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
    'title',
    'confluence-article-iframe',
  );
});

test('should render view if contentId, parentProduct, spaceKey, hostname are passed in', () => {
  const { getByTestId } = render(
    <BasicPage
      contentId={'123'}
      spaceKey={'ABC'}
      hostname={'jira-dev.com'}
      parentProduct={'TestProduct'}
    />,
  );

  expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
    'src',
    'https://jira-dev.com/wiki/spaces/ABC/pages/123?parentProduct=TestProduct&NO_SSR=1',
  );
  expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
    'title',
    'confluence-article-iframe',
  );
});

test('should not render anything if contentId is not supplied', () => {
  const { queryByTestId } = render(
    <BasicPage
      spaceKey={'ABC'}
      hostname={'jira-dev.com'}
      parentProduct={'TestProduct'}
    />,
  );

  expect(queryByTestId('confluence-page-iframe')).toBeNull();
});

test('should not render anything if spaceKey is not supplied', () => {
  const { queryByTestId } = render(
    <BasicPage
      contentId={'123'}
      hostname={'jira-dev.com'}
      parentProduct={'TestProduct'}
    />,
  );

  expect(queryByTestId('confluence-page-iframe')).toBeNull();
});

test('should not render anything if url is not supported', () => {
  const { queryByTestId } = render(
    <BasicPage
      url={
        'https://hello.atlassian.net/wiki/spaces/ABC/blog/edit-embed/123?parentProduct=TestProduct'
      }
    />,
  );

  expect(queryByTestId('confluence-page-iframe')).toBeNull();
});
