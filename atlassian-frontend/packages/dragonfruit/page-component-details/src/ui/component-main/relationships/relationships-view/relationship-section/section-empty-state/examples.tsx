import React, { ReactElement } from 'react';

import { boolean } from '@storybook/addon-knobs';

import {
  CompassRelationshipDirection,
  CompassRelationshipType,
} from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { FAKE_DATA_MANAGER } from '../../../../../../common/mocks';
import { getRelationshipDirectionStorybookKnob } from '../../../../../../common/utils/relationships/test-utils';

import { SectionEmptyState, SectionEmptyStateProps } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <div style={{ maxWidth: 700 }}>{storyFn()}</div>
    ),
  ],
  excludeStories: 'SectionEmptyStateTemplate',
};

// This template creates an scenario with default values but all of them can be overridden
// It's used on the test, and it's excluded from the storybooks
export const SectionEmptyStateTemplate = ({
  relationshipType = CompassRelationshipType.DEPENDS_ON,
  direction = CompassRelationshipDirection.OUTWARD,
  dataManager = null,
  actionLabel = 'addDependency',
  onClick = () => {},
  testId = 'prefix',
}: Partial<SectionEmptyStateProps>) => {
  return (
    <CompassTestProvider>
      <SectionEmptyState
        relationshipType={relationshipType}
        direction={direction}
        dataManager={dataManager}
        actionLabel={actionLabel}
        onClick={onClick}
        testId={testId}
      />
    </CompassTestProvider>
  );
};

export const SectionEmptyStateExample = () => {
  const direction = getRelationshipDirectionStorybookKnob();
  const isManaged = boolean('Managed?', false, 'Props'); //Label, defaultValue, groupId
  const dataManager = isManaged ? FAKE_DATA_MANAGER : null;

  return (
    <SectionEmptyStateTemplate
      direction={direction}
      dataManager={dataManager}
    />
  );
};
