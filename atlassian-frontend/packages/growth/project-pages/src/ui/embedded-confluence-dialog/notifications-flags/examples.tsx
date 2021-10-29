import React from 'react';
import { action } from '@storybook/addon-actions';
import Button, { ButtonGroup } from '@atlaskit/button';
import { FlagsProvider } from '@atlaskit/flag';
import { useEmbeddedPagesFlags } from './index';
import { generateMetadata } from '../../../common/util/storybook';

import {
  FeatureFlagsProvider,
  FeatureFlags,
} from '../../../controllers/feature-flags';

const featureFlagsContext: FeatureFlags = {
  isProjectPagesProductionisation: true,
  isEmbeddedPagesExperiment: true,
  isGranularPagesExperiment: true,
  isJswConfluenceSilentBundlingExperiment: true,
  fireFeatureExposed: action('fire-feature-exposed'),
};

export default generateMetadata('ProjectPagesComponent/EmbeddedPagesFlags');

const Flag = () => {
  const {
    showPagePublishedFlag,
    showDraftSavedFlag,
    showPageDeletedFlag,
  } = useEmbeddedPagesFlags();
  return (
    <ButtonGroup>
      <Button onClick={() => showPagePublishedFlag()}>
        {'Page published'}
      </Button>
      <Button onClick={() => showDraftSavedFlag()}>{'Draft saved'}</Button>
      <Button onClick={() => showDraftSavedFlag(action('Open draft'))}>
        {'Draft saved (with action)'}
      </Button>
      <Button onClick={() => showPageDeletedFlag()}>{'Page deleted'}</Button>
    </ButtonGroup>
  );
};

export const DefaultFlag = () => (
  <FeatureFlagsProvider value={{ ...featureFlagsContext }}>
    <FlagsProvider>
      <Flag />
    </FlagsProvider>
  </FeatureFlagsProvider>
);
