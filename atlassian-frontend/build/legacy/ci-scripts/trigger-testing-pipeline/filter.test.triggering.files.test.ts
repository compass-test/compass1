import cases from 'jest-in-case';

import { filterTests, TestType } from './index';

type Opts = {
  filePaths: string[];
  type: TestType;
  expectedFilePaths: string[];
};

const nonTestFile = ['packages/editor/editor-core/src/plugin/plugin.ts'];
const editorWd = [
  'packages/editor/editor-core/src/__tests__/integration/alignment/alignment.ts',
];
const mediaWd = [
  'packages/media/media-card/src/__tests__/integration/media-card.ts',
];
const designSystemWd = [
  'packages/design-system/badge/src/__tests__/integration/badge.test.tsx',
];

const transformWdToVr = (filePaths: string[]) =>
  filePaths.map(filePath =>
    filePath.replace('integration', 'visual-regression'),
  );

cases(
  'Testing pipeline filtering',
  (opts: Opts) => {
    expect(filterTests(opts.filePaths, opts.type)).toStrictEqual(
      opts.expectedFilePaths,
    );
  },
  [
    {
      name:
        'flakey webdriver: should be triggered only when an editor file changed',
      filePaths: editorWd,
      type: 'webdriver',
      expectedFilePaths: editorWd,
    },
    {
      name:
        'flakey webdriver: should be triggered only when media file changed',
      filePaths: mediaWd,
      type: 'webdriver',
      expectedFilePaths: mediaWd,
    },
    {
      name:
        'flakey webdriver: should be triggered only when editor & media file changed',
      filePaths: [...editorWd, ...mediaWd],
      type: 'webdriver',
      expectedFilePaths: [...editorWd, ...mediaWd],
    },
    {
      name:
        'flakey webdriver: should not be triggered if a non test file has been changed',
      filePaths: nonTestFile,
      type: 'webdriver',
      expectedFilePaths: [],
    },
    {
      name:
        'flakey webdriver: should not be triggered if a design system test file has been changed',
      filePaths: designSystemWd,
      type: 'webdriver',
      expectedFilePaths: [],
    },
    {
      name:
        'flakey visual regression: should not be triggered if a non test file has been changed',
      filePaths: nonTestFile,
      type: 'visual-regression',
      expectedFilePaths: [],
    },
    {
      name:
        'flakey visual regression: should be triggered if any visual regression test file has been changed',
      filePaths: [
        ...transformWdToVr(editorWd),
        ...transformWdToVr(designSystemWd),
      ],
      type: 'visual-regression',
      expectedFilePaths: [
        ...transformWdToVr(editorWd),
        ...transformWdToVr(designSystemWd),
      ],
    },
  ],
);
