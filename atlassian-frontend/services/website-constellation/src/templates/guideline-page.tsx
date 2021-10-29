import React from 'react';
import { graphql } from 'gatsby';
import PageWithLocalNav from '@atlaskit/gatsby-theme-brisk/src/templates/page-with-local-nav';
import HeadingContext from '@atlaskit/gatsby-theme-brisk/src/components/local-nav/heading-context';
import {
  ContextualAnalyticsData,
  SCREEN,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';
import ContentRenderer from '../components/content-renderer';
import { ContentRenderingError } from '../components/content-error';
import getSidebar from '../utils/getSidebar';
import { normalizeSourceName } from '../utils/analytics';
import titleify from '../utils/titleify';

const slugify = require('github-slugger').slug;

const GuidelinePage: React.ComponentType<{ data: Record<string, any> }> = ({
  data,
}) => {
  const guideline = data?.contentfulGuideline;

  if (guideline) {
    const parsedContent =
      guideline?.bodyText?.raw && JSON.parse(guideline.bodyText.raw);
    const headingsContent =
      parsedContent?.content &&
      parsedContent?.content.filter(
        (node) =>
          node.nodeType === 'heading-2' || node.nodeType === 'heading-3',
      );

    let headingsContext = { headings: [] };
    if (headingsContent?.length) {
      const headings = headingsContent.map((heading) => {
        let depth = heading.nodeType === 'heading-2' ? 2 : 3;
        return {
          depth,
          value: heading.content[0].value,
          id: slugify(heading.content[0].value),
        };
      });

      headingsContext = {
        headings,
      };
    }

    const parentPage = guideline?.contentfulparent
      ? titleify(guideline.contentfulparent.slug)
      : guideline.title;
    const title = guideline.title;
    const parentPageTitle = parentPage === title ? null : parentPage;

    const sourceName = normalizeSourceName(guideline.category, guideline.title);
    const categoryName = normalizeSourceName(guideline.category);

    return (
      <ContextualAnalyticsData
        sourceType={SCREEN}
        sourceName="content"
        attributes={{ name: sourceName, context: categoryName }}
      >
        <HeadingContext.Provider value={headingsContext}>
          <PageWithLocalNav
            parentPageTitle={parentPageTitle}
            title={title}
            sidebar={getSidebar(guideline.category)}
            description={
              guideline.description && guideline.description.description
            }
            guidelineCategory={guideline.category}
          >
            <ContentRenderer richText={guideline.bodyText}>
              <FireScreenAnalytics />
            </ContentRenderer>
          </PageWithLocalNav>
        </HeadingContext.Provider>
      </ContextualAnalyticsData>
    );
  }

  return <ContentRenderingError />;
};

// This query is duplicated using the Contentful JS API in /server/routes/index.js
// When adjusting this query, adjust the `select` query there in tandem
export const query = graphql`
  query($slug: String!) {
    contentfulGuideline(slug: { eq: $slug }) {
      title
      contentfulparent {
        slug
      }
      category
      description {
        description
      }
      bodyText {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            file {
              url
            }
            description
          }
          ... on ContentfulGuideline {
            contentful_id
            slug
            category
          }
          ... on ContentfulDosAndDonts {
            contentful_id
            text
            type
            image {
              file {
                url
              }
            }
          }
          ... on ContentfulColorCard {
            contentful_id
            name
            hexCode
          }
          ... on ContentfulAssetCard {
            contentful_id
            title
            asset {
              file {
                details {
                  size
                }
                url
              }
            }
            thumbnail {
              file {
                url
              }
            }
          }
          ... on ContentfulAssetsContainer {
            contentful_id
            contentfulchildren {
              references {
                asset {
                  contentful_id
                  title
                  file {
                    url
                    details {
                      size
                    }
                  }
                }
                thumbnail {
                  contentful_id
                  file {
                    url
                  }
                }
              }
            }
          }
          ... on ContentfulMarkdown {
            contentful_id
            childContentfulMarkdownTextTextNode {
              text
            }
          }
        }
      }
    }
  }
`;

export default GuidelinePage;
