import React from 'react';

import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import { Content, Main } from '@atlaskit/page-layout';
import Spinner from '@atlaskit/spinner';
// import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
// import { COMPASS_SITE_ARI } from '@atlassian/dragonfruit-forge';
// import { useGetInstalledHomePageTabAppsQuery } from '@atlassian/dragonfruit-graphql';
import {
  useGetAccountInfo,
  // useTenantInfo,
} from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';
// import { Extension } from '@atlassian/forge-ui';

import messages from './messages';
import { ContentWrapper, HeaderWrapper } from './styled'; // , TabsWrapper } from './styled';
// import { AnnouncementsTabDetails } from './tabs/announcements-tab';
// import { CustomUIExtensionTab } from './tabs/extension-tab/custom-ui-extension';
// import { ScorecardTabDetails } from './tabs/scorecards-tab';
import { TeamsSelector } from './teams-selector';

// type HomePageTab = {
//   name: string;
//   content: JSX.Element;
// };

export const PageUserHome = () => {
  const { formatMessage } = useIntl();
  const accountInfo = useGetAccountInfo();
  const name = accountInfo.data?.name;

  // const { cloudId } = useTenantInfo();

  // const contextId = `${COMPASS_SITE_ARI}/${cloudId}`;
  // const { data } = useGetInstalledHomePageTabAppsQuery({
  //   variables: { contextId },
  // });

  // const tabs: HomePageTab[] = [ScorecardTabDetails, AnnouncementsTabDetails];

  // const extensionTabs =
  //   data && data.extensionContexts && data.extensionContexts.length > 0
  //     ? data.extensionContexts[0].extensionsByType
  //     : [];

  return (
    <Content>
      <Main>
        <ContentWrapper>
          <HeaderWrapper>
            {accountInfo.loading ? (
              <Spinner size="medium" />
            ) : accountInfo.error ? (
              <EditorWarningIcon label="error" size="large" />
            ) : (
              <h2>{`${formatMessage(messages.welcome, { name })}`}</h2>
            )}
          </HeaderWrapper>
          <TeamsSelector />
          {/* <TabsWrapper>
            <Tabs id="home-page-tabs">
              <TabList>
                {tabs.map(tab => (
                  <Tab>{tab.name}</Tab>
                ))}
                {extensionTabs.map(tab => (
                  <Tab>{tab.properties?.title}</Tab>
                ))}
              </TabList>
              {tabs.map(tab => (
                <TabPanel>{tab.content}</TabPanel>
              ))}
              {extensionTabs.map(tab => (
                <TabPanel>
                  <CustomUIExtensionTab customUIData={tab as Extension} />
                </TabPanel>
              ))}
            </Tabs>
          </TabsWrapper> */}
        </ContentWrapper>
      </Main>
    </Content>
  );
};
