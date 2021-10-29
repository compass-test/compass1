import React, { ReactNode } from 'react';

import FlagValue from './components/FlagValue';
import Initialisation from './components/Initialisation';
import { Line } from './components/styles';

const flagValue = (): ReactNode => (
  <Initialisation>
    <Line />
    <FlagValue />
  </Initialisation>
);

export default flagValue;
