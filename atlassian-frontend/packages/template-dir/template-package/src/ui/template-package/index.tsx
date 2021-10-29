import React from 'react';

import { Wrapper } from './styled';
import { TEMPLATE_COMPONENT_NAMEProps } from './types';

export default function TEMPLATE_COMPONENT_NAME({
  testId,
}: TEMPLATE_COMPONENT_NAMEProps) {
  return <Wrapper testId={testId}>Hello world 👋</Wrapper>;
}
