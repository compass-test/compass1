import React from 'react';

import { Opaque } from '@atlassian/commerce-types';

interface AmountProps {
  currency: Opaque<string>;
  total: Opaque<number>;
}
export const Amount: React.FC<AmountProps> = ({ currency, total }) => (
  <span>
    {currency} {total}
  </span>
);
