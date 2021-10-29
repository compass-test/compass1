import React from 'react';

import { Wrapper } from './styled';
import { NotificationFullPageProps } from './types';

export default function NotificationFullPage({
  testId,
}: NotificationFullPageProps) {
  return <Wrapper testId={testId}>Hello world 👋</Wrapper>;
}
