import React from 'react';
import { graphql } from 'gatsby';
import BrandSideNav from '../components/side-nav/brand-side-nav';
import OverviewPage from '../templates/overview-page';
import { B300 } from '@atlaskit/theme/colors';
import {
  CATEGORY_NAMES,
  CATEGORY_SLUGS,
  getPageDescription,
  getPageTitle,
} from '../utils/constants';

const pageTitle = getPageTitle(CATEGORY_NAMES.BRAND);
const pageDescription = getPageDescription(CATEGORY_NAMES.BRAND);

const BrandPage: React.ComponentType<{ data: Record<string, any> }> = ({
  data,
}) => (
  <OverviewPage
    categorySlug={CATEGORY_SLUGS.BRAND}
    title={pageTitle}
    description={pageDescription}
    heroimageSrc={data.hero.publicURL}
    sidebar={BrandSideNav}
    tileColor={B300}
    entries={data.contents.nodes}
    defaultIcon={'logo'}
  />
);

export const query = graphql`
  query {
    contents: allContentfulGuideline(
      sort: { order: ASC, fields: title }
      filter: {
        category: { eq: "Brand" }
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
    hero: file(relativePath: { eq: "brand@2x.png" }) {
      publicURL
    }
  }
`;

export default BrandPage;
