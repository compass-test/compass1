/** @jsx jsx */
import { jsx } from '@emotion/core';
import { graphql, Link } from 'gatsby';
import Layout, {
  CardGroup,
  SpanAllContent,
} from '@atlaskit/gatsby-theme-brisk/src/components/layout';
import ArrowRight from '@atlaskit/icon/glyph/arrow-right';
import Card from '../components/cards/card';
import HeadingIcon from '../components/HeadingIcon';
import { CATEGORY_NAMES } from '../utils/constants';
import {
  ContextualAnalyticsData,
  SCREEN,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';
import FooterContent from '../@atlaskit/gatsby-theme-brisk/content/footer-content';
import {
  N300,
  N800,
  N10,
  B300,
  T200,
  R300,
  N40,
  N20,
  P300,
} from '@atlaskit/theme/colors';

const LinkToPage = ({ href, label }) => {
  return (
    <Link
      to={href}
      css={{
        margin: '12px 0 0 0',
        display: 'inline-flex',
        alignItems: 'center',
        width: 'fit-content',
        '& span': {
          transition: 'transform 0.2s ease-in 0s',
        },
        '&:hover span': {
          transform: 'translate3d(3px, 0px, 0px)',
        },
        label: 'animated-link',
      }}
    >
      {label}
      <ArrowRight label="" size="small" />
    </Link>
  );
};

const Section = ({ backgroundColor = N10, children, ...rest }) => (
  <section
    css={{
      backgroundColor: backgroundColor,
    }}
  >
    <div
      css={{
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '40px',
        display: 'flex',
      }}
      {...rest}
    >
      {children}
    </div>
  </section>
);

const HeroSection = ({ imageSrc }) => {
  return (
    <section
      css={{
        backgroundColor: N10,
        label: 'hero-section-wrapper',
        // Fixed height based on 8px grid prevents the image from shifting the layout when it loads in.
        // TODO: revisit when making site responsive
        height: '480px',
      }}
    >
      <div
        css={{
          height: '100%',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          label: 'grid-wrapper',
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '50%',
            label: 'content-wrapper',
          }}
        >
          <h1 className="hero-text">Design, develop, deliver</h1>
          <p
            className="headline2"
            style={{
              /**
               * DST-2007
               *
               * This style is necessary because of a bug in emotion + SSR causing
               * global styles to take precedence over local ones.
               *
               * This issue is fixed in v11+ of emotion.
               *
               * When we upgrade our version of emotion this `style` can be
               * replaced with `css`.
               */
              color: N300,
            }}
          >
            Use Atlassian’s end-to-end design language to create simple,
            intuitive and beautiful experiences.
          </p>
        </div>

        <img
          css={{ width: '50%', label: 'image-wrapper' }}
          src={imageSrc}
          alt=""
        />
      </div>
    </section>
  );
};

const FeaturedCard = ({
  title,
  description,
  href,
  linkLabel,
  imageSrc,
  categoryName,
}) => {
  return (
    <Link
      to={href}
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Fixed height based on 8px grid prevents the image from shifting the layout when it loads in.
        // TODO: revisit when making site responsive
        height: '272px',
        maxWidth: '50%',
        backgroundColor: 'white',
        borderRadius: '3px',
        transition: 'transform 0.3s ease-in',
        ':hover': {
          color: 'inherit',
          textDecoration: 'none',
          boxShadow:
            '0 8px 16px -4px rgba(9,30,66,0.25), 0 0 1px rgba(9,30,66,0.31);',
        },
      }}
    >
      <div
        css={{
          backgroundColor: N10,
          width: '45%',
          marginRight: '40px',
          borderRadius: '3px',
          label: 'image-wrapper',
        }}
      >
        <img src={imageSrc} alt="" css={{ width: '100%', display: 'block' }} />
      </div>
      <div
        css={{
          width: '55%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          label: 'content-wrapper',
        }}
      >
        <h2
          className="headline2"
          css={{
            display: 'flex',
            alignItems: 'center',
            label: 'content-heading',
            '& span:first-of-type': {
              marginRight: '12px',
            },
            marginTop: 0,
          }}
        >
          <HeadingIcon heading={categoryName} />
          {title}
        </h2>
        <p
          className="lg"
          css={{
            color: N300,
            paddingRight: '20px',
            label: 'content-description',
          }}
        >
          {description}
        </p>
        <p
          className="link"
          css={{
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              textDecoration: 'underline',
            },
            '& span': {
              transition: 'all 0.2s ease-in 0s',
            },
            ':hover span': {
              transform: 'translate3d(3px, 0px, 0px)',
              label: 'clickable-card',
            },
            label: 'animated-link',
          }}
        >
          {linkLabel}
          <ArrowRight label="" size="small" />
        </p>
      </div>
    </Link>
  );
};

