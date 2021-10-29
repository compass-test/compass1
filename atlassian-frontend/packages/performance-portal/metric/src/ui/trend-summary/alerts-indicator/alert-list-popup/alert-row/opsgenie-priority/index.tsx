import React from 'react';

import { AlertPriority } from '../../../../../../__generated__/graphql';

import { Container } from './styled';
export interface Props {
  priority: AlertPriority;
}

export const OpsgeniePriority = ({ priority }: Props) => {
  return <Container priority={priority}>{priority}</Container>;
};
