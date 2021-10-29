const fs = require('fs');
const path = require('path');
const clonedeep = require('lodash/cloneDeep');
const getWorkspaces = require('get-workspaces').default;

async function getPackageDocsPaths(options) {
  // get all packages in the root
  const workspaceList = await getWorkspaces({
    cwd: path.resolve(__dirname, '..', '..', '..', '..'),
  });
  const sourceFileSystemPaths = [];

  // get the packages specified by the theme config
  const workspaces = workspaceList.filter((ws) => {
    return options.packages.includes(ws.name);
  });

  // if it has a docs folder, source it
  workspaces.forEach((ws) => {
    const docsPath = `${ws.dir}/${options.docsFolder}`;
    if (fs.existsSync(docsPath)) {
      sourceFileSystemPaths.push(docsPath);
    }
  });

  return sourceFileSystemPaths;
}

// We do this here because get-workspaces is async and we can't have async functions in the gatsby-config
// For each package, we need to add its docs folder to the graphql layer with gatsby-source-filesystem
async function sourcePackageDocs({ store }, themeOptions) {
  const { workspaces, packages } = themeOptions;
  const docsFolder = themeOptions.packageDocs.folder;

  const state = store.getState();
  let basePluginIndex;

  // find the flattened gatsby-source-filesystem plugin
  const basePlugin = state.flattenedPlugins.find((plugin, index) => {
    if (plugin.name === 'gatsby-source-filesystem') {
      basePluginIndex = index;
      return true;
    }
    return false;
  });

  // get all the paths we need to source
  const folderPaths = await getPackageDocsPaths({
    docsFolder,
    workspaces,
    packages,
  });

  const plugins = [];

  // create a plugin configuration for each package
  folderPaths.forEach((folderPath) => {
    // copy the base plugin
    const pluginCopy = clonedeep(basePlugin);
    pluginCopy.pluginOptions.path = folderPath;
    plugins.push(pluginCopy);
  });

  // remove the dummy config and add each package config to gatsby
  state.flattenedPlugins.splice(basePluginIndex, 1, ...plugins);
}

module.exports = sourcePackageDocs;
