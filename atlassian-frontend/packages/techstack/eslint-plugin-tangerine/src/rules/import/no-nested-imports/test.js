const { ruleTester } = require('@atlassian/eslint-utils');

const getPkgRoot = require('../../../utils/get-pkg-root');
const { requireResolve } = require('../../../utils/require-resolve');

const rule = require('./index');

jest.mock('../../../utils/require-resolve');

jest.mock('../../../utils/get-pkg-root');

describe('no-nested-imports', () => {
  beforeEach(() => {
    // Resolve files to their same path - i.e. file
    requireResolve.mockImplementation(thePath => thePath);
    getPkgRoot.mockImplementation(() => '/Users/test/src');
  });

  ruleTester.run('', rule, {
    valid: [
      {
        // name: 'not importing more than one dir deep'
        code: `import { Child } from './child/main.js';
      import { Foo } from './child';`,
        filename: '/Users/test/src/dir/foo.js',
      },
      {
        // name: 'not inside specified dirs',
        code: `import { Foo } from './bar/a/b.js';`,
        filename: '/Users/test/src/baz/foo.js',
        options: [
          {
            dirs: ['foo', 'bar'],
          },
        ],
      },
      {
        // name: 'not underneath custom base path',
        code: "import { Foo } from './bar/child/grandchild/file.js';",
        filename: '/Users/test/src/other-pkg/foo.js',
        options: [
          {
            basePath: '/Users/test/src/pkg',
          },
        ],
      },
      {
        // name: 'not in specified dirs under custom base path',
        code: "import { Foo } from './bar/child/grandchild/file.js';",
        filename: '/Users/test/src/pkg/services/foo.js',
        options: [
          {
            basePath: '/Users/test/src/pkg',
            dirs: ['ui'],
          },
        ],
      },
      {
        // name: 'not in specified dirs under relative custom base path',
        code: "import { Foo } from './bar/child/grandchild/file.js';",
        filename: './pkg/services/foo.js',
        options: [
          {
            basePath: './pkg',
            dirs: ['ui'],
          },
        ],
      },
      {
        // name: 'importing ancestor'
        code: `import { Child } from '../parent.js';`,
        filename: '/Users/test/src/dir/foo.js',
      },
      {
        // name: 'importing sibling'
        code: `import { Child } from './sibling.js';`,
        filename: '/Users/test/src/dir/foo.js',
      },
      {
        // name: 'importing different branch'
        code: `import { Child } from '../parent/child/grandchild/a.js';`,
        filename: '/Users/test/src/dir/foo.js',
      },
    ],
    invalid: [
      {
        // name: 'importing descendant more than one level deep',
        code: "import { Foo } from './bar/child/grandchild/file.js';",
        filename: '/Users/test/src/dir/foo.js',
        errors: [
          {
            messageId: 'invalidImport',
            data: {
              dir: '',
              message: '',
            },
          },
        ],
      },
      {
        // name: 'multiple errors',
        code: `import { Foo } from './bar/child/grandchild/file.js';
      import { Bar } from './child/grandchild/greatgreat/file.js';`,
        filename: '/Users/test/src/dir/foo.js',
        errors: [
          {
            messageId: 'invalidImport',
            data: {
              dir: '',
              message: '',
            },
          },
          {
            messageId: 'invalidImport',
            data: {
              dir: '',
              message: '',
            },
          },
        ],
      },
      {
        // name: 'errors when inside specified dirs',
        code: `import { Foo } from './bar/a/b.js';`,
        filename: '/Users/test/src/ui/foo.js',
        options: [
          {
            dirs: ['ui'],
          },
        ],
        errors: [
          {
            messageId: 'invalidImport',
            data: {
              dir: " inside 'ui'",
              message: '',
            },
          },
        ],
      },
      {
        // name: 'custom error message',
        code: "import { Foo } from './bar/child/grandchild/file.js';",
        filename: '/Users/test/src/dir/foo.js',
        options: [
          {
            message: 'see here for more details',
          },
        ],
        errors: [
          {
            messageId: 'invalidImport',
            data: {
              dir: '',
              message: '; see here for more details',
            },
          },
        ],
      },
      {
        // name: 'only dirs under custom base path',
        code: "import { Foo } from './bar/child/grandchild/file.js';",
        filename: '/Users/test/src/pkg/foo.js',
        options: [
          {
            basePath: '/Users/test/src/pkg',
          },
        ],
        errors: [
          {
            messageId: 'invalidImport',
            data: {
              dir: '',
              message: '',
            },
          },
        ],
      },
      {
        // name: 'specified dirs under custom base path',
        code: "import { Foo } from './bar/child/grandchild/file.js';",
        filename: '/Users/test/src/pkg/ui/foo.js',
        options: [
          {
            basePath: '/Users/test/src/pkg',
            dirs: ['ui'],
          },
        ],
        errors: [
          {
            messageId: 'invalidImport',
            data: {
              dir: " inside 'ui'",
              message: '',
            },
          },
        ],
      },
      {
        // name: 'specified dirs under relative custom base path',
        code: "import { Foo } from './bar/child/grandchild/file.js';",
        filename: './pkg/ui/foo.js',
        options: [
          {
            basePath: './pkg',
            dirs: ['ui'],
          },
        ],
        errors: [
          {
            messageId: 'invalidImport',
            data: {
              dir: " inside 'ui'",
              message: '',
            },
          },
        ],
      },
    ],
  });

  describe('handles unresolved node import', () => {
    beforeEach(() => {
      requireResolve.mockImplementation(() => false);
    });
    ruleTester.run('', rule, {
      valid: [
        {
          // name: 'node module'
          code: `import React from 'react';`,
          filename: '/Users/test/src/dir/foo.js',
        },
      ],
      invalid: [],
    });
  });

  describe('handles ambiguous file scenario', () => {
    beforeEach(() => {
      requireResolve.mockImplementation(
        () => '/Users/test/src/dir/child/main.js',
      );
    });
    ruleTester.run('', rule, {
      valid: [
        {
          // name: 'ambiguous file - not more than one dir deep'
          code: `import { Child } from './child/main';`,
          filename: '/Users/test/src/dir/foo.js',
        },
      ],
      invalid: [
        {
          // name: 'ambiguous file - more than one dir deep'
          code: `import { Child } from './dir/child/main';`,
          filename: '/Users/test/src/foo.js',
          errors: [
            {
              messageId: 'invalidImport',
              data: {
                dir: '',
                message: '',
              },
            },
          ],
        },
      ],
    });
  });

  describe('handles ambiguous dir scenario', () => {
    beforeEach(() => {
      requireResolve.mockImplementation(
        () => '/Users/test/src/dir/child/main/index.js',
      );
    });
    ruleTester.run('', rule, {
      valid: [
        {
          // name: 'ambiguous dur - not more than one dir deep'
          code: `import { Child } from './main';`,
          filename: '/Users/test/src/dir/child/index.js',
        },
      ],
      invalid: [
        {
          // name: 'ambiguous dir - more than one dir deep'
          code: `import { Child } from './dir/child/main';`,
          filename: '/Users/test/src/dir/foo.js',
          errors: [
            {
              messageId: 'invalidImport',
              data: {
                dir: '',
                message: '',
              },
            },
          ],
        },
      ],
    });
  });
});
