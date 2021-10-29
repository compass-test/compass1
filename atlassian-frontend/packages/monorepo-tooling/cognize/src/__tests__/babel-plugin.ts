import pluginTester, { TestObject } from 'babel-plugin-tester';

import path from 'path';

import babelPlugin from '../babel-plugin';

import { PluginCache, BabelPlugin } from '../types';

const commonOpts = {
  plugin: babelPlugin,
  pluginName: '@atlaskit/cognize',
  babelOptions: require('../test-utils/babel.config.js'),
  formatResult: (s: any) => s,
  snapshot: true,
};

const logger = (cache: PluginCache) => Array.from(cache.entries());

let customLogger: jest.Mock = jest.fn();
let consoleLogSpy: jest.SpyInstance = jest.fn();

describe('Plugin options', () => {
  beforeEach(() => {
    customLogger = customLogger.mockImplementation(logger);
    consoleLogSpy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    customLogger.mockReset();
  });

  pluginTester({
    ...commonOpts,
    tests: [
      {
        title: 'does not call custom logger if not passed through options',
        code: `import React from 'react';
import { B200, N0, N70A } from '@atlaskit/theme/colors';
export default {
  B200,
  N0,
  N70A
};`,
        pluginOptions: {
          targetImports: '@atlaskit/theme/colors',
        },
        setup() {
          consoleLogSpy.mockImplementationOnce(() => {});
        },
        teardown() {
          expect(consoleLogSpy).toBeCalled();
          expect(customLogger).toBeCalledTimes(0);
        },
      } as TestObject,
      {
        title: 'loads custom visitor',
        code: `import React from 'react';
import { B200, N0, N70A } from '@atlaskit/theme/colors';
const myFunc = () => B200();
myFunc();
export default {
  B200,
  N0,
  N70A
};`,
        pluginOptions: {
          targetImports: '@atlaskit/theme/colors',
          customVisitors: path.join(__dirname, '../test-utils/my-visitors.js'),
          customLogger,
        },
        teardown() {
          expect(customLogger).toBeCalledWith(
            new Map().set('', {
              BaseProjectName: '@atlaskit/fabric',
              DependencyVersions: {},
              File: '',
              CallExpressions: [
                {
                  end: 109,
                  extra: undefined,
                  innerComments: null,
                  leadingComments: null,
                  loc: {
                    end: {
                      column: 25,
                      line: 3,
                    },
                    filename: undefined,
                    identifierName: 'B200',
                    start: {
                      column: 21,
                      line: 3,
                    },
                  },
                  name: 'B200',
                  range: undefined,
                  start: 105,
                  trailingComments: null,
                  type: 'Identifier',
                },
              ],
              ImportDeclarations: {
                '@atlaskit/theme/colors': ['B200', 'N0', 'N70A'],
              },
              Project: '@atlaskit/fabric',
            }),
          );
        },
      } as TestObject,
    ],
  });
  pluginTester({
    ...commonOpts,
    filename: __filename,
    tests: [
      {
        title: 'does not parse file if `ignoreDirs` matches filename',
        fixture: '../__fixtures__/__ignored__/ignored.js',
        pluginOptions: {
          targetImports: '@atlaskit/theme/colors',
          ignoreDirs: '(__ignored__)',
          customLogger,
        },
        teardown() {
          expect(customLogger).toBeCalledTimes(0);
        },
      } as TestObject,
    ],
  });
});

