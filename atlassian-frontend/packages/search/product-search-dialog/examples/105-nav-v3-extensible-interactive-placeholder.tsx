import React, { FunctionComponent, useEffect, useState } from 'react';
import { boolean, number } from '@storybook/addon-knobs';
import { presetConfig } from './storybook-utils/instance-config';
import { themeExamples } from './storybook-utils/themes';
import { NavV3 } from './104-nav-v3-integrated-extensible-cross-product';
import {
  ProductInputSearchSkeletonFeatures,
  ProductSearchInputSkeleton,
} from '../src/common/product-search-input-skeleton';

// Mimic env variable in app to check for SSR
const PROCESS_ENV_SSR = true;

// Simulate the search dialog being downloaded asynchronously
const SearchDrawer = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // eslint-disable-next-line import/dynamic-import-chunkname
  return await import('./104-nav-v3-integrated-extensible-cross-product').then(
    ({ SearchDrawer }) => ({
      default: SearchDrawer,
    }),
  );
});

const user = {
  name: 'confluence_storybook',
  email: 'storybook_test_user@examples.com',
  id: '123456789',
  avatarUrl: 'path/to/image/',
};

const confluenceConfig = {
  aggregatorUrl: presetConfig.sdog.searchAggregatorServiceUrl,
  collaborationGraphUrl: presetConfig.sdog.collaborationGraphUrl,
  useCollaborationGraphForRecents: false,
  baseUrl: `${presetConfig.sdog.baseUrl}/wiki`,
  cloudId: presetConfig.sdog.cloudId,
  isUserAnonymous: false,
};

const jiraConfig = {
  aggregatorUrl: presetConfig.sdog.searchAggregatorServiceUrl,
  cloudId: presetConfig.sdog.cloudId,
  baseUrl: presetConfig.sdog.baseUrl,
  collaborationGraphUrl: presetConfig.sdog.collaborationGraphUrl,
  accountId: presetConfig.sdog.accountId,
  isUserAnonymous: false,
};

// There is no themeExamples.default
// const theming = themeExamples[86400].mode.search;

export default () => {
  const storybookOptionsId = 'Storybook options';
  // enable sticky search knob
  const stickySearchEnabled: boolean = boolean(
    'Enable sticky search',
    false,
    storybookOptionsId,
  );
  // dialog load timeout knob
  const hideSkeletonTimeout: number = number(
    'Search dialog load timeout',
    5000,
    { step: 1000 },
    storybookOptionsId,
  );

  const inputSkeletonFeatures: ProductInputSearchSkeletonFeatures = {
    interactiveSkeleton: {
      enabled: PROCESS_ENV_SSR,
      advancedSearchUrl: '/confluence/search',
      placeholder: 'Search',
    },
  };

  const SimulateSkeleton: FunctionComponent = ({ children }) => {
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setShowSkeleton(false);
      }, hideSkeletonTimeout);
    }, []);

    return showSkeleton ? (
      <ProductSearchInputSkeleton features={inputSkeletonFeatures} />
    ) : (
      <>{children}</>
    );
  };

  return (
    <NavV3
      theme={themeExamples.default}
      renderSearch={() => (
        <React.Suspense
          fallback={
            <ProductSearchInputSkeleton features={inputSkeletonFeatures} />
          }
        >
          <div>
            <SimulateSkeleton>
              <SimulateSkeleton>
                <SearchDrawer
                  locale="en"
                  confluenceConfig={confluenceConfig}
                  jiraConfig={jiraConfig}
                  theme={themeExamples.default}
                  confluenceFeatures={{}}
                  jiraFeatures={{ hasSoftwareAccess: false }}
                  dialogFeatures={{
                    ...inputSkeletonFeatures,
                  }}
                  keepSearchOpen={false}
                  stickySearchEnabled={stickySearchEnabled}
                  keepExpandedInTab={false}
                  skipPermissionsCheck={false}
                  user={user}
                  products={['CONFLUENCE', 'JIRA', 'BITBUCKET']}
                  replicatePreQueryNoResults={false}
                  replicatePostQueryNoResults={false}
                  replicatePostQueryFailure={false}
                  replicatePreQueryFailure={false}
                />
              </SimulateSkeleton>
            </SimulateSkeleton>
          </div>
        </React.Suspense>
      )}
    />
  );
};
