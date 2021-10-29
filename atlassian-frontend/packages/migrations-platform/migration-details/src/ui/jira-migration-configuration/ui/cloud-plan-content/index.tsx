import React, { FC, memo } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import type { CloudProduct } from '../../../../common/types';

import messages from './messages';
import { Ul } from './styled';
import { getSupportedProductNamesAndEditions } from './utils';

export type Props = {
  destinationCloudProducts: CloudProduct[];
};

const CloudPlanContent: FC<InjectedIntlProps & Props> = ({
  destinationCloudProducts,
  intl,
}) => {
  if (destinationCloudProducts.length === 0) {
    return null;
  }

  return (
    <Ul key="cloudPlansList">
      {getSupportedProductNamesAndEditions(destinationCloudProducts).map(
        ({ productName, productEdition }, ix) => {
          return (
            <li key={ix}>
              {intl.formatMessage(messages.cloudPlan, {
                productName,
                productEdition,
              })}
            </li>
          );
        },
      )}
    </Ul>
  );
};

export default memo(injectIntl(CloudPlanContent));
