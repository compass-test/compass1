import React from 'react';

import {
  NavigationContent,
  NavigationHeader,
  SideNavigation,
} from '@atlaskit/side-navigation';
import {
  CompassComponent,
  CompassComponentType,
} from '@atlassian/dragonfruit-graphql';

import { ExtensionSideBarInfo } from '../../common/ui/left-sidebar-links/types';

import { BackLink } from './back-link';
import { Content } from './content';
import { ComponentHeader } from './header';

type NavigationProps = {
  componentId: CompassComponent['id'];
  componentType: CompassComponentType;
  componentName: CompassComponent['name'];
  componentPageApps: ExtensionSideBarInfo[];
  unacknowledgedAnnouncementCount?: number;
};

export function LeftSidebar(props: NavigationProps) {
  const {
    componentId,
    componentType,
    componentName,
    componentPageApps,
    unacknowledgedAnnouncementCount,
  } = props;

  return (
    <SideNavigation
      label="Component navigation"
      testId="dragonfruit-page-component-details.ui.left-sidebar"
    >
      <NavigationHeader>
        <ComponentHeader
          componentId={componentId}
          componentType={componentType}
        >
          {componentName}
        </ComponentHeader>
        <BackLink componentType={componentType} />
      </NavigationHeader>

      <NavigationContent showTopScrollIndicator>
        <Content
          componentId={componentId}
          componentType={componentType}
          componentPageApps={componentPageApps}
          unacknowledgedAnnouncementCount={unacknowledgedAnnouncementCount}
        />
      </NavigationContent>
    </SideNavigation>
  );
}
