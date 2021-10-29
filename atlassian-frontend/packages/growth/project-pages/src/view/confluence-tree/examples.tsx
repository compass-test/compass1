import React from 'react';
import { action } from '@storybook/addon-actions';
import fetchMock from 'fetch-mock/cjs/client';
import { OK } from '../../state/confluence/connected-space/types';
import ConfluenceTree from './index';
import {
  createPageDetailsMockResponse,
  createPageListMockResponse,
} from '../../common/mock/mock-data';
import { generateMetadata } from '../../common/util/storybook';
import { consoleAnalyticsClient } from '../../storybook-utils/analytics';
import { CONFTREE_DISPLAY_PAGETREE } from '../../state/ui/types';
import { Props } from './types';

type EmbeddedProductUpdaterProps = {
  embeddedProduct: string;
};

const PAGE_LIST_API = 'express:/wiki/rest/api/content/:contentId/child/page';
const PAGE_DETAILS_API = 'express:/wiki/rest/api/content/search';

const createPageListShort = () =>
  createPageListMockResponse(15, { idPrefix: 'short' });
const createPageDetailsShort = () =>
  createPageDetailsMockResponse(15, { idPrefix: 'short' });

const defaultProps: Props = {
  contentId: null,
  cloudId: null,
  spaceKey: null,
  analyticsClient: consoleAnalyticsClient,
  onError: action('confluence.page.tree.error'),
  permissionState: OK,
  locale: 'en',
  EmbeddedProductUpdater: ({
    embeddedProduct,
  }: EmbeddedProductUpdaterProps) => (
    <p>
      <strong>
        [EmbeddedProductUpdater Component Placeholder for {`${embeddedProduct}`}
        ]
      </strong>
      <br />
      You should only see this in Storybook when there are pages listed above
    </p>
  ),
  projectPagesContent: CONFTREE_DISPLAY_PAGETREE,
};

const dummyProps: any = {
  ...defaultProps,
  contentId: '7929913',
  cloudId: 'DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b',
  spaceKey: 'DUMMY_SPACE',
};

export default generateMetadata('ProjectPagesComponent/ConfluenceTree');

export const DefaultConfluenceTree = (props: any) => (
  <ConfluenceTree {...defaultProps} {...props} />
);

export const ConfluenceTreeEmpty = () => {
  fetchMock.restore();
  fetchMock.get(
    PAGE_LIST_API,
    () => createPageListMockResponse(0, { idPrefix: 'short' }),
    { delay: 200 },
  );
  fetchMock.get(PAGE_DETAILS_API, () =>
    createPageDetailsMockResponse(0, { idPrefix: 'short' }),
  );
  return <ConfluenceTree {...dummyProps} />;
};

export const ConfluenceTreeError = () => {
  fetchMock.restore();
  fetchMock.get(PAGE_LIST_API, 400, { delay: 500 });
  return <ConfluenceTree {...dummyProps} />;
};

export const ConfluenceTreeWithDummyValues = () => {
  fetchMock.restore();
  fetchMock.get(PAGE_LIST_API, createPageListShort);
  fetchMock.get(PAGE_DETAILS_API, createPageDetailsShort);
  return <ConfluenceTree {...dummyProps} />;
};
