import React from 'react';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import {
  buildAtlassianTeamProfileURL,
  openInNewTab,
  useIntl,
} from '@atlassian/dragonfruit-utils';

import messages from './messages';

interface Props {
  accountId: string;
  teamName: string;
  testId?: string;
}

export const Actions: React.FC<Props> = ({ accountId, teamName, testId }) => {
  const { formatMessage } = useIntl();

  const menuTestId = testId && `${testId}.menu`;
  const teamProfileTestId = testId && `${testId}.edit-profile`;
  const teamSitePage = buildAtlassianTeamProfileURL(accountId);
  const teamProfile = () => openInNewTab(teamSitePage);

  return (
    <DropdownMenu
      triggerType="button"
      triggerButtonProps={{
        appearance: 'subtle',
        iconBefore: (
          <MoreIcon
            label={formatMessage(messages.actionsLabel, {
              team: teamName,
            })}
            size="small"
            testId={menuTestId}
          />
        ),
        spacing: 'compact',
      }}
      position="bottom right"
    >
      <DropdownItemGroup>
        <DropdownItem
          onClick={teamProfile}
          elemAfter={<ShortcutIcon label="" size="small" />}
          data-testid={teamProfileTestId}
        >
          {formatMessage(messages.editTeamProfile)}
        </DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  );
};
