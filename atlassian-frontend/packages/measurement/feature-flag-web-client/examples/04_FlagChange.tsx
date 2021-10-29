import React, { ReactNode } from 'react';

import FlagChange from './components/FlagChange';
import Initialisation from './components/Initialisation';
import { Line } from './components/styles';
import UpdateUser from './components/UpdateUser';

const flagChange = (): ReactNode => (
  <Initialisation>
    <Line />
    <UpdateUser />
    <Line />
    <FlagChange />
  </Initialisation>
);

export default flagChange;
