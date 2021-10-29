import { createContext, useContext } from 'react';

import { DOMSerializerDummy } from './serializers/dummy-serializer';
import { DOMSerializer } from './types';

export const DOMSerializerContext = createContext<DOMSerializer>(
  DOMSerializerDummy,
);

export const useDOMSerializer = () => useContext(DOMSerializerContext);
