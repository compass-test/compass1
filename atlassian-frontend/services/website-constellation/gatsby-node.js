const merge = require('webpack-merge');
const fs = require('fs-extra');
const path = require('path');
const { introspectionQuery, graphql } = require('gatsby/graphql');

const guidelinesTemplate = require.resolve(
  './src/templates/guideline-page.tsx',
);
const ProtectedContentfulTemplate = require.resolve(
  './src/templates/protected-content.tsx',
);

let MultiEntrypointAliases;

try {
  // eslint-disable-next-line
  MultiEntrypointAliases = require('./aliases-written-map.json');
} catch (e) {
  throw new Error(
    'ERROR - Local aliases have not been written. Please write aliases before continuing by running `yarn constellation:aliases`',
  );
}

// create contentful pages
// eslint-disable-next-line no-shadow
exports.createPages = async function guidelinePages({ actions, graphql }) {
  const { createPage } = actions;
  const { data } = await graphql(`
    query {
      allContentfulGuideline {
        nodes {
          slug
          private
          category
          contentfulparent {
            slug
          }
        }
      }
    }
  `);

  data.allContentfulGuideline.nodes.forEach(
    ({ category, slug, private: isPrivate, contentfulparent }) => {
      const pagePath =
        contentfulparent && contentfulparent.slug
          ? `${category}/${contentfulparent.slug}/${slug}`.toLowerCase()
          : `${category}/${slug}`.toLowerCase();
      if (isPrivate) {
        createPage({
          path: pagePath,
          component: ProtectedContentfulTemplate,
          context: { slug },
        });
      } else {
        createPage({
          path: pagePath,
          component: guidelinesTemplate,
          context: { slug },
        });
      }
    },
  );
};

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  const config = getConfig();

  /**
   * Gatsby will set the target to be 'node' or 'web' based on
   * if it is doing SSR or not.
   *
   * That then affects how mainFields should be set, as we want to
   * prioritise the browser entrypoint for a package on the
   * web version and the main entrypoint for SSR.
   *
   * We add atlaskit:src at the beginning as that will then
   * prioritise accessing the source version instead of
   * whatever is compiled in dist. Look at the package.json
   * of an atlaskit package to see the difference in entrypoints.
   *
   * For more information on mainFields see:
   * <https://webpack.js.org/configuration/resolve/#resolvemainfields>
   */

  const mainFields =
    config.target === 'web'
      ? ['atlaskit:src', 'module', 'browser', 'main']
      : ['atlaskit:src', 'module', 'main', 'browser'];

  config.resolve = merge(config.resolve, {
    mainFields,
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      ...MultiEntrypointAliases,
      // Our analytics has stupid browser alias that aren't respected in SSR.
      // This fixes that.
      each: 'component-each',
      type: 'component-type',
      unserialize: 'yields-unserialize',
    },
  });

  config.module.rules = [
    // Omit the default rule where test === '\.jsx?$'
    ...config.module.rules.filter(
      (rule) => String(rule.test) !== String(/\.jsx?$/),
    ),
    // Recreate it with custom exclude filter
    {
      ...loaders.js(),
      test: /\.jsx?$/,
      exclude: (modulePath) =>
        /node_modules/.test(modulePath) &&
        /*
            What this regex is saying is:
            Do not exclude:
              - files in node_modules
              - that are in a @brisk-docs scoped package
              - BUT still exclude things in the node_modules of that package
          */
        !/node_modules\/@brisk-docs\/[^/]+\/(?!node_modules)/.test(modulePath),
    },
  ];
  actions.replaceWebpackConfig(config);
};

exports.createSchemaCustomization = ({ actions }) => {
  /**
   * There is a flaw in Contentful's GraphQL API where even if we mark our fields
   * as required, they still appear as nullable. This means we need to write
   * unnecessary guard code or use non-null assertions everywhere if we want to
   * use our GraphQL schema as the source of truth for our query types in TS,
   * which we do.
   *
   * Instead of writing code that doesn't actually reflect the state of our data,
   * here we are explicitly customising the schema for our custom Content Models
   * to make sure that required fields are marked correctly as non-nullable.
   *
   * See more https://www.contentfulcommunity.com/t/why-do-required-fields-appear-as-nullable-in-the-graphql-graph/4079
   * Full investigation write-up here: https://hello.atlassian.net/wiki/spaces/DST/pages/1038127034/Investigation+generating+TypeScript+types+from+our+Gatsby+GraphQL+schema
   *
   * All of the below types are custom Content Models that we update inside Contentful.
   * Only the properties with required fields are defined; we allow the rest to
   * be inferred by Gatsby upon schema creation. When we add required fields
   * in Contentful, we should update here.
   */
  const { createTypes } = actions;
  const typeDefs = `
  type ContentfulGuideline implements Node {
    title: String!
    iconGlyphName: String!
    slug: String!
    category: String!
    description: contentfulGuidelineDescriptionTextNode! @link(by: "id", from: "description___NODE")
    private: Boolean!
  }
  type ContentfulAssetCard implements Node {
    asset: ContentfulAsset! @link(by: "id", from: "asset___NODE")
    title: String!
    private: Boolean!
  }
  type ContentfulColorCard implements Node {
    name: String!
    hexCode: String!
  }
  type ContentfulDosAndDonts implements Node {
    type: String!
    text: String!
  }
`;
  createTypes(typeDefs);
};

exports.onPostBootstrap = async ({ store }) => {
  /**
   * Extract our graphql schema so that we can use it to generate TS types.
   * We want to do this when we update a gatsby plugin or customize the schema (see above)
   * */
  if (process.env.EXTRACT_SCHEMA) {
    try {
      const { schema } = store.getState();
      const data = await graphql(schema, introspectionQuery);
      await fs.writeFile(
        path.resolve(process.cwd(), `src/__generated__/schema.json`),
        JSON.stringify(data),
      );
      // Follow gatsby convention for success messages in build step
      console.log(
        'success Extracted the GraphQL schema to `./src/__generated__/schema.json`',
      );
    } catch (error) {
      console.error(
        'Error occured when extracting the GraphQL schema in gatsby-node.js:',
        error,
      );
    }
  }
};
