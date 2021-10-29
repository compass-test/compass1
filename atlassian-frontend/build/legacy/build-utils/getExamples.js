/*
 * Utilities helper to return all the examples and filter them by packages
 */
const bolt = require('bolt');
const globby = require('globby');
const path = require('path');

// Get all examples for a specified package.
async function getExamplesFor(
  pkgName /*: string */,
) /*: Promise<Array<string>> */ {
  const examplesArr = [];
  const workspaces = await bolt.getWorkspaces();
  const [workspaceFilteredByName] = workspaces
    // This is possible to use `@atlaskit/button` or `button`.
    .filter(
      workspace =>
        workspace.dir.includes(pkgName) || workspace.name === pkgName,
    );
  const examplesPath = globby.sync(['examples/*.+(js|ts|tsx)'], {
    cwd: workspaceFilteredByName.dir,
  });

  for (const examplePath of examplesPath) {
    const filePath = path.join(workspaceFilteredByName.dir, examplePath);
    examplesArr.push({ filePath });
  }
  return examplesArr;
}

module.exports = { getExamplesFor };
