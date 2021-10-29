import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'fetch-mock/cjs/client';

import { PageTree } from './index';
import {
  ProjectPagesProvider,
  ProjectPagesContextTypes,
} from '../../controllers/project-pages';
import {
  FeatureFlags,
  FeatureFlagsProvider,
} from '../../controllers/feature-flags';
import {
  createPageDetailsMockResponse,
  createPageListMockResponse,
} from '../../common/mock/mock-data';
import { generateMetadata } from '../../common/util/storybook';
import { consoleAnalyticsClient } from '../../storybook-utils/analytics';
import { Props as PageTreeProps } from './types';

type EmbeddedProductUpdaterProps = {
  embeddedProduct: string;
};

const PAGE_LIST_API = 'express:/wiki/rest/api/content/:contentId/child/page';
const PAGE_DETAILS_API = 'express:/wiki/rest/api/content/search';

const EmbeddedProductUpdater = ({
  embeddedProduct,
}: EmbeddedProductUpdaterProps) => (
  <p>
    <strong>
      [EmbeddedProductUpdater Component Placeholder for {`${embeddedProduct}`}]
    </strong>
    <br />
    You should only see this in Storybook when there are pages listed above
  </p>
);

const featureFlagsContext: FeatureFlags = {
  isProjectPagesProductionisation: true,
  isEmbeddedPagesExperiment: true,
  isGranularPagesExperiment: true,
  isJswConfluenceSilentBundlingExperiment: true,
  fireFeatureExposed: action('fire-feature-exposed'),
};

const pagesContext: ProjectPagesContextTypes = {
  cloudId: 'DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b',
  locale: 'en_US', // TODO unclear why translations aren't working
};

const pageTreeProps: PageTreeProps = {
  contentId: '7929913',
  spaceKey: 'DUMMY_SPACE',
  EmbeddedProductUpdater,
  analyticsClient: consoleAnalyticsClient,
  // TODO readOnly and onError have very limited use, if any
  readOnly: false,
  onError: action('onError'),
};

const BasePageTree = () => (
  <ProjectPagesProvider value={pagesContext}>
    <FeatureFlagsProvider value={featureFlagsContext}>
      <PageTree {...pageTreeProps} />
    </FeatureFlagsProvider>
  </ProjectPagesProvider>
);

export const PageTreeContent = () => {
  fetchMock.restore();
  fetchMock.get(PAGE_LIST_API, createPageListMockResponse(15), {
    delay: 1000,
  });
  fetchMock.get(PAGE_DETAILS_API, createPageDetailsMockResponse(15));
  return <BasePageTree />;
};

export const PageTreeEmpty = () => {
  fetchMock.restore();
  fetchMock.get(PAGE_LIST_API, createPageListMockResponse(0), {
    delay: 1000,
  });
  fetchMock.get(PAGE_DETAILS_API, createPageDetailsMockResponse(0));
  return <BasePageTree />;
};

export const PageTreeError = () => {
  fetchMock.restore();
  fetchMock.get(PAGE_LIST_API, 400, {
    delay: 1000,
  });
  return <BasePageTree />;
};

export default generateMetadata('EmbeddedPages/PageTree');