describe('Data collection', () => {
  beforeEach(() => {
    customLogger = customLogger.mockImplementation(logger);
  });

  afterEach(() => {
    customLogger.mockReset();
  });

  pluginTester({
    ...commonOpts,
    tests: [
      {
        title: 'calls custom logger with data for `targetImports` only',
        code: `import React from 'react';
import { B200, N0, N70A } from '@atlaskit/theme/colors';
export default {
  B200,
  N0,
  N70A
};`,
        pluginOptions: {
          targetImports: '@atlaskit/theme/colors',
          customLogger,
        },
        teardown() {
          expect(customLogger).toBeCalledWith(
            new Map().set('', {
              BaseProjectName: '@atlaskit/fabric',
              DependencyVersions: {},
              File: '',
              ImportDeclarations: {
                '@atlaskit/theme/colors': ['B200', 'N0', 'N70A'],
              },
              Project: '@atlaskit/fabric',
            }),
          );
        },
      } as TestObject,
      {
        title: 'calls custom logger with data for CallExpression type',
        code: `import React from 'react';
import { themeFunction } from '@atlaskit/theme';
export default (props) => themeFunction(props);`,
        pluginOptions: {
          targetImports: '@atlaskit/theme',
          customLogger,
        },
        teardown() {
          expect(customLogger).toBeCalledWith(
            new Map().set('', {
              BaseProjectName: '@atlaskit/fabric',
              DependencyVersions: {},
              File: '',
              ImportDeclarations: { '@atlaskit/theme': ['themeFunction'] },
              CallExpressions: [
                {
                  end: 115,
                  innerComments: null,
                  leadingComments: null,
                  loc: {
                    end: {
                      column: 39,
                      line: 3,
                    },
                    identifierName: 'themeFunction',
                    start: {
                      column: 26,
                      line: 3,
                    },
                  },
                  name: 'themeFunction',
                  start: 102,
                  trailingComments: null,
                  type: 'Identifier',
                },
              ],
              Project: '@atlaskit/fabric',
            }),
          );
        },
      } as TestObject,
      {
        title: 'calls custom logger with data for MemberExpression type',
        code: `import React from 'react';
import { colors } from '@atlaskit/theme';
export default () => colors.B200;`,
        pluginOptions: {
          targetImports: '@atlaskit/theme',
          customLogger,
        },
        teardown() {
          expect(customLogger).toBeCalledWith(
            new Map().set('', {
              BaseProjectName: '@atlaskit/fabric',
              DependencyVersions: {},
              File: '',
              ImportDeclarations: { '@atlaskit/theme': ['colors'] },
              MemberExpressions: [
                {
                  object: {
                    end: 96,
                    innerComments: null,
                    leadingComments: null,
                    loc: {
                      end: {
                        column: 27,
                        line: 3,
                      },
                      identifierName: 'colors',
                      start: {
                        column: 21,
                        line: 3,
                      },
                    },
                    name: 'colors',
                    start: 90,
                    trailingComments: null,
                    type: 'Identifier',
                  },
                  property: {
                    end: 101,
                    innerComments: undefined,
                    leadingComments: undefined,
                    loc: {
                      end: {
                        column: 32,
                        line: 3,
                      },
                      identifierName: 'B200',
                      start: {
                        column: 28,
                        line: 3,
                      },
                    },
                    name: 'B200',
                    start: 97,
                    trailingComments: undefined,
                    type: 'Identifier',
                  },
                },
              ],
              Project: '@atlaskit/fabric',
            }),
          );
        },
      } as TestObject,
      {
        title: 'calls custom logger with data for JSXElement type',
        code: `import React from 'react';
import Avatar from '@atlaskit/avatar';
export default () => <Avatar />;`,
        pluginOptions: {
          targetImports: '@atlaskit/avatar',
          customLogger,
        },
        teardown() {
          expect(customLogger).toBeCalledWith(
            new Map().set('', {
              BaseProjectName: '@atlaskit/fabric',
              DependencyVersions: {},
              File: '',
              ImportDeclarations: { '@atlaskit/avatar': ['Avatar'] },
              JSXElements: [
                {
                  attributes: [],
                  locationEnd: 97,
                  locationStart: 87,
                  nodePath: 'Avatar',
                  reference: 'Avatar',
                },
              ],
              Project: '@atlaskit/fabric',
            }),
          );
        },
      } as TestObject,
      {
        title:
          'calls custom logger with data for JSXElement type with attributes',
        code: `import React from 'react';
import Avatar from '@atlaskit/avatar';
export default () => <Avatar href="/path/to/item.html" />;`,
        pluginOptions: {
          targetImports: '@atlaskit/avatar',
          customLogger,
        },
        teardown() {
          expect(customLogger).toBeCalledWith(
            new Map().set('', {
              BaseProjectName: '@atlaskit/fabric',
              DependencyVersions: {},
              File: '',
              ImportDeclarations: { '@atlaskit/avatar': ['Avatar'] },
              JSXElements: [
                {
                  attributes: ['href="/path/to/item.html"'],
                  locationEnd: 123,
                  locationStart: 87,
                  nodePath: 'Avatar',
                  reference: 'Avatar',
                },
              ],
              Project: '@atlaskit/fabric',
            }),
          );
        },
      } as TestObject,
      {
        title: 'calls custom logger with data for nested JSXElement type',
        code: `import React from 'react';
import Avatar from '@atlaskit/avatar';
export default () => <div><Avatar /></div>;`,
        pluginOptions: {
          targetImports: '@atlaskit/avatar',
          customLogger,
        },
        teardown() {
          expect(customLogger).toBeCalledWith(
            new Map().set('', {
              BaseProjectName: '@atlaskit/fabric',
              DependencyVersions: {},
              File: '',
              ImportDeclarations: { '@atlaskit/avatar': ['Avatar'] },
              JSXElements: [
                {
                  attributes: [],
                  locationEnd: 102,
                  locationStart: 92,
                  nodePath: 'div -> Avatar',
                  reference: 'Avatar',
                },
              ],
              Project: '@atlaskit/fabric',
            }),
          );
        },
      } as TestObject,
    ],
  });
});

describe('Transforms', () => {
  const { babelOptions, ...transformOpts } = commonOpts;

  describe('trackOnClient', () => {
    pluginTester({
      ...transformOpts,
      tests: [
        {
          title:
            'injects data-cognize and data-cognize-tracer in every JSX opening element',
          code: `import React from 'react';
import Avatar from '@atlaskit/avatar';
const Link = () => <a href="/blah.html">Link</a>;
export default () => {
  return <div><Link /><Avatar /></div>;
}`,
          pluginOptions: {
            targetImports: '@atlaskit/avatar',
            customLogger: null,
            trackOnClient: true,
          },
        } as TestObject,
      ],
    });
  });
});

describe('Plugins', () => {
  const { babelOptions, ...transformOpts } = commonOpts;

  let testVar = false;

  let cognizeInstance: BabelPlugin;

  type CustomPlugin = BabelPlugin & {
    testCache: PluginCache;
  };

  const testPlugin = function (this: CustomPlugin) {
    this.testCache = new Map();
    cognizeInstance = this;
    return {
      // Spread visitor to keep all default Cognize visitors
      // ...cognize.visitor,
      // or choose what visitors to keep
      ImportDeclaration: this.visitor?.ImportDeclaration,
      Identifier: {
        enter: [
          function Identifier() {
            testVar = true;
          },
        ],
      },
    };
  };

  describe('calls custom plugin', () => {
    pluginTester({
      ...transformOpts,
      tests: [
        {
          title: 'calls plugin function',
          code: `import React from 'react';
import Avatar from '@atlaskit/avatar';
export default () => {
  return <div><Avatar /></div>;
}`,
          pluginOptions: {
            targetImports: '@atlaskit/avatar',
            customLogger: null,
            customVisitors: testPlugin,
          },
          teardown() {
            expect(testVar).toEqual(true);
            expect(cognizeInstance).toHaveProperty('testCache');
          },
        } as TestObject,
      ],
    });
  });
});
