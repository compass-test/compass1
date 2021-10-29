const fs = require('fs');
const path = require('path');

const indexTemplate = require.resolve(`./../templates/package-page/index.tsx`);
const subPageTemplate = require.resolve(
  `./../templates/package-page/subpage.tsx`,
);

const throwErrorIfAlreadyOccured = async (packageName, { graphql }) => {
  const { data } = await graphql(`
    query {
      allWorkspaceInfo {
        nodes {
          definition
          name
        }
      }
    }
  `);

  const packageNode = data.allWorkspaceInfo.nodes.find(({ name }) => {
    return name === packageName;
  });
  const parsedDefinition = JSON.parse(packageNode.definition);
  const { error } = parsedDefinition;
  if (error) {
    // eslint-disable-next-line no-console
    console.warn(error.message);
    throw new Error(error.stack);
  }
};

async function processContentItem(item, packageInfo, gatsbyAPIs) {
  const { name } = item;
  if (item.isDirectory()) {
    // save subfolders
    if (name === 'index') {
      // eslint-disable-next-line no-param-reassign
      packageInfo.index.name = name;
      // eslint-disable-next-line no-param-reassign
      packageInfo.index.isFolder = true;
      const propFile = fs
        .readdirSync(`${packageInfo.docsPath}/${name}`)
        .find((file) => file === 'props.mdx');
      // check if there's a props override
      if (!propFile) {
        await throwErrorIfAlreadyOccured(packageInfo.name, gatsbyAPIs);
      }
      // eslint-disable-next-line no-param-reassign
      packageInfo.index.props = propFile;
    } else {
      // check if there's at least one mdx file inside
      const hasMdx = !!fs
        .readdirSync(`${packageInfo.docsPath}/${name}`)
        .find((file) => path.extname(file) === '.mdx');

      if (hasMdx) {
        packageInfo.subFolders.push(name);
      }
    }
  } else if (item.isFile() && path.extname(name) === '.mdx') {
    // save subpages
    if (name === 'index.mdx') {
      // if there's already an existing index folder, error
      if (packageInfo.index.name) {
        throw new Error(
          'Package can have an index file or index folder - not both',
        );
      }
      // eslint-disable-next-line no-param-reassign
      packageInfo.index.name = path.basename(name, '.mdx');
    } else {
      packageInfo.subPages.push(name);
    }
  }
}

async function processPackage(info, gatsbyAPIs) {
  const packageInfo = {
    ...info,
    subFolders: [],
    subPages: [],
    index: {
      name: undefined,
      isFolder: false,
      props: undefined,
    },
  };

  // get all package doc folder contents
  const contents = fs.existsSync(packageInfo.docsPath)
    ? fs.readdirSync(packageInfo.docsPath, {
        withFileTypes: true,
      })
    : [];

  await Promise.all(
    contents.map((item) => processContentItem(item, packageInfo, gatsbyAPIs)),
  );

  return packageInfo;
}

// create a subpage with tabs
function createSubFolder(folderName, { slug, name, docsPath }, { actions }) {
  actions.createPage({
    path: `components/${slug}/${folderName}`,
    matchPath: `components/${slug}/${folderName}/*`,
    component: subPageTemplate,
    context: {
      name,
      slug: folderName,
      mdxPath: `${docsPath}/${folderName}/*`,
      hasTabs: true,
    },
  });
}

// create a subpage with single mdx
function createSubPage(pageName, { slug, name, docsPath }, { actions }) {
  const pageSlug = path.basename(pageName, '.mdx');
  actions.createPage({
    path: `components/${slug}/${pageSlug}`,
    component: subPageTemplate,
    context: {
      name,
      slug: pageSlug,
      mdxPath: `${docsPath}/${pageName}`,
      hasTabs: false,
    },
  });
}

function createIndexPage(
  packageIndex,
  { slug, name, docsPath },
  { actions },
  { includeCodeTab },
) {
  if (packageIndex.isFolder) {
    // create tabs
    const context = {
      name,
      mdxPath: `${docsPath}/${packageIndex.name}/*`,
      hasMdx: true,
      hasTabs: true,
      hasProps: false,
      hasCodeDocs: includeCodeTab === 'all' || includeCodeTab === 'indexed',
    };

    if (packageIndex.props) {
      context.hasProps = true;
      context.propsPath = `${docsPath}/${packageIndex.name}/${packageIndex.props}`;
    }

    actions.createPage({
      path: `components/${slug}`,
      matchPath: `components/${slug}/*`,
      component: indexTemplate,
      context,
    });
  } else if (packageIndex.name) {
    // create index with one tab
    actions.createPage({
      path: `components/${slug}`,
      component: indexTemplate,
      context: {
        name,
        mdxPath: `${docsPath}/${packageIndex.name}`,
        hasTabs: false,
        hasMdx: true,
        hasProps: false,
        hasCodeDocs: includeCodeTab === 'all' || includeCodeTab === 'indexed',
      },
    });
  } else if (includeCodeTab === 'all') {
    // render just a code tab
    actions.createPage({
      path: `components/${slug}`,
      component: indexTemplate,
      context: {
        name,
        hasCodeDocs: true,
        hasMdx: false,
        hasProps: false,
      },
    });
  }
}

async function createPages(info, gatsbyAPIs, themeOptions) {
  const packageInfo = await processPackage(info, gatsbyAPIs);

  // create index page
  createIndexPage(
    packageInfo.index,
    packageInfo,
    gatsbyAPIs,
    themeOptions.packageDocs,
  );

  // create subpages
  packageInfo.subPages.forEach((page) => {
    createSubPage(page, packageInfo, gatsbyAPIs);
  });

  // create subfolders
  packageInfo.subFolders.forEach((folder) => {
    createSubFolder(folder, packageInfo, gatsbyAPIs);
  });
}

async function createPackagePages({ actions, graphql }, themeOptions) {
  const docsFolder = themeOptions.packageDocs.folder;

  // get all packages
  const { data } = await graphql(`
    query {
      allWorkspaceInfo {
        edges {
          node {
            name
            slug
            dir
          }
        }
      }
    }
  `);

  // process page rendering for each package
  await Promise.all(
    data.allWorkspaceInfo.edges.map((edge) => {
      const { slug, name } = edge.node;
      const docsPath = `${edge.node.dir}/${docsFolder}`;

      const packageInfo = {
        docsPath,
        slug,
        name,
      };

      return createPages(packageInfo, { actions, graphql }, themeOptions);
    }),
  );
}

module.exports = createPackagePages;
module.exports.processPackage = processPackage;
