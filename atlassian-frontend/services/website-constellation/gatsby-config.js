// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const path = require(`path`);
const constellationPackages = require('./constellation-package-list');
const queries = require('./src/utils/algolia');

const config = {
  siteMetadata: {
    siteName: `Atlassian Design System`,
    siteUrl: `https://atlassian.design`,
    description: `Design, develop, deliver. Use Atlassian's end-to-end design language to create simple, intuitive, and beautiful experiences.`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn:
          'https://88f26962350949d290a6cedd0a3678d0@sentry.prod.atl-paas.net/1124',
        environment: process.env.GATSBY_CONSTELLATION_ENVIRONMENT || 'LOCAL',
        enabled: ['PROD', 'STAGING'].includes(
          process.env.GATSBY_CONSTELLATION_ENVIRONMENT,
        ),
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        include: /icons/,
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        transpileTemplateLiterals: false,
      },
    },
    {
      resolve: `@atlaskit/gatsby-theme-brisk`,
      options: {
        packages: constellationPackages,
        repository: 'https://bitbucket.org/atlassian/atlassian-frontend',
        internalAnchorOffset: '80',
        packageDocs: {
          folder: 'constellation',
          includeCodeTab: 'indexed', // 'all' | 'indexed' | 'none'
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONSTELLATION_CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONSTELLATION_CONTENTFUL_ACCESS_TOKEN,
        // this makes sure all of our rich text nodes are resolved without having to delete the cache
        // https://github.com/gatsbyjs/gatsby/issues/10592#issuecomment-542919638
        forceFullSync: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      // See: https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-6032469-95',
        head: false,
        anonymize: false,
        respectDNT: false,
        pageTransitionDelay: 0,
        defer: true,
      },
    },
    process.env.AXE && {
      resolve: 'gatsby-plugin-react-axe',
    },
  ].filter(Boolean),
};

if (process.env.CONSTELLATION_ENV !== 'staging') {
  config.plugins.push({
    resolve: `gatsby-plugin-algolia`,
    options: {
      appId: process.env.GATSBY_CONSTELLATION_ALGOLIA_APP_ID,
      apiKey: process.env.CONSTELLATION_ALGOLIA_ADMIN_KEY,
      queries,
      chunkSize: 1000, // default: 1000
    },
  });
}

module.exports = config;
