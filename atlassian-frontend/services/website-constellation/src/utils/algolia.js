const categories = ['Patterns', 'Foundations', 'Resources', 'Brand', 'Content'];

const componentsQuery = `{
  allMdx {
    nodes {
      parent {
        ... on File {
          absolutePath
          name
          dir
        }
      }
      id
      frontmatter {
        description
      }
    }
  }
  allWorkspaceInfo {
    nodes {
      description
      slug
    }
  }
}`;

function createGuidelineQuery(category) {
  return `{
      allContentfulGuideline(filter: { category: { eq: "${category}" } }){
        nodes {
          id
          private
          slug
          title
          description {
            description
          }
          contentfulparent {
            slug
          }
        }
      }
    }`;
}

const settings = {
  searchableAttributes: ['title', 'description'],
  attributesToSnippet: [`description:20`],
};

function guidelineTransformer(data, category) {
  return filterRestrictedContent(data.allContentfulGuideline.nodes).map(
    ({ private: privateField, slug, contentfulparent, ...node }) => {
      const path = `/${category.toLowerCase()}${
        contentfulparent && contentfulparent.slug
          ? `/${contentfulparent.slug}`
          : ''
      }/${slug}`;
      return {
        ...node,
        path,
        description: node.description && node.description.description,
      };
    },
  );
}
function createGuidelineQueries() {
  return categories.map((category) => ({
    query: createGuidelineQuery(category),
    transformer: ({ data }) => guidelineTransformer(data, category),
    indexName: category,
    settings,
  }));
}

const mergeNodes = (nodes) => {
  const dedupedNodes = nodes.reduce((acc, curr) => {
    if (acc[curr.path]) {
      const accNode = acc[curr.path];
      acc[curr.path] = accNode;
    } else {
      acc[curr.path] = curr;
    }
    return acc;
  }, {});
  return Object.entries(dedupedNodes).map((entries) => entries[1]);
};

const formatFriendlyTitle = (title) =>
  // i.e. inline-dialog to Inline dialog
  title.replace(/^./, (str) => str.toUpperCase()).replace(/-/g, ' ');

const addUrl = (node, componentDescriptionMapping) => {
  // options.packageDocs.folder in gatsby config
  if (
    node.parent.absolutePath &&
    node.parent.absolutePath.match(
      /.*\/packages\/design-system\/(.*)\/constellation\/((?!index\/props).*)/,
    )
  ) {
    const originalPath = node.parent.absolutePath.replace('.mdx', '');
    // using _ as a placeholder for an unused value is helpful in this case
    // eslint-disable-next-line no-unused-vars
    const [_, pkgName, trail] = originalPath.match(
      /.*\/packages\/design-system\/(.*)\/constellation\/(.*)/,
    );
    let newPath = `/components/${pkgName}`;
    let name = pkgName;
    const [firstPath] = trail.split('/');

    if (firstPath !== 'index') {
      newPath += `/${firstPath}`;
      name = firstPath;
    }
    const { frontmatter, ...restNode } = node;
    return {
      ...restNode,
      parent: {
        name: node.parent.name,
      },
      // Sub-components have their description coming from MDX frontmatter,
      // and main components have the description coming from in packages.jsons in workspaceInfo
      description:
        node.frontmatter.description || componentDescriptionMapping[name],
      // Title change could possibly break the Pollinator check
      // https://pollinator.prod.atl-paas.net/checks/f7425790-6c31-4368-9911-3facd24cb51f
      // Please check the Pollinator test before making the change
      title: formatFriendlyTitle(name),
      pkgName,
      path: newPath,
    };
  }
  return null;
};

const componentTransformer = ({ data }) => {
  const componentDescriptionMapping = data.allWorkspaceInfo.nodes.reduce(
    (acc, curr) => {
      acc[curr.slug] = curr.description;
      return acc;
    },
    {},
  );
  return mergeNodes(
    data.allMdx.nodes
      .map((node) => addUrl(node, componentDescriptionMapping))
      .filter((n) => n),
  );
};

const filterRestrictedContent = (nodes) => {
  return nodes.filter((node) => !node.private);
};

const queries = [
  {
    query: componentsQuery,
    transformer: componentTransformer,
    indexName: 'Components',
    settings,
  },
  ...createGuidelineQueries(),
];

module.exports = queries;
module.exports.componentTransformer = componentTransformer;
module.exports.filterRestrictedContent = filterRestrictedContent;
module.exports.guidelineTransformer = guidelineTransformer;
