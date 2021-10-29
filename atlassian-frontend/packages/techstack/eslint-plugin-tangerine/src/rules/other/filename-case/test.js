const { ruleTester } = require('@atlassian/eslint-utils');

const rule = require('./index');

ruleTester.run('filename-case', rule, {
  valid: [
    {
      code: '// empty',
      options: [{ case: 'kebab' }],
      filename: 'kebab-case/kebab-case.js',
    },
    {
      code: '// empty',
      filename: 'kebab-case/kebab-case.js',
    },
    {
      code: '// empty',
      filename: 'kebab-case/kebab-case.test.js',
      options: [{ suffixes: ['.test'] }],
    },
    {
      code: '// empty',
      filename: 'kebab-case/kebab-case.suffix.js',
      options: [{ suffixes: ['.suffix'] }],
    },
    {
      code: '// empty',
      filename: 'kebab-case/kebab-case.another.js',
      options: [{ suffixes: ['.suffix', '.another'] }],
    },
    {
      code: '// empty',
      options: [{ case: 'camel' }],
      filename: 'camelCase/camelCase.js',
    },
  ],
  invalid: [
    {
      code: '// empty',
      options: [{ case: 'kebab' }],
      filename: 'camelCase.js',
      errors: [
        {
          messageId: 'invalidFileName',
          data: { baseFileName: 'camelCase', case: 'kebab' },
        },
      ],
    },
    {
      code: '// empty',
      options: [{ case: 'kebab' }],
      filename: 'kebab-case.test.js',
      errors: [
        {
          messageId: 'invalidFileName',
          data: { baseFileName: 'kebab-case.test', case: 'kebab' },
        },
      ],
    },
    {
      code: '// empty',
      options: [{ case: 'kebab', suffixes: ['.test'] }],
      filename: 'kebab-case.invalid.js',
      errors: [
        {
          messageId: 'invalidFileName',
          data: { baseFileName: 'kebab-case.invalid', case: 'kebab' },
        },
      ],
    },
    {
      code: '// empty',
      options: [{ case: 'kebab', suffixes: ['.test'] }],
      filename: 'kebab-case+test.js',
      errors: [
        {
          messageId: 'invalidFileName',
          data: { baseFileName: 'kebab-case+test', case: 'kebab' },
        },
      ],
    },
    {
      code: '// empty',
      options: [{ case: 'kebab', suffixes: ['.test'] }],
      filename: 'kebab-case..test.js',
      errors: [
        {
          messageId: 'invalidFileName',
          data: { baseFileName: 'kebab-case..test', case: 'kebab' },
        },
      ],
    },
    {
      code: '// empty',
      options: [{ case: 'kebab', suffixes: ['.test'] }],
      filename: 'kebab-case.test/kebab-case.test.js',
      errors: [
        {
          messageId: 'invalidFolderName',
          data: {
            invalidFoldersString: 'kebab-case.test',
            fileName: 'kebab-case.test/kebab-case.test.js',
            case: 'kebab',
          },
        },
      ],
    },
    {
      code: '// empty',
      options: [{ case: 'camel' }],
      filename: 'kebab-case.js',
      errors: [
        {
          messageId: 'invalidFileName',
          data: { baseFileName: 'kebab-case', case: 'camel' },
        },
      ],
    },
    {
      code: '// empty',
      options: [{ case: 'camel' }],
      filename: 'kebab-case/CAPS/camelCase.js',
      errors: [
        {
          messageId: 'invalidFolderName',
          data: {
            invalidFoldersString: 'kebab-case, CAPS',
            fileName: 'kebab-case/CAPS/camelCase.js',
            case: 'camel',
          },
        },
      ],
    },
  ],
});
