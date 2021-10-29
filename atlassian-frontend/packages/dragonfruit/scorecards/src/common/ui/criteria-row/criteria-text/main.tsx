import React from 'react';

import { CompassScorecardCriteriaTypeName } from '@atlassian/dragonfruit-graphql';

import { CriteriaFragment } from '../../../../common/ui/types';

import { HasDescriptionText } from './has-description-text';
import { HasLinkText } from './has-link-text';
import { HasOwnerText } from './has-owner-text';

interface Props {
  criteria: CriteriaFragment;
  testId?: string;
}

const CriteriaText: React.FC<Props> = ({ criteria, testId }) => {
  let text;

  switch (criteria.__typename) {
    case CompassScorecardCriteriaTypeName.HAS_DESCRIPTION:
      text = <HasDescriptionText />;
      break;
    case CompassScorecardCriteriaTypeName.HAS_OWNER:
      text = <HasOwnerText />;
      break;
    case CompassScorecardCriteriaTypeName.HAS_LINK:
      text = <HasLinkText linkType={criteria.linkType} />;
      break;
  }

  return <div data-testid={testId}>{text}</div>;
};

export default CriteriaText;
