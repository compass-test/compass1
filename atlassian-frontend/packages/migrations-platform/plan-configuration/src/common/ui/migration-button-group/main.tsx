import React, { FC } from 'react';

import { ButtonGroup } from '@atlaskit/button';

import { ProductMeta } from '../../types';

import ChoiceButton from './choice-button';
import TrialButton from './trial-button';

export type Props = {
  productMeta: ProductMeta;
  appearance?: 'default' | 'primary';
  administrator?: string;
  getCloudTrialUrl: () => Promise<string>;
  getMigrationGatewayUrl: () => Promise<string>;
};

const MigrationButtonGroup: FC<Props> = ({
  productMeta,
  appearance = 'default',
  administrator,
  getCloudTrialUrl,
  getMigrationGatewayUrl,
}) => {
  return (
    <ButtonGroup>
      <ChoiceButton
        appearance={appearance}
        administrator={administrator}
        destination={productMeta.cloudDestination}
        getUrl={getMigrationGatewayUrl}
      />
      <TrialButton
        productName={productMeta.productName}
        getUrl={getCloudTrialUrl}
      />
    </ButtonGroup>
  );
};

export default MigrationButtonGroup;
