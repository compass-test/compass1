import React from 'react';

import ButtonItem from '@atlaskit/menu/button-item';
import LinkItem from '@atlaskit/menu/link-item';

import useRegisterItemWithFocusManager from './internal/hooks/use-register-item-with-focus-manager';
import { DropdownItemProps } from './types';

const DropdownMenuItem = (props: DropdownItemProps) => {
  const { elemBefore, elemAfter, href, ...rest } = props;

  const itemRef = useRegisterItemWithFocusManager();

  if (href) {
    return (
      <LinkItem
        href={href}
        iconBefore={elemBefore}
        iconAfter={elemAfter}
        role="menuitem"
        ref={itemRef}
        {...rest}
      />
    );
  } else {
    return (
      <ButtonItem
        role="menuitem"
        iconBefore={elemBefore}
        iconAfter={elemAfter}
        ref={itemRef}
        {...rest}
      />
    );
  }
};

export default DropdownMenuItem;
