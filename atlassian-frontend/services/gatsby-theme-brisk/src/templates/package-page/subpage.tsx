import React from 'react';
import { graphql } from 'gatsby';
import { useLocation } from '@reach/router';
import PageWithLocalNav from '../page-with-local-nav';
import ComponentNav from '../../components/component-side-nav';
import HeadingContext from '../../components/local-nav/heading-context';
import getHeadings from './utils/getHeadings';
import getTitleAndDescription from './utils/getTitleAndDescription';
import { getCurrentTab } from './utils/getTabs';
import SubPageContent from './subpage-content';
import titleify from '../../utilities/titleify';

const getPageHeadings = (hasTabs, data, currentTab) => {
  return hasTabs
    ? getHeadings(currentTab.mdx)
    : getHeadings(data.page.headings);
};

const getPageInfo = (hasTabs, data, currentTab) => {
  return hasTabs
    ? getTitleAndDescription(currentTab.mdx, data.workspaceInfo)
    : getTitleAndDescription(data.page, data.workspaceInfo);
};

export default ({ data, pageContext }) => {
  const { hasTabs } = pageContext;
  let currentTab;

  if (hasTabs) {
    const { pathname } = useLocation();
    currentTab = getCurrentTab(pathname, data.tabs.nodes);
  }

  const headings = getPageHeadings(hasTabs, data, currentTab);
  const { title, description } = getPageInfo(hasTabs, data, currentTab);

  const context = { headings };

  return (
    <HeadingContext.Provider value={context}>
      <PageWithLocalNav
        title={title}
        description={description}
        sidebar={ComponentNav}
        subpageTabName={titleify(currentTab.name)}
      >
        <SubPageContent
          hasTabs={hasTabs}
          data={data}
          pageContext={pageContext}
        />
      </PageWithLocalNav>
    </HeadingContext.Provider>
  );
};

export const query = graphql`
  query($name: String!, $mdxPath: String, $hasTabs: Boolean!) {
    workspaceInfo(name: { eq: $name }) {
      title
      description
      slug
    }
    page: mdx(fileAbsolutePath: { eq: $mdxPath }) @skip(if: $hasTabs) {
      body
      id
      frontmatter {
        title
        description
      }
      headings {
        depth
        value
      }
    }
    tabs: allMdx(
      sort: { fields: frontmatter___order, order: ASC }
      filter: { fileAbsolutePath: { glob: $mdxPath } }
    ) @include(if: $hasTabs) {
      nodes {
        frontmatter {
          title
          description
        }
        headings {
          depth
          value
        }
        parent {
          ... on File {
            name
          }
        }
        body
      }
    }
  }
`;
