import React from 'react';

import { FormattedMessage } from 'react-intl';

import { PrimaryDropdownButton } from '@atlaskit/atlassian-navigation';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import { ButtonItem } from '@atlaskit/menu';

import { PeopleMenuProps } from '../../types';
import { messages } from '../i18n';

type PeopleMenuTriggerProps = Pick<
  PeopleMenuProps,
  'customChevronIcon' | 'testId' | 'peopleText'
> & {
  isVisible: boolean;
  isHighlighted?: boolean;
  triggerProps: any;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
};

export function PeopleMenuTriggerSSR({
  testId,
  peopleText,
}: {
  testId?: string;
  peopleText?: string;
}) {
  return (
    <PrimaryDropdownButton testId={`${testId}-people-primary-button-ssr`}>
      {peopleText ? peopleText : <FormattedMessage {...messages.people} />}
    </PrimaryDropdownButton>
  );
}

function PeopleMenuTrigger(props: PeopleMenuTriggerProps) {
  const {
    isVisible,
    isHighlighted,
    customChevronIcon,
    triggerProps,
    onClick,
    onMouseEnter,
    testId,
    isSelected,
    peopleText,
  } = props;

  const buttonProps = {
    isSelected,
    onClick,
    onMouseEnter,
    testId,
  };

  const chevron = customChevronIcon || (
    <ChevronRightIcon label="dropdown-chevron" />
  );

  if (isVisible) {
    return (
      <PrimaryDropdownButton
        isHighlighted={isHighlighted}
        {...buttonProps}
        {...triggerProps}
      >
        {peopleText ? peopleText : <FormattedMessage {...messages.people} />}
      </PrimaryDropdownButton>
    );
  }

  return (
    <ButtonItem iconAfter={chevron} {...triggerProps} {...buttonProps}>
      {peopleText ? peopleText : <FormattedMessage {...messages.people} />}
    </ButtonItem>
  );
}

export default PeopleMenuTrigger;
