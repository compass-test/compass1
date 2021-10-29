/** Extracted into its own file so the mock variables can be instantiated before other imports in the test file that would otherwise be hoisted before it */
import fs from 'fs';
import path from 'path';

const mockRedirects = fs.readFileSync(
  path.join(__dirname, '../../../../public/_redirects'),
  'utf8',
);
jest.mock('!!raw-loader!../../public/_redirects', () => mockRedirects, {
  virtual: true,
});
