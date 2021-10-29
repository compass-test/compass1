import React, { ReactNode } from 'react';

import FlagValue from './components/FlagValue';
import Initialisation from './components/Initialisation';
import { Line } from './components/styles';
import UpdateUser from './components/UpdateUser';

const updateUser = (): ReactNode => (
  <Initialisation>
    <Line />
    <UpdateUser />
    <Line />
    <FlagValue />
  </Initialisation>
);

export default updateUser;
