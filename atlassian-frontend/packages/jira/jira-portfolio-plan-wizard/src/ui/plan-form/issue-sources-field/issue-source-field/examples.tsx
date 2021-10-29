import React from 'react';

import { fireEvent } from '@testing-library/react';

import {
  boards,
  buildAPI,
  featureFlags,
  StoryMetadata,
  teams,
} from '../../../../common/mocks';
import { TeamPicker } from '../../../../common/mocks/team-picker';
import Scenario from '../../../../common/utils/scenario';
import {
  action,
  withIntl,
  withMaxWidth,
} from '../../../../common/utils/storybook';
import Vr from '../../../../common/utils/vr';
import { APIProvider } from '../../../../controllers/api';
import { ComponentsProvider } from '../../../../controllers/components';
import { FeatureFlagsProvider } from '../../../../controllers/feature-flags';

import IssueSourceField from './index';

export const basic = () => (
  <APIProvider api={buildAPI()}>
    <IssueSourceField
      rowIndex={1}
      value={{ id: 0, type: 'Board', value: '', hasNextGenProjects: false }}
      onChange={action('onChange')}
      removable
      onRequestRemove={action('onRequestRemove')}
    />
  </APIProvider>
);

export const typeOptionsMenuIsOpen = () => (
  <Vr clip={{ x: 0, y: 0, width: 508, height: 168 }}>
    <Scenario
      act={async ({ getByText }) => {
        fireEvent.mouseDown(getByText('Board') as Element);
      }}
    >
      {basic()}
    </Scenario>
  </Vr>
);

export const withValue = () => (
  <APIProvider api={buildAPI()}>
    <IssueSourceField
      rowIndex={1}
      value={{
        id: 0,
        type: 'Board',
        value: String(boards[0].id),
        hasNextGenProjects: false,
        team: teams[0],
      }}
      onChange={action('onChange')}
      removable
      onRequestRemove={action('onRequestRemove')}
    />
  </APIProvider>
);

export const valueOptionsLoading = () => (
  <APIProvider api={buildAPI(undefined, 1000000)}>
    <IssueSourceField
      rowIndex={1}
      value={{ id: 0, type: 'Board', value: '', hasNextGenProjects: false }}
      onChange={action('onChange')}
      removable
      onRequestRemove={action('onRequestRemove')}
    />
  </APIProvider>
);

export const ValueOptionsLoadingAndMenuIsOpen = () => (
  <Vr clip={{ x: 0, y: 0, width: 508, height: 168 }}>
    <Scenario
      act={async ({ getByText }) => {
        fireEvent.mouseDown(getByText('Choose board...') as Element);
      }}
    >
      {valueOptionsLoading()}
    </Scenario>
  </Vr>
);

export const hideTeam = () => (
  <APIProvider api={buildAPI()}>
    <IssueSourceField
      rowIndex={0}
      showTeam={false}
      value={{
        id: 0,
        type: 'Board',
        value: String(boards[0].id),
        hasNextGenProjects: false,
      }}
      onChange={action('onChange')}
      removable
      onRequestRemove={action('onRequestRemove')}
    />
  </APIProvider>
);

export default {
  title: 'Issue Source Field',
  decorators: [
    (storyFn) => (
      <FeatureFlagsProvider featureFlags={featureFlags}>
        <ComponentsProvider teamPicker={TeamPicker}>
          {storyFn()}
        </ComponentsProvider>
      </FeatureFlagsProvider>
    ),
    withIntl,
    withMaxWidth(),
  ],
} as StoryMetadata;
