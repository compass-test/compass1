import React, { useCallback, useState } from 'react';

import { PrimaryDropdownButton } from '@atlaskit/atlassian-navigation';
import CheckIcon from '@atlaskit/icon/glyph/check';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import { LinkItem, MenuGroup, Section } from '@atlaskit/menu';
import { Popup, TriggerProps } from '@atlaskit/popup';
import { useDevMode } from '@atlassian/dragonfruit-utils';

import { Checkbox, CheckboxIcon, CheckboxLabel, MenuContainer } from './styled';

const getCheckboxIcon = (checked: boolean) => (
  <CheckboxIcon>
    {checked ? <CheckIcon label="" /> : <CrossIcon label="" />}
  </CheckboxIcon>
);

const DevModeMenuContent = ({ onClick }: { onClick: () => void }) => {
  const [devModeState, { toggleShowErrorBoundaries }] = useDevMode();
  const { showErrorBoundaries } = devModeState;
  return (
    <MenuContainer>
      <MenuGroup onClick={onClick}>
        <Section>
          <LinkItem onClick={toggleShowErrorBoundaries}>
            <Checkbox>
              {getCheckboxIcon(showErrorBoundaries)}
              <CheckboxLabel>
                {/* No I18n as it's only visible to devs */}
                Show error boundaries
              </CheckboxLabel>
            </Checkbox>
          </LinkItem>
        </Section>
      </MenuGroup>
    </MenuContainer>
  );
};

export const DevModePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  const content = useCallback(() => <DevModeMenuContent onClick={onClose} />, [
    onClose,
  ]);

  const trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <PrimaryDropdownButton
        onClick={toggleOpen}
        isSelected={isOpen}
        tooltip="Dev mode settings. Not visible in production." // No I18n as it's only visible to devs
        {...triggerProps}
      >
        Dev Mode {/* No I18n as it's only visible to devs */}
      </PrimaryDropdownButton>
    ),
    [toggleOpen, isOpen],
  );

  return (
    <Popup
      placement="bottom-start"
      content={content}
      isOpen={isOpen}
      onClose={onClose}
      trigger={trigger}
    />
  );
};
