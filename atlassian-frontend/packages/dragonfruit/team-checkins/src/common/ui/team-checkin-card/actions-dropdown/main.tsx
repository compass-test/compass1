import React from 'react';

import DropdownMenu, { DropdownItem } from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { MenuGroup, Section } from '@atlaskit/menu';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useIntl } from '@atlassian/dragonfruit-utils';

interface Props {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
  onEdit: (teamCheckinId: string) => void;
  onDelete: (teamCheckinId: string) => void;
  teamCheckinId: string;
}

function ActionsDropdown({
  testId = 'actions-dropdown',
  onEdit,
  onDelete,
  teamCheckinId,
}: Props) {
  const { formatMessage } = useIntl();

  const dropdownTestId = testId;
  const editTestId = testId && `${testId}.edit`;
  const deleteTestId = testId && `${testId}.delete`;

  return (
    <DropdownMenu
      triggerType="button"
      triggerButtonProps={{
        iconAfter: <MoreIcon label="Actions" />,
      }}
      position="bottom right"
      testId={dropdownTestId}
    >
      <MenuGroup>
        <Section>
          <DropdownItem
            onClick={() => onEdit(teamCheckinId)}
            data-testid={editTestId}
          >
            {formatMessage(CommonMessages.edit)}
          </DropdownItem>

          <DropdownItem
            onClick={() => onDelete(teamCheckinId)}
            data-testid={deleteTestId}
          >
            {formatMessage(CommonMessages.remove)}
          </DropdownItem>
        </Section>
      </MenuGroup>
    </DropdownMenu>
  );
}

export default ActionsDropdown;
