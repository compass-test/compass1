import { basename } from 'path';

import type { Rule } from 'eslint';
import readPkgUp from 'read-pkg-up';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      missingEntry: 'Expect atlaskit:src to be in package.json',
      incorrectEntry: 'Expect package.json atlaskit:src to match src/index*',
    },
  },
  create(context) {
    const filename = context.getFilename();
    if (
      filename !== '<input>' &&
      !(filename.endsWith('src/index.ts') || filename.endsWith('src/index.tsx'))
    ) {
      return {};
    }

    const { packageJson } = readPkgUp.sync({
      cwd: filename,
      normalize: false,
    })!;
    const srcValue = packageJson['atlaskit:src'] as string;

    return {
      'Program:exit': (node: Rule.Node) => {
        if (!srcValue) {
          return context.report({
            node,
            messageId: 'missingEntry',
          });
        }

        if (srcValue === `src/${basename(filename)}`) {
          return;
        }

        return context.report({
          node,
          messageId: 'incorrectEntry',
        });
      },
    };
  },
};

export default rule;
