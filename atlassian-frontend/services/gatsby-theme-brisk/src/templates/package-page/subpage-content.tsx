import React from 'react';
import { getTabLinks, getTabContents } from './utils/getTabs';
import TabBar from '../../components/tabs/tab-bar';
import TabSwitcher from '../../components/tabs/tab-switcher';
import ContentRenderer from '../../content/content-renderer';

interface SubPageContentProps {
  hasTabs: boolean;
  data: any;
  pageContext: any;
}

const TabbedPage = ({ data, pageContext }) => {
  const tabPath = `/components/${data.workspaceInfo.slug}/${pageContext.slug}`;
  const tabLinks = getTabLinks(data.tabs.nodes, tabPath);
  const tabContents = getTabContents(data.tabs.nodes);

  return (
    <>
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
    </>
  );
};

const SubPageContent = (props: SubPageContentProps) => {
  return props.hasTabs ? (
    <TabbedPage data={props.data} pageContext={props.pageContext} />
  ) : (
    <ContentRenderer id={props.data.page.id} body={props.data.page.body} />
  );
};

export default SubPageContent;
