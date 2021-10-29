import React from 'react';

import { Size } from '@atlaskit/icon';
import PageIcon from '@atlaskit/icon/glyph/page-filled';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import * as colors from '@atlaskit/theme/colors';
import { CompassScorecardImportance } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

interface Props {
  importance: CompassScorecardImportance;
  size?: Size;
}

export const ScorecardStandardIcon: React.FC<Props> = ({
  importance,
  size,
}) => {
  const { formatMessage } = useIntl();
  switch (importance) {
    case CompassScorecardImportance.REQUIRED:
      return (
        <StarFilledIcon
          label={formatMessage(messages.requiredIcon)}
          primaryColor={colors.P300}
          size={size ? size : 'medium'}
          testId="page-scorecard-templates.ui.scorecard-summary.required-standard-icon"
        />
      );
    case CompassScorecardImportance.RECOMMENDED:
      return (
        <StarFilledIcon
          label={formatMessage(messages.recommendedIcon)}
          primaryColor={colors.Y200}
          size={size ? size : 'medium'}
          testId="page-scorecard-templates.ui.scorecard-summary.recommended-standard-icon"
        />
      );
    case CompassScorecardImportance.USER_DEFINED:
      return (
        <PageIcon
          label={formatMessage(messages.userDefinedIcon)}
          size={size ? size : 'medium'}
          testId="page-scorecard-templates.ui.scorecard-summary.user-standard-icon"
        />
      );
    /*
    TODO: Remove the default, once the backend is wired appropriately
    */
    default:
      return (
        <PageIcon
          label={formatMessage(messages.userDefinedIcon)}
          size={size ? size : 'medium'}
          testId="page-scorecard-templates.ui.scorecard-summary.user-standard-icon"
        />
      );
  }
};
