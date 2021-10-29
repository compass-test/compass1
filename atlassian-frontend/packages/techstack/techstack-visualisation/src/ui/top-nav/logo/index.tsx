import React, { FC } from 'react';

import { ProductHome } from '@atlaskit/atlassian-navigation';
import { useRouterActions } from '@atlaskit/router';

import { Product } from '../../../common/types';
import { getProductIcon, getProductLogo } from '../../../common/utils';

export interface Props {
  product: Product;
}

export const Logo: FC<Props> = props => {
  const { push } = useRouterActions();
  return (
    <ProductHome
      key={props.product}
      icon={getProductIcon(props.product)}
      logo={getProductLogo(props.product)}
      onClick={() => {
        push('/');
      }}
    />
  );
};
