import React from 'react';

import { FadeOff } from './styled';

type RevealContainerProps = {
  condition: boolean;
  fallback: JSX.Element;
};

export const RevealContainer: React.FC<RevealContainerProps> = ({
  condition,
  children,
  fallback,
}) => (
  <div style={{ position: 'relative', display: 'grid' }}>
    {condition && (
      <div style={{ display: 'grid', gridColumn: 1, gridRow: 1 }}>
        {children}
      </div>
    )}
    <FadeOff visible={!condition}>{fallback}</FadeOff>
  </div>
);
