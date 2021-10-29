import React, { ReactNode } from 'react';

import FlagValueDetails from './components/FlagValueDetails';
import Initialisation from './components/Initialisation';
import { Line } from './components/styles';

const flagValueDetails = (): ReactNode => (
  <Initialisation>
    <Line />
    <FlagValueDetails />
  </Initialisation>
);

export default flagValueDetails;
