import React from 'react';
import { graphql } from 'gatsby';
import ContentSideNav from '../components/side-nav/content-side-nav';
import OverviewPage from '../templates/overview-page';
import { R300 } from '@atlaskit/theme/colors';

import {
  CATEGORY_NAMES,
  CATEGORY_SLUGS,
  getPageDescription,
  getPageTitle,
} from '../utils/constants';

const pageTitle = getPageTitle(CATEGORY_NAMES.CONTENT);
const pageDescription = getPageDescription(CATEGORY_NAMES.CONTENT);

const ContentPage: React.ComponentType<{ data: Record<string, any> }> = ({
  data,
}) => (
  <OverviewPage
    categorySlug={CATEGORY_SLUGS.CONTENT}
    title={pageTitle}
    description={pageDescription}
    heroimageSrc={data.hero.publicURL}
    sidebar={ContentSideNav}
    entries={data.contents.nodes}
    tileColor={R300}
    defaultIcon={'edit-filled'}
  />
);

export const query = graphql`
  query {
    contents: allContentfulGuideline(
      sort: { order: ASC, fields: title }
      filter: {
        category: { eq: "Content" }
        contentfulparent: { id: { eq: null } }
      }
    ) {
      nodes {
        slug
        description {
          description
        }
        title
        iconGlyphName
        contentfulparent {
          slug
        }
      }
    }
    hero: file(relativePath: { eq: "content@2x.png" }) {
      publicURL
    }
  }
`;

export default ContentPage;
