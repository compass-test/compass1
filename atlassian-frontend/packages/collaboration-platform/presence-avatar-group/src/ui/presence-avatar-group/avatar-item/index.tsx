import React from 'react';

import { Badge } from './styled';

export const AvatarItem = ({
  color,
  name,
}: {
  color: string;
  name: string;
}) => (
  <Badge color={color} data-testid="presence-avatar-badge">
    {name.substr(0, 1).toUpperCase()}
  </Badge>
);
