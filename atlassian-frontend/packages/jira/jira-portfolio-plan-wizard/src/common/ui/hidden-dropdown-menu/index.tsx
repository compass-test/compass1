import React, { useState } from 'react';

import Button from '@atlaskit/button';
import DropdownMenu, {
  DropdownMenuStatefulProps,
} from '@atlaskit/dropdown-menu';
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';

import { HiddenButtonContainer } from './styled';

const HiddenDropdownMenu = ({
  children,
  iconAltLabel,
  defaultOpen,
  isVisible,
  className,
  ...rest
}: Partial<DropdownMenuStatefulProps> & {
  iconAltLabel: string;
  isVisible?: boolean;
  className?: string;
}) => {
  const [visible, setVisible] = useState(isVisible);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const onMouseEnter = () => {
    setVisible(true);
  };

  const onMouseLeave = () => {
    setVisible(false);
  };

  return (
    <DropdownMenu
      {...rest}
      defaultOpen={defaultOpen}
      onOpenChange={({ isOpen }) => {
        setIsOpen(isOpen);
      }}
      trigger={
        <HiddenButtonContainer
          visible={!!(isVisible || isOpen || visible)}
          className={className}
        >
          <Button
            iconBefore={<EditorMoreIcon label={iconAltLabel} />}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </HiddenButtonContainer>
      }
    >
      {children}
    </DropdownMenu>
  );
};

export default HiddenDropdownMenu;
