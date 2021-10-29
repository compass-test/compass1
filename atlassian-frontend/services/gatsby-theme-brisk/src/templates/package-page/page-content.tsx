/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { getTabLinks, getTabContents } from './utils/getTabs';
import TabBar from '../../components/tabs/tab-bar';
import TabSwitcher from '../../components/tabs/tab-switcher';
import ContentRenderer from '../../content/content-renderer';
import CodeDocs from '../../content/code-docs';

const CodeDocsContent = ({ data }) => (
  <CodeDocs
    workspaceInfo={data.workspaceInfo}
    changelogEntry={data.changelogEntry}
    sitePlugin={data.sitePlugin}
    changelog={data.allChangelogEntry.nodes}
    propsMdx={data.props}
  />
);

const TabbedPage = ({ data, pageContext }) => {
  const tabPath = `/components/${data.workspaceInfo.slug}`;
  const tabLinks = getTabLinks(
    data.mdx.nodes,
    tabPath,
    pageContext.hasCodeDocs,
  );

  const tabContents = getTabContents(
    data.mdx.nodes,
    <CodeDocsContent data={data} />,
  );

  return (
    <Fragment>
      <TabBar
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: 'translate3d(0, -100%, 0)',
        }}
        tabLinks={tabLinks}
      />
      <TabSwitcher tabPath={tabPath} tabContents={tabContents} />
    </Fragment>
  );
};

const PageContent = ({ pageType, data, pageContext }) => {
  switch (pageType) {
    case 'page':
      return (
        <ContentRenderer id={data.mdx.nodes[0]} body={data.mdx.nodes[0]} />
      );
    case 'codePage':
      return <CodeDocsContent data={data} />;
    case 'tabbedPage':
      return <TabbedPage data={data} pageContext={pageContext} />;
  }
};

export default PageContent;
