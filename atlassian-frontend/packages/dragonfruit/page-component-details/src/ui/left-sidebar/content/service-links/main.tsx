import React from 'react';

import { Section } from '@atlaskit/side-navigation';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';

import { LeftSidebarLinks } from '../../../../common/ui/left-sidebar-links';
import { ExtensionSideBarInfo } from '../../../../common/ui/left-sidebar-links/types';

type ServiceLinksProps = {
  componentId: CompassComponent['id'];
  componentPageApps: ExtensionSideBarInfo[];
  unacknowledgedAnnouncementCount?: number;
};

export function ServiceLinks(props: ServiceLinksProps) {
  const {
    componentId,
    componentPageApps,
    unacknowledgedAnnouncementCount,
  } = props;

  return (
    <Section>
      <LeftSidebarLinks
        componentId={componentId}
        componentPageApps={componentPageApps}
        unacknowledgedAnnouncementCount={unacknowledgedAnnouncementCount}
      />

      {/* Service specific <LinkItem>'s can go here */}
    </Section>
  );
}
