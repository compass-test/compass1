import React from 'react';
import { css } from '@emotion/core';
import { gridSize } from '@atlaskit/theme/constants';

import AppLayout, { AppLayoutProps } from './layouts/app';

const pageContentStyles = css({
  padding: `0 ${gridSize() * 5}px ${gridSize() * 5}px`,
});

const constrainedWidthStyles = css({
  maxWidth: '100ch',
});

export type PageContentProps = AppLayoutProps & {
  isFullWidth?: boolean;
};

const PageContent: React.FC<PageContentProps> = ({
  children,
  sideNavData,
  rightSidebarContent,
  isFullWidth = false,
}) => (
  <AppLayout
    sideNavData={sideNavData}
    rightSidebarContent={rightSidebarContent}
  >
    <main css={[pageContentStyles, !isFullWidth && constrainedWidthStyles]}>
      {children}
    </main>
  </AppLayout>
);

export default PageContent;
