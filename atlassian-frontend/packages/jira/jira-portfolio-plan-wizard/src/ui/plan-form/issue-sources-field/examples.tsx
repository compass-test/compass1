import React from 'react';

import { fireEvent, within } from '@testing-library/react';

import {
  boards,
  buildAPI,
  featureFlags,
  issueSources,
  StoryMetadata,
  TeamPicker,
  teams,
} from '../../../common/mocks';
import Scenario from '../../../common/utils/scenario';
import {
  action,
  withIntl,
  withMaxWidth,
} from '../../../common/utils/storybook';
import Vr from '../../../common/utils/vr';
import { APIProvider } from '../../../controllers/api';
import { ComponentsProvider } from '../../../controllers/components';
import { FeatureFlagsProvider } from '../../../controllers/feature-flags';

import IssueSourcesField from './index';

export const basic = () => (
  <APIProvider api={buildAPI()}>
    <IssueSourcesField
      value={[
        {
          id: 0,
          type: 'Board',
          value: '',
          hasNextGenProjects: false,
        },
      ]}
      onChange={action('onChange')}
    />
  </APIProvider>
);

export const hasOneSelected = () => (
  <APIProvider api={buildAPI()}>
    <IssueSourcesField
      value={[
        {
          id: 0,
          type: 'Board',
          value: String(boards[0].id),
          hasNextGenProjects: false,
          team: teams[0],
        },
      ]}
      onChange={action('onChange')}
    />
  </APIProvider>
);

export const hasOneSelectedAndAddAnother = () => (
  <APIProvider api={buildAPI()}>
    <IssueSourcesField
      value={[
        {
          id: 0,
          type: 'Board',
          value: String(boards[0].id),
          hasNextGenProjects: false,
          team: teams[0],
        },
        {
          id: 0,
          type: 'Board',
          value: '',
          hasNextGenProjects: false,
        },
      ]}
      onChange={action('onChange')}
    />
  </APIProvider>
);

export const hasMultipleSelected = (confirmOnRemove?: boolean) => (
  <APIProvider api={buildAPI()}>
    <IssueSourcesField
      value={[
        {
          id: 0,
          type: 'Board',
          value: String(boards[0].id),
          hasNextGenProjects: false,
          team: teams[0],
        },
        {
          id: 0,
          type: 'Board',
          value: String(boards[2].id),
          hasNextGenProjects: false,
          team: teams[1],
        },
      ]}
      onChange={action('onChange')}
      confirmOnRemove={confirmOnRemove}
    />
  </APIProvider>
);

export const AllSources = () => (
  <APIProvider api={buildAPI()}>
    <IssueSourcesField value={issueSources} onChange={action('onChange')} />
  </APIProvider>
);

export const hideTeams = () => (
  <APIProvider api={buildAPI()}>
    <IssueSourcesField
      showTeams={false}
      value={[
        {
          id: 0,
          type: 'Board',
          value: String(boards[0].id),
          hasNextGenProjects: false,
        },
      ]}
      onChange={action('onChange')}
    />
  </APIProvider>
);

export const confirmOnRemove = () => (
  <Vr clip={{ x: 0, y: 0, width: 1240, height: 300 }}>
    <Scenario
      act={async ({ getByTestId }) => {
        const issueSourceField = getByTestId(
          'issue-source_1_value',
        ) as HTMLInputElement;
        const removeButton = within(issueSourceField).getByLabelText('clear');
        fireEvent.mouseDown(removeButton);
      }}
    >
      {hasMultipleSelected(true)}
    </Scenario>
  </Vr>
);

export default {
  title: 'Issue Sources Field',
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
