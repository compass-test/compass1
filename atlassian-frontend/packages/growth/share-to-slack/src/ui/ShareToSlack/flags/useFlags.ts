import { useContext } from 'react';

import type { FlagAPI } from '../../../common/types';

import FlagsContext from './FlagsContext';

export default function useFlags() {
  return useContext<FlagAPI>(FlagsContext);
}
