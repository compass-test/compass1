const fs = require('fs');
const path = require('path');

const glob = require('glob');
const { kebabCase } = require('lodash');
const { Project } = require('ts-morph');

const disclaimer = `
/**
 * This file is generated from src/ui folder using \`node scripts/generate-examples\`
 **/
`;

const templateWithSettings = `
${disclaimer}
import settings, { $0 } from '$1';

import { createExample } from './utils';

export default createExample($0, settings);
`.trimLeft();

const templateWithoutSettings = `
${disclaimer}
import { $0 } from '$1';

import { createExample } from './utils';

export default createExample($0);
`.trimLeft();

function cleanExamples() {
  glob(path.join(__dirname, '../examples/*.tsx'), (err, exampleFiles) => {
    if (err) {
      throw err;
    }

    exampleFiles.forEach((fp) => {
      const basename = path.basename(fp);
      if (basename.match(/^[a-z\-_]+\.tsx$/)) {
        fs.unlinkSync(fp);
        // eslint-disable-next-line no-console
        console.log(`[DELETED] examples/${basename}`);
      }
    });
  });
}

const generateFileName = (pathFromSrc, name) => {
  const pathComponents = pathFromSrc.split(path.sep).concat(name);
  return `${pathComponents.map(kebabCase).join('_')}.tsx`;
};

function generateExamples() {
  glob(
    path.join(__dirname, '../src/**/examples.tsx'),
    (err, uiExampleFiles) => {
      if (err) {
        throw err;
      }

      for (const uiExampleFile of uiExampleFiles) {
        const project = new Project();
        const source = project.addSourceFileAtPath(uiExampleFile);
        const exports = source.getExportedDeclarations(0);
        const hasSettings = exports.has('default'); // E.g. decorators
        const tpl = hasSettings
          ? templateWithSettings
          : templateWithoutSettings;

        const importPath = path
          .relative(path.join(__dirname, '../examples'), uiExampleFile)
          .replace(/\.tsx?$/, ''); // $1 in the templates

        for (const [name] of exports) {
          if (name === 'default') {
            // eslint-disable-next-line no-continue
            continue;
          }
          const pathFromSrc = path.relative(
            path.join(__dirname, '../src'),
            path.dirname(uiExampleFile),
          );
          const fileName = generateFileName(pathFromSrc, name);
          const filePath = path.join(__dirname, '../examples', fileName);
          const fileContent = tpl
            .replace(/\$0/g, name)
            .replace(/\$1/g, importPath);
          fs.writeFileSync(filePath, fileContent, 'utf8');
          // eslint-disable-next-line no-console
          console.log(`[GENERATED] examples/${fileName}`);
        }
      }
    },
  );
}

cleanExamples();
generateExamples();
