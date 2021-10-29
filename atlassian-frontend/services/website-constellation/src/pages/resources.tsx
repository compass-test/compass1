import React from 'react';
import { graphql } from 'gatsby';
import ResourceSideNav from '../components/side-nav/resource-side-nav';
import OverviewPage from '../templates/overview-page';
import { P300 } from '@atlaskit/theme/colors';

import {
  CATEGORY_NAMES,
  CATEGORY_SLUGS,
  getPageDescription,
  getPageTitle,
} from '../utils/constants';

const pageTitle = getPageTitle(CATEGORY_NAMES.RESOURCES);
const pageDescription = getPageDescription(CATEGORY_NAMES.RESOURCES);

const ResourcesPage: React.ComponentType<{ data: Record<string, any> }> = ({
  data,
}) => (
  <OverviewPage
    categorySlug={CATEGORY_SLUGS.RESOURCES}
    title={pageTitle}
    description={pageDescription}
    heroimageSrc={data.hero.publicURL}
    sidebar={ResourceSideNav}
    entries={data.contents.nodes}
    tileColor={P300}
    defaultIcon={'folder'}
  />
);

export const query = graphql`
  query {
    contents: allContentfulGuideline(
      sort: { order: ASC, fields: title }
      filter: {
        category: { eq: "Resources" }
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
    hero: file(relativePath: { eq: "resources@2x.png" }) {
      publicURL
    }
  }
`;

export default ResourcesPage;
