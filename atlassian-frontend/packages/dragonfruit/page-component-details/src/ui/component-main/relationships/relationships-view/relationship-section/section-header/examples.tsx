import React, { ReactElement } from 'react';

import { boolean } from '@storybook/addon-knobs';

import {
  CompassRelationshipDirection,
  CompassRelationshipType,
} from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { getRelationshipDirectionStorybookKnob } from '../../../../../../common/utils/relationships/test-utils';

import { SectionHeader, SectionHeaderProps } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <div style={{ maxWidth: 700 }}>{storyFn()}</div>
    ),
  ],
  excludeStories: 'SectionHeaderTemplate',
};

// This template creates an scenario with default values but all of them can be overridden
// It's used on the test, and it's excluded from the storybooks
export const SectionHeaderTemplate = ({
  relationshipType = CompassRelationshipType.DEPENDS_ON,
  direction = CompassRelationshipDirection.OUTWARD,
  isSectionEmpty = false,
  isManaged = false,
  actionLabel = 'add',
  onActionClick = () => {},
  testId = 'prefix',
}: Partial<SectionHeaderProps>) => {
  return (
    <CompassTestProvider>
      <SectionHeader
        relationshipType={relationshipType}
        direction={direction}
        isSectionEmpty={isSectionEmpty}
        isManaged={isManaged}
        actionLabel={actionLabel}
        onActionClick={onActionClick}
        testId={testId}
      />
    </CompassTestProvider>
  );
};

export const SectionHeaderExample = () => {
  const direction = getRelationshipDirectionStorybookKnob();
  const isManaged = boolean('Managed?', false, 'Props'); //Label, defaultValue, groupId
  const isSectionEmpty = boolean('Section Empty?', false, 'Props');

  return (
    <SectionHeaderTemplate
      direction={direction}
      isManaged={isManaged}
      isSectionEmpty={isSectionEmpty}
    />
  );
};
