/* eslint-disable import/no-extraneous-dependencies */

import React, { useEffect } from 'react';
import { boolean, withKnobs, number } from '@storybook/addon-knobs';
import { decorateAction } from '@storybook/addon-actions';
import fetchMock from 'fetch-mock/cjs/client';
import '@atlaskit/css-reset';
import { ConfluencePageTreeWithoutHeading } from './index';
import {
  directoryMockData,
  setChildrenProp,
  setPartialHistoryData,
  createPageListMockResponse,
} from '../../services/confluence/mocks';
import { StoryFn } from '../../storybook-utils/types';
import {
  ConfluencePageTreeContextProvider,
  useConfluencePageTreeContext,
} from '../../controllers/page-tree';
import { withConsoleAnalytics } from '../../storybook-utils/AnalyticsDecorator';

const DIRECTORY_API = /directory\/graphql/;
const PAGE_LIST_API = 'express:/wiki/rest/api/content/:contentId/child/page';

const createPageListShort = () =>
  createPageListMockResponse(15, { idPrefix: 'short' });

const action = decorateAction([
  ([eventName, eventData]) => [eventName, JSON.stringify(eventData)],
]);

const EmptyWithoutHeading = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(PAGE_LIST_API, () => createPageListMockResponse(0, {}));

  return (
    <ConfluencePageTreeWithoutHeading
      contentId="123"
      cloudId="123-456"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
      readOnly={false}
      onEdit={action('edit')}
      isEmbeddedPagesExperiment={boolean('isEmbeddedPagesExperiment', false)}
    />
  );
};

const ErrorWithoutHeading = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(PAGE_LIST_API, 500);

  return (
    <ConfluencePageTreeWithoutHeading
      contentId="123"
      cloudId="123-456"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
      readOnly={false}
      onEdit={action('edit')}
      isEmbeddedPagesExperiment={boolean('isEmbeddedPagesExperiment', false)}
    />
  );
};

const ShortListWithoutHeading = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(PAGE_LIST_API, createPageListShort);

  return (
    <ConfluencePageTreeWithoutHeading
      contentId="123"
      cloudId="123-456"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
      readOnly={false}
      onEdit={action('edit')}
      isEmbeddedPagesExperiment={boolean('isEmbeddedPagesExperiment', false)}
    />
  );
};

const WithChildrenWithoutHeading = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(
    PAGE_LIST_API,
    (url: string) => {
      let response;
      if (url.includes('CCC')) {
        response = createPageListMockResponse(5, { idPrefix: 'parent' });
        setChildrenProp(response.results[0], true);
        setChildrenProp(response.results[1], true);
      } else if (url.includes('parent-2')) {
        response = { status: 500 };
      } else if (url.includes('child-2')) {
        response = createPageListMockResponse(3, { idPrefix: 'grandchild' });
      } else {
        const size = Math.ceil(Math.random() * 3);
        // produce random sized child list of 1-3 pages each time it is expanded
        response = createPageListMockResponse(size, { idPrefix: 'child' });
        if (size >= 2) {
          setChildrenProp(response.results[1], true);
        }
      }
      return response;
    },
    { delay: number('fetchMock delay', 400) },
  );

  return (
    <ConfluencePageTreeWithoutHeading
      contentId="CCC"
      cloudId="123-456"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
      readOnly={false}
      onEdit={action('edit')}
      isEmbeddedPagesExperiment={boolean('isEmbeddedPagesExperiment', false)}
    />
  );
};

const LongListWithoutHeading = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(PAGE_LIST_API, (url: string) => {
    const start = url.split('start=')[1].split('&')[0];
    if (start === '0') {
      return createPageListMockResponse(200, { idPrefix: 'long' });
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(createPageListShort), 2000);
    });
  });

  return (
    <ConfluencePageTreeWithoutHeading
      contentId="123"
      cloudId="123-456"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
      readOnly={false}
      onEdit={action('edit')}
      isEmbeddedPagesExperiment={boolean('isEmbeddedPagesExperiment', false)}
    />
  );
};

const WithPartialDataWithoutHeading = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(PAGE_LIST_API, () => {
    const missingData = createPageListShort();
    setPartialHistoryData(missingData);
    return missingData;
  });

  return (
    <ConfluencePageTreeWithoutHeading
      contentId="123"
      cloudId="123-456"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
      readOnly={false}
      onEdit={action('edit')}
      isEmbeddedPagesExperiment={boolean('isEmbeddedPagesExperiment', false)}
    />
  );
};

export {
  EmptyWithoutHeading,
  ErrorWithoutHeading,
  ShortListWithoutHeading,
  LongListWithoutHeading,
  WithChildrenWithoutHeading,
  WithPartialDataWithoutHeading,
};

const withPageTreeProvider = (storyFn: StoryFn) => {
  const ExampleLoader = () => {
    const { setContent } = useConfluencePageTreeContext();
    useEffect(() => setContent('AAA', 'CCC'), [setContent]);
    return null;
  };
  return (
    <ConfluencePageTreeContextProvider
      onError={action('error')}
      accountId="dummy-account-id"
    >
      <ExampleLoader />
      {storyFn()}
    </ConfluencePageTreeContextProvider>
  );
};

export default {
  title: 'Confluence Table Tree',
  decorators: [withConsoleAnalytics, withKnobs, withPageTreeProvider],
};
