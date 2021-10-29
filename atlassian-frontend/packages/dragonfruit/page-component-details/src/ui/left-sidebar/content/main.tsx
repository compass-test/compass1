import React from 'react';

import { Section } from '@atlaskit/side-navigation';
import {
  CompassComponent,
  CompassComponentType,
} from '@atlassian/dragonfruit-graphql';

import { LeftSidebarLinks } from '../../../common/ui/left-sidebar-links';
import { ExtensionSideBarInfo } from '../../../common/ui/left-sidebar-links/types';

import { ApplicationLinks } from './application-links';
import { LibraryLinks } from './library-links';
import { ServiceLinks } from './service-links';

type ContentProps = {
  componentId: CompassComponent['id'];
  // componentType is optional because we might want this ui to work before
  // everything has loaded - ie: when we only have the component ID
  componentType?: CompassComponentType;
  componentPageApps: ExtensionSideBarInfo[];
  unacknowledgedAnnouncementCount?: number;
};

function filterAppsByType(
  componentPageApps: ExtensionSideBarInfo[],
  type: string,
): ExtensionSideBarInfo[] {
  return componentPageApps.filter((appInfo) => {
    if (appInfo.displayConditions?.componentTypes) {
      return appInfo.displayConditions.componentTypes.includes(type);
    }
    return true;
  });
}

export function Content(props: ContentProps) {
  const {
    componentId,
    componentType,
    componentPageApps,
    unacknowledgedAnnouncementCount,
  } = props;

  if (componentType === CompassComponentType.SERVICE) {
    return (
      <ServiceLinks
        componentId={componentId}
        componentPageApps={filterAppsByType(
          componentPageApps,
          CompassComponentType.SERVICE,
        )}
        unacknowledgedAnnouncementCount={unacknowledgedAnnouncementCount}
      />
    );
  }

  if (componentType === CompassComponentType.APPLICATION) {
    return (
      <ApplicationLinks
        componentId={componentId}
        componentPageApps={filterAppsByType(
          componentPageApps,
          CompassComponentType.APPLICATION,
        )}
        unacknowledgedAnnouncementCount={unacknowledgedAnnouncementCount}
      />
    );
  }

  if (componentType === CompassComponentType.LIBRARY) {
    return (
      <LibraryLinks
        componentId={componentId}
        componentPageApps={filterAppsByType(
          componentPageApps,
          CompassComponentType.LIBRARY,
        )}
        unacknowledgedAnnouncementCount={unacknowledgedAnnouncementCount}
      />
    );
  }

  // Unknown component type? Maybe it hasn't loaded yet?
  // Fallback to the default shared links
  return (
    <Section>
      <LeftSidebarLinks
        componentId={componentId}
        componentPageApps={filterAppsByType(
          componentPageApps,
          CompassComponentType.OTHER,
        )}
        unacknowledgedAnnouncementCount={unacknowledgedAnnouncementCount}
      />
    </Section>
  );
}
