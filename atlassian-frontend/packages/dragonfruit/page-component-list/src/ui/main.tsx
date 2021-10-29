import React from 'react';

import { Redirect } from 'react-resource-router';

import { Content, LeftSidebar, Main } from '@atlaskit/page-layout';
import { MainContainer } from '@atlassian/dragonfruit-common-ui';
import { ComponentsNavigation } from '@atlassian/dragonfruit-navigation';
import {
  ComponentListTypeUrlParam,
  routes,
} from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ApplicationsView } from './applications-view';
import { LibrariesView } from './libraries-view';
import { ListPageHeader } from './list-page-header';
import messages from './messages';
import { OtherView } from './other-view';
import { ServicesView } from './services-view';

type Props = {
  componentType: ComponentListTypeUrlParam;
};

export function ComponentListPage(props: Props) {
  const { componentType } = props;

  const { formatMessage } = useIntl();

  let componentTypeView: JSX.Element;
  switch (componentType) {
    case ComponentListTypeUrlParam.SERVICES:
      componentTypeView = <ServicesView />;
      break;
    case ComponentListTypeUrlParam.LIBRARIES:
      componentTypeView = <LibrariesView />;
      break;
    case ComponentListTypeUrlParam.APPLICATIONS:
      componentTypeView = <ApplicationsView />;
      break;
    case ComponentListTypeUrlParam.OTHER:
      componentTypeView = <OtherView />;
      break;
    default:
      componentTypeView = <Redirect to={routes.COMPONENTS()} />;
      break;
  }

  return (
    <Content testId="dragonfruit-page-component-list.ui.content">
      <LeftSidebar
        testId="dragonfruit-page-component-list.ui.left-sidebar"
        id="left-sidebar"
        skipLinkTitle={formatMessage(messages.leftSidebarSkipLinkTitle)}
      >
        <ComponentsNavigation />
      </LeftSidebar>

      <Main
        testId="dragonfruit-page-component-list.ui.main"
        id="main"
        skipLinkTitle={formatMessage(messages.mainSkipLinkTitle)}
      >
        <MainContainer>
          <ListPageHeader componentType={componentType} />
          {componentTypeView}
          {/* <ModalTransition>
            {isClaimOwnershipModalOpen && (
              <ComponentOwnershipModal
                onClose={closeClaimOwnershipModal}
                defaultComponent={initialSelectedComponent}
              />
            )}
          </ModalTransition> */}
        </MainContainer>
      </Main>
    </Content>
  );
}
