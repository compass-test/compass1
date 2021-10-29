import React from 'react';
import ActualSubPageContent from '@atlaskit/gatsby-theme-brisk/src/templates/package-page/subpage-content';
import PageAnalytics from './page-analytics';

const PackageSubPage = (props: any) => {
  const parentPackageName = props.data.workspaceInfo.title;
  const pageName = props.pageContext.slug;
  const tabNames: string[] = props.data.tabs.nodes.map(
    (node) => node.parent.name,
  );

  return (
    <PageAnalytics
      tabNames={tabNames}
      packageName={props.pageContext.name}
      pageTitle={`${parentPackageName}-${pageName}`}
    >
      <ActualSubPageContent {...props} />
    </PageAnalytics>
  );
};

export default PackageSubPage;
