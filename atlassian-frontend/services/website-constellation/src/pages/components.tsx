/** @jsx jsx */
import { jsx } from '@emotion/core';
import { graphql } from 'gatsby';
import Layout, {
  MainContent,
} from '@atlaskit/gatsby-theme-brisk/src/components/layout';
import Hero from '@atlaskit/gatsby-theme-brisk/src/components/hero';
import ComponentSideNav from '@atlaskit/gatsby-theme-brisk/src/components/component-side-nav';
import {
  ContextualAnalyticsData,
  SCREEN,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';
import ImageCard from '../components/cards/image-card';
import {
  CATEGORY_NAMES,
  CATEGORY_SLUGS,
  getPageDescription,
  getPageTitle,
} from '../utils/constants';
import titleify from '../utils/titleify';

const pageTitle = getPageTitle(CATEGORY_NAMES.COMPONENTS);
const pageDescription = getPageDescription(CATEGORY_NAMES.COMPONENTS);

const ComponentsPage: React.ComponentType<{ data: Record<string, any> }> = ({
  data,
}) => (
  <ContextualAnalyticsData
    attributes={{
      name: 'componentsHome',
      entriesCount: data.components.nodes.length,
    }}
    sourceType={SCREEN}
    sourceName="index"
  >
    <Layout
      title={pageTitle}
      description={pageDescription}
      sidebar={ComponentSideNav}
      categorySlug={titleify(CATEGORY_SLUGS.COMPONENTS)}
    >
      <FireScreenAnalytics />
      <Hero
        css={{ gridArea: 'hero' }}
        headline={pageTitle}
        description={pageDescription}
        imageSrc={data.hero.publicURL}
      />
      <MainContent>
        {data.components.nodes.map((component) => {
          const thumb = data.thumbnails.nodes.find(
            (thumb) => thumb.name === component.slug,
          );

          return (
            <ImageCard
              key={component.slug}
              title={component.title}
              to={`/${CATEGORY_SLUGS.COMPONENTS}/${component.slug}`}
              description={component.description}
              imageSrc={thumb && thumb.publicURL}
            />
          );
        })}
      </MainContent>
    </Layout>
  </ContextualAnalyticsData>
);

export const query = graphql`
  query {
    components: allWorkspaceInfo {
      nodes {
        description
        title
        slug
      }
    }
    hero: file(relativePath: { eq: "components@2x.png" }) {
      publicURL
    }
    thumbnails: allFile(
      filter: { relativeDirectory: { eq: "component-thumbs" } }
    ) {
      nodes {
        name
        publicURL
      }
    }
  }
`;

export default ComponentsPage;
