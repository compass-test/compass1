import React from 'react';

import Badge from '@atlaskit/badge';
import PageHeader from '@atlaskit/page-header';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import { MainContainer } from '@atlassian/dragonfruit-common-ui';
import {
  CompassComponent,
  GetComponentDependencyAnnouncementsQuery,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ComponentBreadcrumbs } from '../../../common/ui/breadcrumbs';

import { ComponentAnnouncements } from './component-announcements';
import { DependencyAnnouncements } from './dependency-announcements';
import messages from './messages';
import { Description, TabPanelContent, TabsWrapper } from './styled';

export type AnnouncementsProps = {
  currentComponent: Pick<CompassComponent, 'id' | 'name' | 'type'>;
  dependencyAnnouncementData?: GetComponentDependencyAnnouncementsQuery;
  unacknowledgedAnnouncementCount?: number;
  onTabChange?: () => void;
  selectedTab: string;
};

export function Announcements(props: AnnouncementsProps) {
  const {
    currentComponent,
    dependencyAnnouncementData,
    unacknowledgedAnnouncementCount,
    onTabChange,
    selectedTab,
  } = props;

  const { formatMessage } = useIntl();

  const breadcrumbs = (
    <ComponentBreadcrumbs
      componentId={currentComponent.id}
      componentName={currentComponent.name}
      componentType={currentComponent.type}
    />
  );

  const selectedTabIndex = selectedTab === '#dependencies' ? 1 : 0;

  return (
    <MainContainer>
      <PageHeader breadcrumbs={breadcrumbs}>
        {formatMessage(messages.pageHeader)}
      </PageHeader>

      <Description>{formatMessage(messages.pageDescription)}</Description>

      <TabsWrapper>
        <Tabs
          id="announcements"
          onChange={onTabChange}
          defaultSelected={selectedTabIndex}
          shouldUnmountTabPanelOnChange
        >
          <TabList>
            <Tab>From this component</Tab>
            <Tab>
              From dependencies{' '}
              {unacknowledgedAnnouncementCount ? (
                <Badge appearance="primary">
                  {unacknowledgedAnnouncementCount}
                </Badge>
              ) : null}
            </Tab>
          </TabList>
          <TabPanel>
            <TabPanelContent>
              <ComponentAnnouncements currentComponent={currentComponent} />
            </TabPanelContent>
          </TabPanel>
          <TabPanel>
            <TabPanelContent>
              <DependencyAnnouncements
                currentComponent={currentComponent}
                data={dependencyAnnouncementData}
              />
            </TabPanelContent>
          </TabPanel>
        </Tabs>
      </TabsWrapper>
    </MainContainer>
  );
}
