/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import Spinner from '@atlaskit/spinner';
import Layout, {
  MainContent,
} from '@atlaskit/gatsby-theme-brisk/src/components/layout';
import Hero from '@atlaskit/gatsby-theme-brisk/src/components/hero';
import LocalNav from '@atlaskit/gatsby-theme-brisk/src/components/local-nav/local-nav';
import {
  ContextualAnalyticsData,
  SCREEN,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';
import { graphql } from 'gatsby';
import PrivateRoute from '../components/PrivateRoute';
import { useData } from '../hooks';
import getSidebar from '../utils/getSidebar';
import ProtectedContentRenderer from '../components/protected-content-renderer';
import { normalizeSourceName } from '../utils/analytics';
import { getPageDescription } from '../utils/constants';
import { ContentRenderingError } from '../components/content-error';

const slugify = require('github-slugger').slug;

type Props = {
  data: Record<string, any>;
};

const ProtectedContent: React.ComponentType<Props> = ({ data }) => {
  const { contentfulGuideline: guideline } = data;
  const sourceName = normalizeSourceName(guideline.category, guideline.title);
  const categoryName = normalizeSourceName(guideline.category);

  return (
    <ContextualAnalyticsData
      sourceType={SCREEN}
      attributes={{ name: sourceName, context: categoryName, protected: true }}
      sourceName="content"
    >
      <Layout
        sidebar={getSidebar(guideline.category)}
        title={guideline.title}
        description={getPageDescription(categoryName)}
        categorySlug={guideline.category}
      >
        <PrivateRoute>
          <DynamicContentfulContent
            title={guideline.title}
            contentfulId={guideline.contentful_id}
          />
        </PrivateRoute>
      </Layout>
    </ContextualAnalyticsData>
  );
};

function DynamicContentfulContent({ title, contentfulId }) {
  const { data, isLoading } = useData(
    `${process.env.GATSBY_CONSTELLATION_API_ORIGIN}${process.env.GATSBY_CONSTELLATION_API_PATH}/contentful/${contentfulId}`,
  );

  if (isLoading) {
    return (
      <div
        css={{
          width: '100%',
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (data) {
    const headingsContent = data.fields.bodyText.content.filter(
      (node) => node.nodeType === 'heading-2' || node.nodeType === 'heading-3',
    );

    const headings = headingsContent.map((heading) => {
      let depth = heading.nodeType === 'heading-2' ? 2 : 3;
      return {
        depth,
        value: heading.content[0].value,
        id: slugify(heading.content[0].value),
      };
    });

    return (
      <Fragment>
        <Hero
          css={{ gridArea: 'hero' }}
          headline={title}
          description={data.fields.description}
        />
        <LocalNav headings={headings} />
        <MainContent>
          <ProtectedContentRenderer json={data.fields.bodyText}>
            <FireScreenAnalytics />
          </ProtectedContentRenderer>
        </MainContent>
      </Fragment>
    );
  }

  return <ContentRenderingError />;
}

export const query = graphql`
  query($slug: String!) {
    contentfulGuideline(slug: { eq: $slug }) {
      contentful_id
      title
      contentfulparent {
        slug
      }
      category
      description {
        description
      }
    }
  }
`;

export default ProtectedContent;
