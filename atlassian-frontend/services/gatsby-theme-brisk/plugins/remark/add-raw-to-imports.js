// Please see md file for plugin explanation

const fs = require('fs');
const visit = require('unist-util-visit');
const pick = require('lodash/pick');

const globalImportMatch = /import\s+([\w${},\s*]+)\s*from\s*['"`]([^'"`]+)['"`]\s*/gm;
const nonGlobalImportMatch = /import\s+([\w${},\s*]+)\s*from\s*['"`]([^'"`]+)['"`]\s*/;

// We need one variable name per file for the raw filenames, so this makes sure to strip
// out anything that is unsafe in variable names. I have modified instead of stripping the
// full path location, to ensure that these remain unique.
const filePathToVarName = (filePath) => {
  return `RAW_UNSAFE${filePath
    .split('/')
    .map((a) => {
      if (a === '..') {
        return 'UPUP';
      }
      if (a === '.') {
        return 'UP';
      }
      return a;
    })
    .join('SLASH')
    .replace(/[^a-zA-Z0-9]/g, '_')}`;
};

/*
Noviny:

Real talk y'all, getting imports is trash, and tends to always be trash. The regex above is
a modified (simplified) version of the regex we are using in codesandboxer to find and modify
imports. It's illegible, and I am sorry.

We are doing this because remark-mdx does not divide an import node into anything more granular
than a string for the whole import statement ie. `import a from './a'
*/
const getImportInfo = (importValueString) => {
  const newImportNames = [];

  // In mdx, each import node can include multiple import statements, so we are handling this
  const imports = importValueString.match(globalImportMatch);

  /*
  This step takes `import a from './a'
  and maps it to { type: 'import', value: `import RAWa from '!!raw-loader!./a' }

  It also saves information about the importNames for later
  */
  const newNodes = imports.map((anImport) => {
    // eslint-disable-next-line no-unused-vars
    const [_, importValues, importLocation] = nonGlobalImportMatch.exec(
      anImport,
    );

    const rawImportName = filePathToVarName(importLocation);

    // Here all we want is the names of the imports within the file. We don't
    // care if they are default or not, nor how many of them there are. Because
    // of this, we can simply split on `,`
    // ie for import a, { b, c } from '../somewhere' we want ['a', 'b', 'c']
    importValues
      .split(',')
      .map((s) => s.replace('{', '').replace('}', '').trim())
      .forEach((importName) =>
        newImportNames.push({ importName, rawImportName, importLocation }),
      );

    return {
      type: 'import',
      value: `import ${rawImportName} from "!!raw-loader!${importLocation}"`,
    };
  });

  return { newNodes, newImportNames };
};

module.exports = () => (tree, file, next) => {
  // BC: I attempted to do a visitor on 'import', however this created an infinite loop of modifying the parent
  // and then the visitors being rerun - by modifying the root node directly, this avoids this loop but
  // is less elegant
  visit(tree, 'root', async (node) => {
    let lastIndex;

    // since we modify the node.children array, we need to filter it down instead of modifying the original
    const imports = node.children.filter((n, i) => {
      // We are filtering out files that do not live in an examples folder, to save on page weight
      // this check should likely be improved later to check whether a variable for a file is used in an examples component
      if (n.type === 'import' && n.value.includes('/examples/')) {
        lastIndex = i;
        return true;
      }
      return false;
    });

    if (imports.length) {
      const allNewNodes = [];
      const allImportNames = [];

      imports.forEach(({ value }) => {
        const { newNodes, newImportNames } = getImportInfo(value);

        allNewNodes.push(...newNodes);
        allImportNames.push(...newImportNames);
      });

      // Construct package information
      const [path, groupId, packageId] = file.history[0].match(
        /^.*\/packages\/([^/]+)\/([^/]+)/,
      );

      const fileHandle = await fs.promises.open(`${path}/package.json`, 'r');
      const fileRaw = await fileHandle.readFile({ encoding: 'utf-8' });
      const fileJSON = JSON.parse(fileRaw);
      fileHandle.close();

      const packageInfo = {
        groupId,
        packageId,
        ...pick(fileJSON, [
          'name',
          'version',
          'dependencies',
          'devDependencies',
          'peerDependencies',
        ]),
      };

      /*
      This node has as its job to attach the raw files as properties of the imports, so that
      they can be used by the <Examples /> component.

      The output of this will be approximately:

      <div hidden>
        {MyCoolComponent.__raw = RAW_UNSAFECoolPlace}
        {MyLessCoolComponent.__raw = RAW_UNSAFEUPBadPlace}
      </div>

      The hidden property has been added as these statements evaluate to true, so render the entire raw file
      contents.
      */
      const newJSXNode = {
        type: 'jsx',
        value: `<div hidden>${allImportNames
          .map(
            ({ importName, rawImportName, importLocation }) =>
              `{
                ${importName}.__raw = ${rawImportName},
                ${importName}.__path = "${importLocation}",
                ${importName}.__pkgJSON = ${JSON.stringify(packageInfo)},
                null
              }`,
          )
          .join('\n')}</div>`,
      };

      allNewNodes.push(newJSXNode);

      node.children.splice(lastIndex + 1, 0, ...allNewNodes);
    }

    next();
  });
};
