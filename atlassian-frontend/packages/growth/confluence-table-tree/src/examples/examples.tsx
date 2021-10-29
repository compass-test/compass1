/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { decorateAction } from '@storybook/addon-actions';
import fetchMock from 'fetch-mock/cjs/client';
import '@atlaskit/css-reset';
import ConfluencePageTree from '..';
import { withConsoleAnalytics } from '../storybook-utils/AnalyticsDecorator';
import {
  emptyResponse,
  directoryMockData,
  setChildrenProp,
  setPartialHistoryData,
  createPageDetailsMockResponse,
  createPageListMockResponse,
} from './mock-data';

const DIRECTORY_API = /directory\/graphql/;
const PAGE_LIST_API = 'express:/wiki/rest/api/content/search';
const PAGE_DETAILS_API = 'express:/wiki/rest/api/content/search';

const createPageListShort = () =>
  createPageListMockResponse(15, { idPrefix: 'short' });
const createPageDetailsShort = () =>
  createPageDetailsMockResponse(15, { idPrefix: 'short' });

const action = decorateAction([
  ([eventName, eventData]) => [eventName, JSON.stringify(eventData)],
]);

const EmptyProps = () => {
  return (
    <ConfluencePageTree
      contentId={null}
      cloudId={null}
      spaceKey={null}
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
    />
  );
};

const ShortList = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(
    PAGE_LIST_API,
    { query: { cqlcontext: '{"contentStatuses":["draft", "current"]}' } },
    createPageListShort,
  );
  fetchMock.get(PAGE_DETAILS_API, createPageDetailsShort);

  return (
    <ConfluencePageTree
      contentId="123"
      cloudId="123-456"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
    />
  );
};

const WithChildren = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(
    PAGE_LIST_API,
    { query: { cqlcontext: '{"contentStatuses":["draft", "current"]}' } },
    (url: string) => {
      let response;
      if (url.includes('CCC')) {
        response = createPageListMockResponse(5, { idPrefix: 'parent' });
        setChildrenProp(response.results[0], true);
        setChildrenProp(response.results[1], true);
      } else if (url.includes('parent-2')) {
        response = { status: 500 };
      } else {
        response = createPageListMockResponse(2, { idPrefix: 'child' });
      }
      return response;
    },
  );

  fetchMock.get(PAGE_DETAILS_API, (url: string) => {
    const cql = decodeURIComponent(url.split('cql=')[1].split('&')[0]);
    if (cql.includes('parent')) {
      return createPageDetailsMockResponse(5, { idPrefix: 'parent' });
    }
    return createPageDetailsMockResponse(2, { idPrefix: 'child' });
  });

  return (
    <ConfluencePageTree
      contentId="CCC"
      cloudId="123-456"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
    />
  );
};

const LongList = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(
    PAGE_LIST_API,
    { query: { cqlcontext: '{"contentStatuses":["draft", "current"]}' } },
    (url: string) => {
      const start = url.split('start=')[1].split('&')[0];
      if (start === '0') {
        return createPageListMockResponse(200, { idPrefix: 'long' });
      }

      return new Promise((resolve) => {
        setTimeout(() => resolve(createPageListShort), 2000);
      });
    },
  );
  fetchMock.get(PAGE_DETAILS_API, (url: string) => {
    const cql = decodeURIComponent(url.split('cql=')[1].split('&')[0]);

    if (cql.includes('long-1')) {
      return createPageDetailsMockResponse(200, { idPrefix: 'long' });
    }

    return createPageDetailsShort();
  });

  return (
    <ConfluencePageTree
      contentId="123123"
      cloudId="123-456"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
    />
  );
};

const ErrorState = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(
    PAGE_LIST_API,
    { query: { cqlcontext: '{"contentStatuses":["draft", "current"]}' } },
    () => ({ status: 500 }),
  );
  fetchMock.get(PAGE_DETAILS_API, () => ({ status: 500 }));

  return (
    <ConfluencePageTree
      contentId="111"
      cloudId="AAA"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
    />
  );
};

const EmptyState = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(
    PAGE_LIST_API,
    { query: { cqlcontext: '{"contentStatuses":["draft", "current"]}' } },
    () => emptyResponse,
  );
  fetchMock.get(PAGE_DETAILS_API, () => emptyResponse);

  return (
    <ConfluencePageTree
      contentId="111"
      cloudId="AAA"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
    />
  );
};

const EmptyStateAndReadOnly = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(
    PAGE_LIST_API,
    { query: { cqlcontext: '{"contentStatuses":["draft", "current"]}' } },
    () => emptyResponse,
  );
  fetchMock.get(PAGE_DETAILS_API, () => emptyResponse);

  return (
    <ConfluencePageTree
      contentId="111"
      cloudId="AAA"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
      readOnly
    />
  );
};

const WithPartialData = () => {
  fetchMock.restore();
  fetchMock.post(DIRECTORY_API, () => directoryMockData);
  fetchMock.get(
    PAGE_LIST_API,
    { query: { cqlcontext: '{"contentStatuses":["draft", "current"]}' } },
    createPageListShort,
  );
  fetchMock.get(PAGE_DETAILS_API, () => {
    const missingData = createPageDetailsShort();

    setPartialHistoryData(missingData);
    return missingData;
  });

  return (
    <ConfluencePageTree
      contentId="123"
      cloudId="123-456"
      spaceKey="AAA"
      onError={action('page-tree-error')}
      onStateChanged={action('state-changed')}
    />
  );
};

export {
  EmptyProps,
  EmptyState,
  LongList,
  ShortList,
  WithChildren,
  WithPartialData,
  ErrorState,
  EmptyStateAndReadOnly,
};

export default {
  title: 'Confluence Table Tree',
  decorators: [withConsoleAnalytics],
};
