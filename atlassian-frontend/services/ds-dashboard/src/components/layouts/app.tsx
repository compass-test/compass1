import React, { ReactNode } from 'react';

import {
  PageLayout,
  Content,
  Main,
  LeftSidebar,
  TopNavigation,
  RightSidebar,
} from '@atlaskit/page-layout';

import {
  AtlassianNavigation,
  ProductHome,
} from '@atlaskit/atlassian-navigation';

import { css, Global } from '@emotion/core';

import { gridSize as getGridSize } from '@atlaskit/theme/constants';
import { N100, N400, N600 } from '@atlaskit/theme/colors';
import { AtlassianLogo, AtlassianIcon } from '@atlaskit/logo';

import AppNavLink from '../app-nav-link';
import { renderSideNavData, SideNavData } from '../side-nav-link';
import { DEFAULT_RIGHT_SIDEBAR_WIDTH } from '@atlaskit/page-layout/src/common/constants';

import AppHelp from './app-help';

const gridSize = getGridSize();

const iconContainerStyles = css({
  position: 'relative',
  top: -3 /* Magic value */,
  '> * ': { maxHeight: 3 * gridSize },
});

const logoContainerStyles = css({
  position: 'relative',
  top: -4 /* Magic value */,
  '> * ': { maxHeight: 3 * gridSize },
  display: 'flex',
  gap: 6 /* Magic value */,
});

const logoTextStyles = css({
  fontFamily: 'Charlie Display',
  fontSize: 3 * gridSize,
  position: 'relative',
  top: 2 /* Magic value */,
  color: N400,
  lineHeight: 1,
});

const GrayIcon = () => (
  <span css={iconContainerStyles}>
    <AtlassianIcon
      size="medium"
      iconColor={N100}
      iconGradientStart={N600}
      iconGradientStop={N100}
    />
  </span>
);

const GrayLogo = () => (
  <span css={logoContainerStyles}>
    <AtlassianLogo
      size="medium"
      textColor={N400}
      iconColor={N100}
      iconGradientStart={N600}
      iconGradientStop={N100}
    />
    <span css={logoTextStyles}>Design System</span>
  </span>
);

const AppProductHome = () => {
  return (
    <>
      {/**
       * FIXME: This is a massive hack...
       *
       * Probably better to just make a custom image...
       */}
      <Global
        styles={css({
          '[data-testid="product-home-site-title"]': {
            fontFamily: 'Charlie Display',
            fontSize: '20px',
            position: 'relative',
            top: -1,
            lineHeight: 1,
          },
        })}
      />
      <ProductHome
        icon={GrayIcon}
        logo={GrayLogo}
        logoMaxWidth={1000}
        siteTitle="Dashboard"
        testId="product-home"
      />
    </>
  );
};

const primaryItems = [
  <AppNavLink href="/packages">Packages</AppNavLink>,
  <AppNavLink href="/insights">Insights</AppNavLink>,
];

export type AppLayoutProps = {
  sideNavData: SideNavData;
  rightSidebarContent?: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  sideNavData,
  rightSidebarContent,
}) => {
  return (
    <PageLayout>
      <TopNavigation>
        <AtlassianNavigation
          label="?"
          primaryItems={primaryItems}
          renderProductHome={AppProductHome}
          renderHelp={AppHelp}
        />
      </TopNavigation>
      <Content>
        <LeftSidebar>
          {sideNavData && renderSideNavData(sideNavData)}
        </LeftSidebar>
        <Main>{children}</Main>
        <RightSidebar
          width={rightSidebarContent ? DEFAULT_RIGHT_SIDEBAR_WIDTH : 0}
        >
          {rightSidebarContent}
        </RightSidebar>
      </Content>
    </PageLayout>
  );
};

export default AppLayout;
