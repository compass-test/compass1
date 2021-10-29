import React from 'react';

import { ControlProps } from '@atlaskit/select';

import { SingleOption } from '../../../../common/types';
import { StyledControl } from '../../../../common/ui/picker/styled';

export const Control = ({
  children,
  innerProps,
  innerRef,
}: ControlProps<SingleOption, true>) => (
  <StyledControl
    innerRef={innerRef === null ? undefined : innerRef}
    {...innerProps}
  >
    {children}
  </StyledControl>
);
