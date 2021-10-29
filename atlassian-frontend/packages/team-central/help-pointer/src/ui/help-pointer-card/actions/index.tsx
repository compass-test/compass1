import React, { useState } from 'react';

import Button from '@atlaskit/button';
import {
  DropdownItem,
  DropdownItemGroup,
  DropdownMenuStateless,
} from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';

const HelpPointerActions = ({
  testId,
  onEdit,
  onRemove,
}: {
  testId?: string;
  onRemove?: () => void;
  onEdit?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = ({
    event,
    isOpen,
  }: {
    event?: React.SyntheticEvent;
    isOpen: boolean;
  }) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setIsOpen(isOpen);
  };

  const preventClickThrough = (onClick: () => void) => (
    event?: React.SyntheticEvent,
  ) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    onClick();
  };

  return (
    <DropdownMenuStateless
      isOpen={isOpen}
      onOpenChange={onToggle}
      trigger={
        <Button
          testId={testId && `${testId}-help-pointer-actions-menu-button`}
          spacing="compact"
          iconBefore={<MoreIcon label="More" size={'small'} />}
        />
      }
      testId={testId}
      position="bottom right"
    >
      <DropdownItemGroup>
        {onEdit && (
          <DropdownItem
            id={testId && `${testId}-help-pointer-action-edit`}
            onClick={preventClickThrough(onEdit)}
          >
            Edit
          </DropdownItem>
        )}
        {onRemove && (
          <DropdownItem
            id={testId && `${testId}-help-pointer-action-remove`}
            onClick={preventClickThrough(onRemove)}
          >
            Remove
          </DropdownItem>
        )}
      </DropdownItemGroup>
    </DropdownMenuStateless>
  );
};

export default HelpPointerActions;
