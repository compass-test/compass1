import React from 'react';

import { MenuProps } from '@atlaskit/select';

import { SingleOption } from '../../../../common/types';

export const Menu = ({
  innerRef,
  innerProps,
  children,
}: MenuProps<SingleOption, true>) => (
  <div
    data-testid="refinement-bar.common.ui.select.menu"
    ref={innerRef}
    {...innerProps}
  >
    {children}
  </div>
);
