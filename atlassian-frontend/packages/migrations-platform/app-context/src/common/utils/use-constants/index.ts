import { useContext } from 'react';

import { AppContext } from '../../../index';
import { AppConstants } from '../../types';

const useConstants = (): AppConstants => useContext(AppContext);

export default useConstants;
