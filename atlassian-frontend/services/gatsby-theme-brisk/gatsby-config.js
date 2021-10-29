const fs = require('fs-extra');
const path = require('path');
const remarkSlug = require('remark-slug');
const { extractReactTypes } = require('extract-react-types');

const titleify = require('./src/utilities/titleify');
const rawExamplesPlugin = require('./plugins/remark/add-raw-to-imports');

const resolvePropTypes = ({ dir, packageJSON }) => {
  const filename = path.resolve(dir, packageJSON['atlaskit:src']);
  const content = fs.readFileSync(filename, 'utf-8');
  const typeSystem = 'typescript';
  const resolveOpts = {
    pathFilter: (pkg, location, dist) => {
      if (
        !pkg.types &&
        pkg['atlaskit:src'] &&
        location.includes('node_modules') &&
        location.includes(pkg.main)
      ) {
        return location.replace(dist, pkg['atlaskit:src']);
      }
      return null;
    },
    /*This is here for instances where there are paths which are not packages */
    moduleDirectory: ['node_modules', 'src'],
  };
  let types;

  try {
    types = extractReactTypes(content, typeSystem, filename, resolveOpts);
  } catch (e) {
    // TODO resolve ts.TypeOperator issue in extract-react-types
    // eslint-disable-next-line no-console
    console.warn(filename, e);
    // Capturing the error while initial parsing of props, so that it could be used further
    const errorMessage = `${packageJSON.name} was unable to have its props extracted automatically.
    This can happen when your props type uses more advance typing utilities than extract react types can handle.
    For help in working around this please read http://go.atlassian.com/dst-ert-help`;
    return JSON.stringify({
      error: { stack: e.stack, message: errorMessage },
    });
  }
  return JSON.stringify(types);
};

module.exports = (options) => {
  return {
    plugins: [
      `gatsby-plugin-typescript`,
      `gatsby-plugin-emotion`,
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-plugin-catch-links`,
        options: {
          excludePattern: /\.netlify\/functions\/*/,
        },
      },
      {
        resolve: `gatsby-plugin-mdx`,
        // eslint-disable-next-line global-require
        options: {
          extensions: [`.mdx`, `.md`],
          remarkPlugins: [rawExamplesPlugin, remarkSlug],
          gatsbyRemarkPlugins: [
            {
              resolve: 'gatsby-remark-copy-linked-files',
              options: {
                // `ignoreFileExtensions` defaults to [`png`, `jpg`, `jpeg`, `bmp`, `tiff`]
                // as it assumes you'll use gatsby-remark-images to handle
                // images in markdown. We do NOT do this because it brings in
                // dependencies with incompatible licenses.
                //
                // We need to explicitly ignore nothing by setting an empty array.
                ignoreFileExtensions: [],
              },
            },
          ],
          defaultLayouts: {
            default: require.resolve('./src/templates/page.tsx'),
          },
        },
      },
      {
        // this is a dummy config that gets replaced by what's generated in gatsby-node
        resolve: `gatsby-source-filesystem`,
        options: {
          path: path.resolve(__dirname),
        },
      },
      {
        resolve: '@manypkg/gatsby-source-workspace',
        options: {
          workspaceFilter: (ws) => options.packages.includes(ws.name),
          /*
            BC - I have defined the extra fields here that we think will be useful. This should not
            be considered a canon list of extra fields and we should be happy to both add, remove or modify
            these as the data actually demands.
          */
          extraFields: [
            {
              name: 'maintainers',
              definition: `[String]`,
            },
            {
              name: 'definition',
              definition: `String`,
              getFieldInfo: resolvePropTypes,
            },
            {
              name: 'slug',
              definition: `String`,
              getFieldInfo: async (ws) =>
                ws.packageJSON.slug ||
                ws.packageJSON.name.replace('@atlaskit/', ''),
            },
            {
              name: 'title',
              definition: `String`,
              getFieldInfo: async (ws) => {
                // Old metadata fields
                if (ws.packageJSON.atlaskit) {
                  if (ws.packageJSON.atlaskit.name) {
                    return ws.packageJSON.atlaskit.name;
                  }
                }
                // New metadata fields
                if (
                  ws.packageJSON.atlassian &&
                  ws.packageJSON.atlassian.website
                ) {
                  if (ws.packageJSON.atlassian.website.name) {
                    return ws.packageJSON.atlassian.website.name;
                  }
                }
                return titleify(ws.packageJSON.name.replace('@atlaskit/', ''));
              },
            },
            {
              name: 'team',
              definition: `String`,
              getFieldInfo: async (ws) => {
                if (ws.packageJSON.atlassian && ws.packageJSON.atlassian.team) {
                  return ws.packageJSON.atlassian.team;
                }
                return null;
              },
            },
            {
              name: 'group',
              definition: `String`,
              getFieldInfo: async (ws) => {
                const pathParts = ws.dir.split(path.sep);
                // Return the immediate folder above the last part - this is the grouping of the component.
                // E.g. "/Users/mdougall/projects/atlassian-frontend/packages/design-system/avatar" returns "design-system".
                return pathParts[pathParts.length - 2];
              },
            },
            {
              name: 'description',
              definition: `String`,
            },
            {
              name: 'docsList',
              definition: `[String]`,
              getFieldInfo: async (ws) => {
                const docsPath = path.join(ws.dir, 'docs');
                if (!(await fs.pathExists(docsPath))) {
                  return [];
                }

                const docs = await fs.readdir(docsPath);
                return docs;
              },
            },
            {
              name: 'examplesList',
              definition: `[String]`,
              getFieldInfo: async (ws) => {
                const examplesPath = path.join(ws.dir, 'examples');
                if (!(await fs.pathExists(examplesPath))) {
                  return [];
                }

                const examples = await fs.readdir(examplesPath);
                return examples;
              },
            },
            {
              name: 'rawChangelog',
              definition: `String`,
              getFieldInfo: async (ws) => {
                const changelogPath = path.join(ws.dir, 'CHANGELOG.md');
                if (!(await fs.pathExists(changelogPath))) {
                  return '';
                }

                return fs.readFile(changelogPath, 'utf-8');
              },
            },
          ],
        },
      },
    ],
  };
};
