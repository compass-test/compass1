/**
 * @file Packages config
 *
 * This config relates to package structure
 */

const { guidelinesPlaceholder } = require('../../utils/shared-settings');

module.exports = {
  meta: {
    docs: {
      description:
        'Contains all package-related rules, configured to adhere to the [package structure guidelines](../../guides/architecture/general/apps/README.md)',
    },
  },
  config: {
    plugins: ['tangerine'],
    rules: {
      'tangerine/import/no-parent-imports': [
        'error',
        {
          dirs: ['src/ui'],
          message: `For more details see ${guidelinesPlaceholder}/architecture/general/components/components-types/ui/`,
        },
      ],
      'tangerine/import/no-restricted-paths': [
        'error',
        {
          restrictions: [
            {
              target: 'src/services',
              from: ['src/controllers', 'src/ui'],
            },
            {
              target: 'src/controllers',
              from: ['src/services', 'src/ui'],
            },
            {
              target: 'src/common',
              from: ['src/services', 'src/controllers', 'src/ui'],
            },
          ],
          message: `For more details see ${guidelinesPlaceholder}/architecture/general/apps/`,
        },
      ],
      'tangerine/import/no-nested-imports': [
        'error',
        {
          dirs: ['src/common', 'src/controllers', 'src/services', 'src/ui'],
          message: `For more details see ${guidelinesPlaceholder}/architecture/general/apps/`,
        },
      ],
    },
  },
};
