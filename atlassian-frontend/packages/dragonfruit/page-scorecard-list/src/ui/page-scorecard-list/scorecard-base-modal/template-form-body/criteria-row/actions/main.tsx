import React, { useState } from 'react';

import Button from '@atlaskit/button';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { ActionsButtonWrapper } from './styled';

interface Props {
  testId?: string;
  onDelete: () => void;
}

const Actions: React.FC<Props> = ({ testId, onDelete }) => {
  const actionsMenuTestId = testId ? `${testId}.menu` : testId;
  const deleteActionTestId = testId ? `${testId}.delete` : testId;
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu
      trigger={
        <ActionsButtonWrapper>
          <Button isSelected={isOpen} appearance="subtle" spacing="none">
            <MoreIcon
              label={formatMessage(messages.actionsMenu)}
              testId={actionsMenuTestId}
              size="medium"
            />
          </Button>
        </ActionsButtonWrapper>
      }
      position="bottom right"
      onOpenChange={(dropdownOpenArgs) => setIsOpen(dropdownOpenArgs.isOpen)}
    >
      <DropdownItemGroup>
        <DropdownItem onClick={onDelete}>
          <span data-testid={deleteActionTestId}>
            {formatMessage(CommonMessages.remove)}
          </span>
        </DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

export default Actions;
