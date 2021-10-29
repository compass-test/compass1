import React from 'react';
import { graphql } from 'gatsby';
import PatternSideNav from '../components/side-nav/pattern-side-nav';
import OverviewPage from '../templates/overview-page';
import { Y200 } from '@atlaskit/theme/colors';

import {
  CATEGORY_NAMES,
  CATEGORY_SLUGS,
  getPageDescription,
  getPageTitle,
} from '../utils/constants';

const pageTitle = getPageTitle(CATEGORY_NAMES.PATTERNS);
const pageDescription = getPageDescription(CATEGORY_NAMES.PATTERNS);

const PatternsPage: React.ComponentType<{ data: Record<string, any> }> = ({
  data,
}) => (
  <OverviewPage
    categorySlug={CATEGORY_SLUGS.PATTERNS}
    title={pageTitle}
    description={pageDescription}
    heroimageSrc={data.hero.publicURL}
    sidebar={PatternSideNav}
    entries={data.contents.nodes}
    tileColor={Y200}
    defaultIcon={'bullet-list'}
  />
);

export const query = graphql`
  query {
    contents: allContentfulGuideline(
      sort: { order: ASC, fields: title }
      filter: {
        category: { eq: "Patterns" }
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
    hero: file(relativePath: { eq: "patterns@2x.png" }) {
      publicURL
    }
  }
`;

export default PatternsPage;
