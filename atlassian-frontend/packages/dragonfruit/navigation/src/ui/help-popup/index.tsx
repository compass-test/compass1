import React, { useCallback, useState } from 'react';

import { Help } from '@atlaskit/atlassian-navigation';
import { LinkItem, MenuGroup, Section } from '@atlaskit/menu';
import { Popup, TriggerProps } from '@atlaskit/popup';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { MenuContainer } from './styled';

type HelpMenuContentProps = {
  onClick: () => void;
};

const HelpMenuContent = (props: HelpMenuContentProps) => {
  const { onClick } = props;
  const { formatMessage } = useIntl();

  return (
    <MenuContainer>
      <MenuGroup onClick={onClick}>
        <Section title={formatMessage(CommonMessages.help)}>
          <LinkItem
            href="https://developer.atlassian.com/cloud/compass/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {formatMessage(messages.compassDocumentation)}
          </LinkItem>
          <LinkItem
            href="https://community.atlassian.com/t5/Compass-Alpha/cmp-p/grouphub%3Acompass-alpha"
            target="_blank"
            rel="noopener noreferrer"
          >
            {formatMessage(messages.communitySupport)}
          </LinkItem>
          <LinkItem
            href="http://compass.status.atlassian.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {formatMessage(messages.statuspage)}
          </LinkItem>
        </Section>
      </MenuGroup>
    </MenuContainer>
  );
};

export const HelpPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  const content = useCallback(() => <HelpMenuContent onClick={onClose} />, [
    onClose,
  ]);

  const trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <Help
        onClick={toggleOpen}
        isSelected={isOpen}
        tooltip="Help"
        {...triggerProps}
      />
    ),
    [toggleOpen, isOpen],
  );

  return (
    <Popup
      placement="bottom-end"
      content={content}
      isOpen={isOpen}
      onClose={onClose}
      trigger={trigger}
    />
  );
};