const Footer = () => <FooterContent isDark={true} />;

const HomePage: React.ComponentType<{ data: Record<string, any> }> = ({
  data,
}) => {
  return (
    <ContextualAnalyticsData sourceType={SCREEN} sourceName="home">
      <Layout footer={Footer}>
        <SpanAllContent>
          <FireScreenAnalytics />
          <HeroSection imageSrc={data.hero.publicURL} />

          <Section
            backgroundColor={N800}
            css={{
              '> *:not(:last-child)': {
                marginRight: '20px',
              },
            }}
          >
            <FeaturedCard
              title="Components"
              description="Components are the intuitive building blocks of our design
          system."
              categoryName={CATEGORY_NAMES.COMPONENTS}
              href={'/components'}
              linkLabel="Explore our components"
              imageSrc={data.featuredImageComponents.publicURL}
            />

            <FeaturedCard
              title="Patterns"
              description="Patterns are reusable combinations of our components that solve
            common user problems."
              categoryName={CATEGORY_NAMES.PATTERNS}
              href={'/patterns'}
              linkLabel="Explore our patterns"
              imageSrc={data.featuredImagePatterns.publicURL}
            />
          </Section>

          <Section
            backgroundColor={N10}
            css={{ borderBottom: `1px solid ${N40}` }}
          >
            <div
              css={{
                minWidth: 360,
                maxWidth: '32%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h2
                className="headline2"
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  '& span:first-of-type': {
                    marginRight: '12px',
                  },
                  marginTop: 0,
                }}
              >
                <HeadingIcon heading={CATEGORY_NAMES.BRAND} />
                Brand
              </h2>
              <p className="lg" css={{ color: N300, paddingRight: '20px' }}>
                Our brand reflects who we are and how we want our users to feel
                when they use our products.
              </p>
              <LinkToPage href={'/brand'} label={'Explore our brand'} />
            </div>
            <CardGroup>
              {data.brand.nodes.map((item) => (
                <Card
                  key={item.slug}
                  to={`brand/${item.slug}`}
                  title={item.title}
                  description={item.description.description}
                  iconGlyph={item.iconGlyphName}
                  tileColor={B300}
                  headingLevel={3}
                />
              ))}
            </CardGroup>
          </Section>

          <Section
            backgroundColor={N10}
            css={{ borderBottom: `1px solid ${N40}` }}
          >
            <div
              css={{
                minWidth: 360,
                maxWidth: '32%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h2
                className="headline2"
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  '& span:first-of-type': {
                    marginRight: '12px',
                  },
                  marginTop: 0,
                }}
              >
                <HeadingIcon heading={CATEGORY_NAMES.FOUNDATIONS} />
                Foundations
              </h2>
              <p className="lg" css={{ color: N300, paddingRight: '20px' }}>
                Foundations are the visual elements needed to create engaging
                layouts and end-to-end user experiences.
              </p>
              <LinkToPage
                href={'/foundations'}
                label={'Explore our foundations'}
              />
            </div>
            <CardGroup>
              {data.foundations.nodes.map((item) => (
                <Card
                  key={item.slug}
                  to={`foundations/${item.slug}`}
                  title={item.title}
                  description={item.description.description}
                  iconGlyph={item.iconGlyphName}
                  tileColor={T200}
                  headingLevel={3}
                />
              ))}
            </CardGroup>
          </Section>

          <Section backgroundColor={N10}>
            <div
              css={{
                minWidth: 360,
                maxWidth: '32%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h2
                className="headline2"
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  '& span:first-of-type': {
                    marginRight: '12px',
                  },
                  marginTop: 0,
                }}
              >
                <HeadingIcon heading={CATEGORY_NAMES.CONTENT} />
                Content
              </h2>
              <p className="lg" css={{ color: N300, paddingRight: '20px' }}>
                Our content guidance covers our voice and tone, and the
                mechanics of our grammar and style.
              </p>
              <LinkToPage
                href={'/content'}
                label={'Explore content guidance'}
              />
            </div>

            <CardGroup>
              {data.content.nodes.map((item) => (
                <Card
                  key={item.slug}
                  to={`content/${item.slug}`}
                  title={item.title}
                  description={item.description.description}
                  iconGlyph={item.iconGlyphName}
                  tileColor={R300}
                  headingLevel={3}
                />
              ))}
            </CardGroup>
          </Section>

          <Section backgroundColor={N20} css={{ display: 'block' }}>
            <h2
              className="headline1"
              css={{ textAlign: 'center', marginTop: 0 }}
            >
              Resources
            </h2>
            <p
              className="lg"
              css={{ textAlign: 'center', color: N300, marginBottom: 20 }}
            >
              A collection of tools, kits, plugins and guides to help simplify
              the creation process for our users.
            </p>

            <CardGroup
              css={{
                columnGap: 32,
              }}
            >
              {data.resources.nodes.map((item) => (
                <Card
                  key={item.slug}
                  css={{ minHeight: '224px' }}
                  to={`resources/${item.slug}`}
                  title={item.title}
                  description={item.description.description}
                  iconGlyph={item.iconGlyphName}
                  tileColor={P300}
                />
              ))}
            </CardGroup>
          </Section>
        </SpanAllContent>
      </Layout>
    </ContextualAnalyticsData>
  );
};

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "homepage@2x.png" }) {
      publicURL
    }
    featuredImageComponents: file(
      relativePath: { eq: "homepage-components@2x.png" }
    ) {
      publicURL
    }
    featuredImagePatterns: file(
      relativePath: { eq: "homepage-patterns@2x.png" }
    ) {
      publicURL
    }
    brand: allContentfulGuideline(
      filter: { slug: { in: ["mission", "personality", "promise"] } }
      sort: { order: ASC, fields: title }
    ) {
      nodes {
        title
        slug
        description {
          description
        }
        iconGlyphName
      }
    }
    foundations: allContentfulGuideline(
      filter: { slug: { in: ["color", "typography", "iconography"] } }
      sort: { order: ASC, fields: title }
    ) {
      nodes {
        title
        slug
        description {
          description
        }
        iconGlyphName
      }
    }
    content: allContentfulGuideline(
      filter: {
        slug: { in: ["vocabulary", "language-and-grammar", "writing-style"] }
      }
      sort: { order: ASC, fields: title }
    ) {
      nodes {
        title
        slug
        description {
          description
        }
        iconGlyphName
      }
    }
    resources: allContentfulGuideline(
      filter: {
        category: { eq: "Resources" }
        slug: {
          in: [
            "presentation-kit"
            "logo-library"
            "illustration-library"
            "fonts"
            "figma-library"
            "contribution"
          ]
        }
      }
      sort: { order: ASC, fields: title }
    ) {
      nodes {
        title
        slug
        category
        description {
          description
        }
        iconGlyphName
      }
    }
  }
`;

export default HomePage;
