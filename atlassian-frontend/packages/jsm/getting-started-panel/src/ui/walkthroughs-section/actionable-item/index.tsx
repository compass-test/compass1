import React, { ReactChild, ReactNode } from 'react';

import { ItemContainer, IconRing, Label } from './styled';

interface Props {
  children: ReactNode;
  icon: ReactChild;
  onClick: () => void;
  testId?: string;
}

export const ActionableItem = ({ children, icon, onClick, testId }: Props) => {
  return (
    <ItemContainer onClick={onClick} data-testid={testId}>
      <IconRing>{icon}</IconRing>
      <Label>{children}</Label>
    </ItemContainer>
  );
};
