import React, { useCallback, useState } from 'react';

import { useRouterActions } from 'react-resource-router';

import { PrimaryDropdownButton } from '@atlaskit/atlassian-navigation';
import { LinkItem, PopupMenuGroup, Section } from '@atlaskit/menu';
import { Popup, TriggerProps } from '@atlaskit/popup';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  ComponentListTypeUrlParam,
  routes,
} from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { MAX_POPUP_HEIGHT, MAX_POPUP_WIDTH } from './constants';
import messages from './messages';
import { StarredSectionContent } from './starred-section-content';
import { isModifiedEvent } from './utils';

export const ComponentMenu = () => {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  // avoid full reload for 'view all components' button
  const { push } = useRouterActions();
  const handleClickOnViewAll = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      const isLeftClick = !isModifiedEvent(event);

      if (isLeftClick) {
        push(routes.COMPONENTS(ComponentListTypeUrlParam.SERVICES));
        event.preventDefault();
      }

      setIsOpen(false);
    },
    [push],
  );

  const content = useCallback(
    () => (
      <PopupMenuGroup maxWidth={MAX_POPUP_WIDTH} maxHeight={MAX_POPUP_HEIGHT}>
        <StarredSectionContent />
        <Section hasSeparator>
          <LinkItem
            onClick={handleClickOnViewAll}
            href={routes.COMPONENTS(ComponentListTypeUrlParam.SERVICES)}
          >
            {formatMessage(messages.viewAllComponents)}
          </LinkItem>
        </Section>
      </PopupMenuGroup>
    ),
    [formatMessage, handleClickOnViewAll],
  );

  const trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <PrimaryDropdownButton
        onClick={toggleOpen}
        isSelected={isOpen}
        {...triggerProps}
      >
        {formatMessage(CommonMessages.components)}
      </PrimaryDropdownButton>
    ),
    [toggleOpen, isOpen, formatMessage],
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
