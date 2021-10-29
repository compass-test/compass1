import React from 'react';
import ActualPageContent from '@atlaskit/gatsby-theme-brisk/src/templates/package-page/page-content';
import PageAnalytics from './page-analytics';

const PackagePage = (props: any) => {
  const pageTitle = props.data.workspaceInfo.title;
  const tabNames: string[] = props.data.mdx.nodes
    .map((node) => node.parent.name)
    // "code" is a magical tab which only applies for top level pages.
    .concat('code');

  return (
    <PageAnalytics
      tabNames={tabNames}
      packageName={props.pageContext.name}
      pageTitle={pageTitle}
    >
      <ActualPageContent {...props} />
    </PageAnalytics>
  );
};

export default PackagePage;
