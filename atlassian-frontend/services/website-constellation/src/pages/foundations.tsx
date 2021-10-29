import React from 'react';
import { graphql } from 'gatsby';
import FoundationSideNav from '../components/side-nav/foundation-side-nav';
import OverviewPage from '../templates/overview-page';
import { T200 } from '@atlaskit/theme/colors';
import {
  CATEGORY_NAMES,
  CATEGORY_SLUGS,
  getPageDescription,
  getPageTitle,
} from '../utils/constants';

const pageTitle = getPageTitle(CATEGORY_NAMES.FOUNDATIONS);
const pageDescription = getPageDescription(CATEGORY_NAMES.FOUNDATIONS);

const FoundationsPage: React.ComponentType<{ data: Record<string, any> }> = ({
  data,
}) => (
  <OverviewPage
    categorySlug={CATEGORY_SLUGS.FOUNDATIONS}
    title={pageTitle}
    description={pageDescription}
    heroimageSrc={data.hero.publicURL}
    sidebar={FoundationSideNav}
    entries={data.contents.nodes}
    defaultIcon={'image-border'}
    tileColor={T200}
  />
);

export const query = graphql`
  query {
    contents: allContentfulGuideline(
      sort: { order: ASC, fields: title }
      filter: {
        category: { eq: "Foundations" }
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
    hero: file(relativePath: { eq: "foundations@2x.png" }) {
      publicURL
    }
  }
`;

export default FoundationsPage;
