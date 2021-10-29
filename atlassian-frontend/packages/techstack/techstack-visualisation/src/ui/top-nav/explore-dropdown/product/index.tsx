import React from 'react';

import Button from '@atlaskit/button/custom-theme-button';
import { useRouterActions } from '@atlaskit/router';

import { productText } from '../../../../common/constants';
import { Product } from '../../../../common/types';

import { TextWrapper, Wrapper } from './styled';

export interface Props {
  product: Product;
  onClick: () => void;
}

export const SwitcherProduct = (props: Props) => {
  const { push } = useRouterActions();

  const handleClick = () => {
    props.onClick();
    push(`/repository/${props.product}`);
  };

  return (
    <Button
      spacing="none"
      appearance="subtle"
      shouldFitContainer
      onClick={handleClick}
    >
      <Wrapper>
        <TextWrapper>{productText[props.product]}</TextWrapper>
      </Wrapper>
    </Button>
  );
};
