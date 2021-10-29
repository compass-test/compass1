const { createContentDigest } = require('gatsby-core-utils');

// BC - I have written this function in a bunch of places and it really needs to be a lib
// sorry for copy-pasting it here again
const divideChangelog = (changelog) => {
  const splitToken = `__CHANGELOG_SPLIT_${Date.now()}__`;
  return changelog
    .replace(/([\n\r\s]##) (\d+\.\d+\.\d+)/g, `${splitToken}## $2`)
    .split(splitToken)
    .reduce((changelogEntry, md) => {
      // This should only allow us to skip the first chunk which is the name, as
      // well as the unreleased section.
      const match = md.match(/\d+\.\d+\.\d+/);

      const version = match ? match[0] : null;
      // If there is no version match in the markdown chunk, return the existing set of changelog entries
      if (!version) return changelogEntry;
      return changelogEntry.concat({
        version,
        md,
      });
    }, []);
};

async function registerChangelogMdx({ node, actions }) {
  const { createNode } = actions;
  // here we register changelog entries as MDX so we can render the markdown
  if (node.internal.type === 'workspaceInfo') {
    const changelogBits = divideChangelog(node.rawChangelog);
    for (const bit of changelogBits) {
      const name = `${node.name}__${bit.version}`;

      createNode({
        id: name,
        packageName: node.name,
        version: bit.version,
        parent: node.id,
        internal: {
          contentDigest: createContentDigest({
            name,
          }),
          mediaType: `text/markdown`,
          content: bit.md,
          type: 'ChangelogEntry',
        },
      });
    }
  }
}

module.exports = {
  divideChangelog,
  registerChangelogMdx,
};
