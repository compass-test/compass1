import React from 'react';

import { Section } from '@atlaskit/side-navigation';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';

import { LeftSidebarLinks } from '../../../../common/ui/left-sidebar-links';
import { ExtensionSideBarInfo } from '../../../../common/ui/left-sidebar-links/types';

type ApplicationLinksProps = {
  componentId: CompassComponent['id'];
  componentPageApps: ExtensionSideBarInfo[];
  unacknowledgedAnnouncementCount?: number;
};

export function ApplicationLinks(props: ApplicationLinksProps) {
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

      {/* Application specific <LinkItem>'s can go here */}
    </Section>
  );
}
