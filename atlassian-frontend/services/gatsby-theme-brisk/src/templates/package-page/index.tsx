import React from 'react';
import { graphql } from 'gatsby';
import { useLocation } from '@reach/router';
import PageWithLocalNav from '../page-with-local-nav';
import ComponentNav from '../../components/component-side-nav';
import { codeDocsHeadings } from '../../content/code-docs';
import HeadingContext from '../../components/local-nav/heading-context';
import getHeadings from './utils/getHeadings';
import getTitleAndDescription from './utils/getTitleAndDescription';
import { getCurrentTab } from './utils/getTabs';
import PageContent from './page-content';
import titleify from '../../utilities/titleify';

const getPageHeadings = (pageType, data, currentTab) => {
  switch (pageType) {
    case 'page':
      return getHeadings(data.mdx.nodes[0]);
    case 'codePage':
      return codeDocsHeadings;
    case 'tabbedPage':
      return currentTab.name === 'code'
        ? codeDocsHeadings.concat(getHeadings(data.props))
        : getHeadings(currentTab.mdx);
  }
};

const getPageInfo = (pageType, data, currentTab) => {
  switch (pageType) {
    case 'page':
      return getTitleAndDescription(data.mdx.nodes[0], data.workspaceInfo);
    case 'codePage':
      return {
        title: data.workspaceInfo.title,
        description: data.workspaceInfo.description,
      };
    case 'tabbedPage':
      if (currentTab.name === 'code') {
        return {
          title: data.workspaceInfo.title,
          description: data.workspaceInfo.description,
        };
      }
      return getTitleAndDescription(currentTab.mdx, data.workspaceInfo);
  }
};

const getPageType = ({ hasCodeDocs, hasTabs, hasMdx }) => {
  if (!hasMdx && hasCodeDocs) {
    // if there's no mdx, render just code docs
    return 'codePage';
  } else if (hasMdx && !hasTabs && !hasCodeDocs) {
    // if there's one mdx page and no code docs
    return 'page';
  } else {
    return 'tabbedPage';
  }
};

export default ({ data, pageContext }) => {
  const pageType = getPageType(pageContext);
  let currentTab;

  if (pageType === 'tabbedPage') {
    const { pathname } = useLocation();
    currentTab = getCurrentTab(pathname, data.mdx.nodes);
  }

  const headings = getPageHeadings(pageType, data, currentTab);
  const { title, description } = getPageInfo(pageType, data, currentTab);

  const context = { headings };

  return (
    <HeadingContext.Provider value={context}>
      <PageWithLocalNav
        title={title}
        description={description}
        sidebar={ComponentNav}
        tabName={titleify(currentTab.name)}
        guidelineCategory={'Components'}
      >
        <PageContent
          pageType={pageType}
          data={data}
          pageContext={pageContext}
        />
      </PageWithLocalNav>
    </HeadingContext.Provider>
  );
};

export const mdxFragment = graphql`
  fragment MdxNode on Mdx {
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
`;

export const query = graphql`
  query(
    $name: String!
    $mdxPath: String
    $propsPath: String
    $hasCodeDocs: Boolean!
    $hasMdx: Boolean!
    $hasProps: Boolean!
  ) {
    workspaceInfo(name: { eq: $name }) {
      title
      description
      slug
      name @include(if: $hasCodeDocs)
      group @include(if: $hasCodeDocs)
      definition @include(if: $hasCodeDocs)
    }
    sitePlugin(name: { eq: "@atlaskit/gatsby-theme-brisk" })
    @include(if: $hasCodeDocs) {
      pluginOptions {
        repository
      }
    }
    allChangelogEntry(filter: { packageName: { eq: $name } })
    @include(if: $hasCodeDocs) {
      nodes {
        version
        childMdx {
          body
        }
      }
    }
    changelogEntry(packageName: { eq: $name }) @include(if: $hasCodeDocs) {
      version
      childMdx {
        body
      }
    }
    props: mdx(fileAbsolutePath: { eq: $propsPath }) @include(if: $hasProps) {
      ...MdxNode
    }
    mdx: allMdx(
      sort: { fields: frontmatter___order, order: ASC }
      filter: { fileAbsolutePath: { glob: $mdxPath, ne: $propsPath } }
    ) @include(if: $hasMdx) {
      nodes {
        ...MdxNode
        parent {
          ... on File {
            name
          }
        }
      }
    }
  }
`;
