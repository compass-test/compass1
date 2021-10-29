import React from 'react';

import { FormattedMessage } from 'react-intl';

import Flag, { FlagGroup } from '@atlaskit/flag';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import * as colors from '@atlaskit/theme/colors';

import {
  OverLimitFlagTypes,
  useOverLimitFlags,
} from '../../controllers/over-limit';
import { usePlanMeta } from '../../controllers/plan-meta';

import msgs from './messages';

/**
 * feature clean up new-plan-wizard-issue-overlimit_8tze9
 * This OverLimitFlagGroup will open the warning flags whenever the users hit issue/project limits
 */
const OverLimitFlagGroup: React.FC<{}> = () => {
  const { flags, shift } = useOverLimitFlags();
  const { projectLimit, issueLimit } = usePlanMeta();

  return (
    <FlagGroup onDismissed={shift}>
      {flags.map((flag) => {
        switch (flag) {
          case OverLimitFlagTypes.project:
            return (
              <Flag
                id={'project-limit-flag'}
                key={'project-limit-flag'}
                icon={
                  <WarningIcon primaryColor={colors.Y300} label="Warning" />
                }
                title={<FormattedMessage {...msgs.title} />}
                description={
                  <FormattedMessage
                    {...msgs.tooManyProjects}
                    values={{ limit: projectLimit }}
                  />
                }
              />
            );

          case OverLimitFlagTypes.issue:
            return (
              <Flag
                id={'issue-limit-flag'}
                key={'issue-limit-flag'}
                icon={
                  <WarningIcon primaryColor={colors.Y300} label="Warning" />
                }
                title={<FormattedMessage {...msgs.title} />}
                description={
                  <FormattedMessage
                    {...msgs.tooManyIssues}
                    values={{ limit: issueLimit }}
                  />
                }
              />
            );
        }
      })}
    </FlagGroup>
  );
};

export default OverLimitFlagGroup;
