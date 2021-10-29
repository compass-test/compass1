// eslint-disable-next-line import/no-extraneous-dependencies
import { select } from '@storybook/addon-knobs';

import { CompassRelationshipDirection } from '@atlassian/dragonfruit-graphql';

export const getRelationshipDirectionStorybookKnob = () => {
  const options = [
    CompassRelationshipDirection.OUTWARD,
    CompassRelationshipDirection.INWARD,
  ];
  const defaultValue = CompassRelationshipDirection.OUTWARD;
  const groupId = 'Props';
  return select('Direction', options, defaultValue, groupId);
};
