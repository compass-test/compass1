import React from 'react';
import { AtlassianNavigation } from '@atlaskit/atlassian-navigation';
import { AppSwitcherPopup } from './app-switcher-popup';
import { CanvasNavigationHome } from './canvas-navigation-home';
import CanvasErrorBoundary from './canvas-error-boundary';

export const CanvasShell: React.FC = function CanvasShell(props) {
  return (
    <>
      <AtlassianNavigation
        renderAppSwitcher={AppSwitcherPopup}
        renderProductHome={CanvasNavigationHome}
        label=""
        primaryItems={[]}
      />
      <CanvasErrorBoundary>{props.children}</CanvasErrorBoundary>
    </>
  );
};
