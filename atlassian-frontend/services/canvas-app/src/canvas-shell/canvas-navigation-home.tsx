import React from 'react';
import { ProductHome } from '@atlaskit/atlassian-navigation';
import { CanvasWordmark } from './canvas-wordmark';
import { CanvasLogo } from './canvas-logo';

export const CanvasNavigationHome = function CanvasNavigationHome() {
  return (
    <ProductHome
      onClick={console.log}
      icon={CanvasLogo}
      logo={CanvasWordmark}
    />
  );
};
