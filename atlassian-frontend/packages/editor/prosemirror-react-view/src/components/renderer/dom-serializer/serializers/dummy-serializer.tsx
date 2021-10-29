import React, { forwardRef } from 'react';

import { DOMSerializer } from '../types';

export const DOMSerializerDummy: DOMSerializer = {
  getNodeComponent: () =>
    forwardRef<HTMLElement>(() => <>You need to create a DOM serializer</>),
  getMarkComponent: () => () => <>You need to create a DOM serializer</>,
};
