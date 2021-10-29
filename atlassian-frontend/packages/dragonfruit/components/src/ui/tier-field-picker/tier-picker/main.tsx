import React, { ReactNode, useState } from 'react';

import Button from '@atlaskit/button';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import Tooltip from '@atlaskit/tooltip';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import {
  DisabledTierContainer,
  TierButtonContainer,
  TierOptionContainer,
} from './styled';
import { Props } from './types';

export const TierPicker = (props: Props) => {
  const { currentValue, options, onChange, isDisabled } = props;
  const { formatMessage } = useIntl();

  const isTierValueInvalid = !options.includes(currentValue);
  if (isTierValueInvalid) {
    throw Error('Current value is not valid');
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownOptions: ReactNode[] = options.map((tier) => (
    <DropdownItem
      onClick={() => onChange(tier)}
      key={`tier-picker-dropdown-item-tier-${tier}`}
    >
      <TierOptionContainer data-test-id={`pollinator-tier-option-${tier}`}>
        {formatMessage(CommonMessages.tierWithLevelParam, {
          level: tier,
        }).toLocaleUpperCase()}
      </TierOptionContainer>
    </DropdownItem>
  ));

  const disabledTierPicker = (
    <Tooltip
      content={formatMessage(messages.tierPickerTooltip)}
      position="right-start"
    >
      <DisabledTierContainer>
        {formatMessage(CommonMessages.tierWithLevelParam, {
          level: currentValue,
        }).toLocaleUpperCase()}
      </DisabledTierContainer>
    </Tooltip>
  );

  const triggerButton = (
    <Tooltip
      content={formatMessage(messages.tierPickerTooltip)}
      hideTooltipOnClick={true}
      position="right-start"
    >
      <Button
        iconAfter={<ExpandIcon size="medium" label="" />}
        isSelected={isDropdownOpen}
      >
        <TierButtonContainer>
          {formatMessage(CommonMessages.tierWithLevelParam, {
            level: currentValue,
          }).toLocaleUpperCase()}
        </TierButtonContainer>
      </Button>
    </Tooltip>
  );

  return isDisabled ? (
    disabledTierPicker
  ) : (
    <DropdownMenu
      trigger={triggerButton}
      onOpenChange={(change) => setIsDropdownOpen(change.isOpen)}
    >
      <DropdownItemGroup>{dropdownOptions}</DropdownItemGroup>
    </DropdownMenu>
  );
};
