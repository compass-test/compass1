// eslint-disable-next-line import/no-extraneous-dependencies
import { createContext } from 'react';

import { OverrideRegistry } from './types';

export const overrideContext = createContext<OverrideRegistry>(new Map());
