import React from 'react';

import { Actions } from './actions';
import { MetricInfo } from './metric-info';
import { Top } from './styled';

export const Header = () => {
  return (
    <Top>
      <MetricInfo />
      <Actions />
    </Top>
  );
};
