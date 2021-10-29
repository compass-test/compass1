import React from 'react';

import Lozenge from '@atlaskit/lozenge';

import type { LozengeOption } from '../../../common/types';
import {
  StyledChild,
  StyledItem,
  StyledOption,
} from '../../../common/ui/styled';

interface Props {
  lozengeOption: LozengeOption;
}

export const LozengeOptionLabel = ({ lozengeOption }: Props) => (
  <StyledOption>
    <StyledChild>
      <StyledItem>
        <Lozenge
          appearance={lozengeOption.appearance}
          isBold={lozengeOption.isBold}
          maxWidth={lozengeOption.maxWidth}
        >
          {lozengeOption.label}
        </Lozenge>
      </StyledItem>
    </StyledChild>
  </StyledOption>
);
