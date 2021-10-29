import React from 'react';

import Tooltip from '@atlaskit/tooltip';

import { integrations } from '../../common/constants';

import { IntegrationDetails } from './integration-details';
import { PickerCheckbox, PickerCheckboxLabel, PickerContainer } from './styled';
import { IntegrationPickerProps } from './types';

export const IntegrationPicker = ({
  id,
  isSelected = false,
  onChange,
}: IntegrationPickerProps) => {
  const { fullName } = integrations[id];
  return (
    <Tooltip content={fullName}>
      <PickerCheckboxLabel>
        <PickerCheckbox
          type="checkbox"
          checked={isSelected}
          onChange={onChange}
        />
        <PickerContainer isSelected={isSelected}>
          <IntegrationDetails id={id} withTooltip={false} />
        </PickerContainer>
      </PickerCheckboxLabel>
    </Tooltip>
  );
};
