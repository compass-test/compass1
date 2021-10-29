import fs from 'fs';
import path from 'path';
// eslint-disable-next-line no-restricted-imports
import { kebabCase } from 'lodash';
import mkdirp from 'mkdirp';
import { ElementHandle } from 'puppeteer';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { createImageResizer } from './create-image-resizer';

interface VisualMatcherResult {
  pass: boolean;
  message: () => string;
}

export interface VisualMatchOptions {
  threshold: number;
}

export async function toMatchVisually(
  this: any,
  actualElement: ElementHandle,
  expectedElement: ElementHandle,
  options?: VisualMatchOptions,
): Promise<VisualMatcherResult> {
  if (actualElement === null) {
    return {
      pass: false,
      message: () => 'actual must be ElementHandle, received null',
    };
  }

  if (expectedElement === null) {
    return {
      pass: false,
      message: () => 'expected must be ElementHandle, received null',
    };
  }

  const [actual, expected] = await Promise.all([
    actualElement
      .screenshot()
      .then(b => PNG.sync.read(Buffer.from(b as Buffer))),
    expectedElement
      .screenshot()
      .then(b => PNG.sync.read(Buffer.from(b as Buffer))),
  ]);

  const { width: actualWidth, height: actualHeight } = actual;
  const { width: expectedWidth, height: expectedHeight } = expected;

  const maxWidth = Math.max(actualWidth, expectedWidth);
  const maxHeight = Math.max(actualHeight, expectedHeight);

  const resize = createImageResizer({
    width: maxWidth,
    height: maxHeight,
  });

  const actualImage = resize(actual);
  const expectedImage = resize(expected);

  const diff = new PNG({ width: maxWidth, height: maxHeight });

  const differing = pixelmatch(
    actualImage.data,
    expectedImage.data,
    diff.data,
    maxWidth,
    maxHeight,
    { threshold: 0 },
  );

  const baseName = kebabCase(
    `${path.relative(process.cwd(), this.testPath)}-${this.currentTestName}`,
  );

  const diffFile = `${baseName}.diff.png`;
  const expectedFile = `${baseName}.expected.png`;
  const actualFile = `${baseName}.actual.png`;

  const diffDirectory = path.join(
    path.dirname(this.testPath),
    '__image_snapshots__',
    '__diff_output__',
  );

  const fullDiffPath = path.join(diffDirectory, diffFile);

  const threshold = parseFloat((options ? options.threshold : 0).toFixed(2));
  const rawDifference = differing / ((expectedWidth * expectedHeight) / 100);
  const difference = parseFloat(rawDifference.toFixed(2));
  const pass = difference <= threshold;

  if (difference > 0) {
    const expectedBuffer = PNG.sync.write(expectedImage, { filterType: 4 });
    const actualBuffer = PNG.sync.write(actualImage, { filterType: 4 });
    const diffBuffer = PNG.sync.write(diff, { filterType: 4 });

    mkdirp.sync(diffDirectory);
    await Promise.all([
      fs.promises.writeFile(
        path.join(diffDirectory, expectedFile),
        expectedBuffer,
      ),
      fs.promises.writeFile(path.join(diffDirectory, actualFile), actualBuffer),
      fs.promises.writeFile(fullDiffPath, diffBuffer),
    ]);
  }

  return {
    pass,
    message: () =>
      [
        `Expected elements to be visually identical with error margin of ${threshold}%, difference was ${difference}%.`,
        !process.env.CI && difference > 0
          ? `Diff image at ${path.relative(process.cwd(), fullDiffPath)}`
          : null,
      ]
        .filter(line => line !== null)
        .join('\n'),
  };
}
