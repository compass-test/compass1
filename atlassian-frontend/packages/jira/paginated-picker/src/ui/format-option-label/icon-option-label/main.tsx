import React from 'react';

import type { Option } from '../../../common/types';
import {
  StyledChildIcon,
  StyledItem,
  StyledOption,
  StyledOptionIcon,
} from '../../../common/ui/styled';

interface Props {
  option: Option;
}

export const IconOptionLabel = ({ option }: Props) => (
  <StyledOption>
    <StyledItem>
      {option.icon !== undefined && (
        <StyledOptionIcon src={option.icon} alt={option.label} />
      )}
      <StyledChildIcon>{option.label}</StyledChildIcon>
    </StyledItem>
  </StyledOption>
);
