import React from 'react';

import { FormattedMessage } from 'react-intl';

import Toggle from '@atlaskit/toggle';

import { SettingToggleDiv } from './styled';

interface SettingToggleProps {
  id: string;
  message: ReactIntl.FormattedMessage.MessageDescriptor;
  isChecked: boolean;
  isDisabled?: boolean;
  onChange: () => void;
}

export const SettingToggle = ({
  id,
  message,
  isDisabled,
  isChecked,
  onChange,
}: SettingToggleProps) => (
  <SettingToggleDiv>
    <Toggle
      id={id}
      isChecked={isChecked}
      isDisabled={isDisabled}
      onChange={onChange}
    />
    <label htmlFor={id}>
      <FormattedMessage {...message} />
    </label>
  </SettingToggleDiv>
);
