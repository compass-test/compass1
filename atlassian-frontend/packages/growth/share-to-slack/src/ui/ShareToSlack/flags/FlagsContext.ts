import React from 'react';

import type { FlagAPI } from '../../../common/types';

const FlagsContext = React.createContext<FlagAPI>(undefined!);

export default FlagsContext;
