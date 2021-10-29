/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import Layout, {
  MainContent,
} from '@atlaskit/gatsby-theme-brisk/src/components/layout';
import {
  ContextualAnalyticsData,
  SCREEN,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';
import Hero from '@atlaskit/gatsby-theme-brisk/src/components/hero';
import Card from '../components/cards/card';
import { normalizeSourceName } from '../utils/analytics';
import titleify from '../utils/titleify';

type Props = {
  sidebar: React.ElementType;
  title: string;
  description: string;
  heroimageSrc?: string;
  categorySlug: string;
  entries: Array<any>;
  tileColor?: string;
  defaultIcon?: string;
  guidelineCategory?: string;
};

const OverviewPage: React.FC<Props> = ({
  sidebar,
  title,
  description,
  heroimageSrc,
  categorySlug,
  entries,
  tileColor,
  defaultIcon,
  guidelineCategory,
}) => {
  return (
    <ContextualAnalyticsData
      sourceType={SCREEN}
      sourceName="index"
      attributes={{
        name: `${normalizeSourceName(title)}Home`,
        entriesCount: entries.length,
      }}
    >
      <FireScreenAnalytics key={title} />
      <Layout
        title={title}
        sidebar={sidebar}
        description={description}
        categorySlug={titleify(categorySlug)}
        guidelineCategory={guidelineCategory}
      >
        <Hero
          css={{ gridArea: 'hero' }}
          headline={title}
          description={description}
          imageSrc={heroimageSrc}
        />
        <MainContent>
          {entries.length >= 9 ? (
            <Fragment>
              {entries.map((content, index) => {
                const urlPath =
                  content.contentfulparent && content.contentfulparent.slug
                    ? `/${categorySlug}/${content.contentfulparent.slug}/${content.slug}`
                    : `/${categorySlug}/${content.slug}`;
                if (
                  categorySlug === 'foundations' &&
                  (index === 0 || index === 1)
                ) {
                  return (
                    <Card
                      key={content.slug}
                      title={content.title}
                      description={content.description.description}
                      to={urlPath}
                      variant="half"
                      iconGlyph={
                        content.iconGlyphName || defaultIcon || 'addon'
                      }
                      tileColor={tileColor}
                    />
                  );
                }

                return (
                  <Card
                    key={content.slug}
                    title={content.title}
                    description={content.description.description}
                    to={urlPath}
                    iconGlyph={content.iconGlyphName || defaultIcon || 'addon'}
                    tileColor={tileColor}
                  />
                );
              })}
            </Fragment>
          ) : (
            <Fragment>
              {entries.map((content) => (
                <Card
                  key={content.slug}
                  title={content.title}
                  description={content.description.description}
                  to={`/${categorySlug}/${content.slug}`}
                  variant="half"
                  iconGlyph={content.iconGlyphName || defaultIcon || 'addon'}
                  tileColor={tileColor}
                />
              ))}
            </Fragment>
          )}
        </MainContent>
      </Layout>
    </ContextualAnalyticsData>
  );
};

export default OverviewPage;
