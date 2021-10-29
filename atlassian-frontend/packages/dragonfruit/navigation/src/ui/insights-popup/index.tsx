import React, { useCallback, useState } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { PrimaryDropdownButton } from '@atlaskit/atlassian-navigation';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import { ButtonItem, MenuGroup, Section } from '@atlaskit/menu';
import { Popup, TriggerProps } from '@atlaskit/popup';
import * as colors from '@atlaskit/theme/colors';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';

import messages from './messages';

type Props = {
  isInsightsHighlighted: boolean;
};

const InsightsPopup = ({
  isInsightsHighlighted,
  intl: { formatMessage },
}: Props & InjectedIntlProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  const InsightsPopupContent = useCallback(
    () => (
      <MenuGroup onClick={toggleOpen}>
        <Section>
          <ButtonItem
            iconBefore={
              <QuestionCircleIcon
                size="medium"
                primaryColor={colors.B400}
                label=""
              />
            }
            description={formatMessage(messages.insightsDescription)}
          >
            {formatMessage(CommonMessages.comingSoon)}
          </ButtonItem>
        </Section>
      </MenuGroup>
    ),
    [toggleOpen, formatMessage],
  );

  const trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <PrimaryDropdownButton
        isHighlighted={isInsightsHighlighted}
        onClick={toggleOpen}
        {...triggerProps}
      >
        {formatMessage(messages.insights)}
      </PrimaryDropdownButton>
    ),
    [isInsightsHighlighted, toggleOpen, formatMessage],
  );

  return (
    <Popup
      placement="bottom-start"
      content={InsightsPopupContent}
      isOpen={isOpen}
      onClose={onClose}
      trigger={trigger}
    />
  );
};

export default injectIntl(InsightsPopup);
