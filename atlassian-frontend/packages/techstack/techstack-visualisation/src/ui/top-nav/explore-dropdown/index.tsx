import React, { FC, useState } from 'react';

import { PrimaryDropdownButton } from '@atlaskit/atlassian-navigation';
import Popup from '@atlaskit/popup';

import { availableProducts } from '../../../common/constants';

import { SwitcherProduct } from './product';
import { ContentWrapper, Header } from './styled';

export const ExploreDropdown: FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const PopupContents = () => (
    <ContentWrapper data-testid="nav-switcher-menu">
      <Header>Switch to</Header>
      {availableProducts.map(product => (
        <SwitcherProduct product={product} onClick={() => setIsOpen(false)} />
      ))}
    </ContentWrapper>
  );
  return (
    <Popup
      content={PopupContents}
      isOpen={isOpen}
      placement="bottom-start"
      onClose={() => setIsOpen(false)}
      trigger={triggerProps => (
        <PrimaryDropdownButton
          {...triggerProps}
          isSelected={isOpen}
          onClick={() => setIsOpen(prev => !prev)}
        >
          Repository
        </PrimaryDropdownButton>
      )}
    />
  );
};
