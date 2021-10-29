import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import { AFPackageJson } from '@atlaskit/build-utils/types';

import { createPackageFromTemplate } from '../lib/create-package';
import { templatePackagePath } from '../lib/constants';
import { PackageInformation } from '../lib/types';

const cwd = process.cwd();

const TEMPLATE_PATH = path.join(cwd, templatePackagePath);
const TMP_DIR = 'generate-package-test-tmp-dir';
const PUBLIC_DIR = 'public';
const RESTRICTED_DIR = 'restricted';
const PRIVATE_DIR = 'private';
const PUBLIC_PATH = path.join(cwd, TMP_DIR, PUBLIC_DIR);
const RESTRICTED_PATH = path.join(cwd, TMP_DIR, RESTRICTED_DIR);
const PRIVATE_PATH = path.join(cwd, TMP_DIR, PRIVATE_DIR);

const defaultConfig = {
  componentName: 'TestComponent',
  description: 'Test description',
  team: 'AFP: Monorepo',
  teamDir: TMP_DIR,
  testID: 'test-id',
};

const publicConfig: PackageInformation = {
  ...defaultConfig,
  packageName: '@atlaskit/test-component',
  packageDir: PUBLIC_DIR,
  type: 'public',
};

const restrictedConfig: PackageInformation = {
  ...defaultConfig,
  packageName: '@atlassian/test-component',
  packageDir: RESTRICTED_DIR,
  type: 'restricted',
};

const privateConfig: PackageInformation = {
  ...defaultConfig,
  packageName: '@af/test-component',
  packageDir: PRIVATE_DIR,
  type: 'private',
};

let publicPkgJson: AFPackageJson;
let restrictedPkgJson: AFPackageJson;
let privatePkgJson: AFPackageJson;

describe('generate:package script', () => {
  beforeAll(async () => {
    // Generate a public, restricted and private package
    await Promise.all([
      createPackageFromTemplate(TEMPLATE_PATH, PUBLIC_PATH, publicConfig),
      createPackageFromTemplate(
        TEMPLATE_PATH,
        RESTRICTED_PATH,
        restrictedConfig,
      ),
      createPackageFromTemplate(TEMPLATE_PATH, PRIVATE_PATH, privateConfig),
    ]);

    // Read the generated package.jsons for later
    publicPkgJson = JSON.parse(
      fs.readFileSync(`${PUBLIC_PATH}/package.json`) as any,
    );
    restrictedPkgJson = JSON.parse(
      fs.readFileSync(`${RESTRICTED_PATH}/package.json`) as any,
    );
    privatePkgJson = JSON.parse(
      fs.readFileSync(`${PRIVATE_PATH}/package.json`) as any,
    );
  });

  afterAll(() => {
    // Remove generated packages
    rimraf(path.join(cwd, TMP_DIR), () => {});
  });

  describe('generating a public package', () => {
    it('should have tests', () => {
      // Integration tests
      expect(
        fs.existsSync(`${PUBLIC_PATH}/__tests__/integration/index.ts`),
      ).toBeTruthy();
      // SSR test
      expect(
        fs.existsSync(`${PUBLIC_PATH}/__tests__/unit/ssr.tsx`),
      ).toBeTruthy();
      // VR tests
      expect(
        fs.existsSync(`${PUBLIC_PATH}/__tests__/visual-regression/index.ts`),
      ).toBeTruthy();
      // Component unit tests
      expect(
        fs.existsSync(`${PUBLIC_PATH}/src/ui/${PUBLIC_DIR}/test.tsx`),
      ).toBeTruthy();
    });
    it('should have docs', () => {
      expect(fs.existsSync(`${PUBLIC_PATH}/docs/0-intro.tsx`)).toBeTruthy();
    });
    it('should have examples', () => {
      expect(
        fs.existsSync(`${PUBLIC_PATH}/examples/00-basic.tsx`),
      ).toBeTruthy();
    });
    it('should have src', () => {
      expect(fs.existsSync(`${PUBLIC_PATH}/src/index.ts`)).toBeTruthy();
      expect(
        fs.existsSync(`${PUBLIC_PATH}/src/ui/${PUBLIC_DIR}/index.tsx`),
      ).toBeTruthy();
    });
    it('should have an .npmignore', () => {
      expect(fs.existsSync(`${PUBLIC_PATH}/.npmignore`)).toBeTruthy();
    });
    it('should have a license', () => {
      expect(fs.existsSync(`${PUBLIC_PATH}/LICENSE.md`)).toBeTruthy();
    });
    it('should have a package.json with the correct fields', () => {
      expect(fs.existsSync(`${PUBLIC_PATH}/package.json`)).toBeTruthy();

      expect(publicPkgJson).toMatchObject({
        name: publicConfig.packageName,
        description: publicConfig.description,
        version: '0.0.0',
        author: 'Atlassian Pty Ltd',
        license: 'Apache-2.0',
        publishConfig: {
          registry: 'https://registry.npmjs.org/',
        },
        atlassian: {
          team: defaultConfig.team,
          inPublicMirror: false,
          releaseModel: 'continuous',
          website: { name: defaultConfig.componentName },
        },
      });
      expect(publicPkgJson).not.toHaveProperty('private');
    });
    it('should have a readme', () => {
      expect(fs.existsSync(`${PUBLIC_PATH}/README.md`)).toBeTruthy();
    });
    it('should have a tsconfig', () => {
      expect(fs.existsSync(`${PUBLIC_PATH}/tsconfig.json`)).toBeTruthy();
    });
  });

  describe('generating a restricted package', () => {
    it('should have tests', () => {
      // Integration tests
      expect(
        fs.existsSync(`${RESTRICTED_PATH}/__tests__/integration/index.ts`),
      ).toBeTruthy();
      // SSR test
      expect(
        fs.existsSync(`${RESTRICTED_PATH}/__tests__/unit/ssr.tsx`),
      ).toBeTruthy();
      // VR tests
      expect(
        fs.existsSync(
          `${RESTRICTED_PATH}/__tests__/visual-regression/index.ts`,
        ),
      ).toBeTruthy();
      // Component unit tests
      expect(
        fs.existsSync(`${RESTRICTED_PATH}/src/ui/${RESTRICTED_DIR}/test.tsx`),
      ).toBeTruthy();
    });
    it('should NOT have docs', () => {
      expect(fs.existsSync(`${RESTRICTED_PATH}/docs`)).not.toBeTruthy();
    });
    it('should have examples', () => {
      expect(
        fs.existsSync(`${RESTRICTED_PATH}/examples/00-basic.tsx`),
      ).toBeTruthy();
    });
    it('should have src', () => {
      expect(fs.existsSync(`${RESTRICTED_PATH}/src/index.ts`)).toBeTruthy();
      expect(
        fs.existsSync(`${RESTRICTED_PATH}/src/ui/${RESTRICTED_DIR}/index.tsx`),
      ).toBeTruthy();
    });
    it('should have an .npmignore', () => {
      expect(fs.existsSync(`${RESTRICTED_PATH}/.npmignore`)).toBeTruthy();
    });
    it('should NOT have a license', () => {
      expect(fs.existsSync(`${RESTRICTED_PATH}/LICENSE.md`)).not.toBeTruthy();
    });
    it('should have a package.json with the correct fields', () => {
      expect(fs.existsSync(`${RESTRICTED_PATH}/package.json`)).toBeTruthy();

      expect(restrictedPkgJson).toMatchObject({
        name: restrictedConfig.packageName,
        description: restrictedConfig.description,
        version: '0.0.0',
        author: 'Atlassian Pty Ltd',
        publishConfig: {
          registry: 'https://packages.atlassian.com/api/npm/npm-remote',
        },
        atlassian: {
          team: defaultConfig.team,
          inPublicMirror: false,
          releaseModel: 'continuous',
        },
      });
      expect(restrictedPkgJson).not.toHaveProperty('private');
      expect(restrictedPkgJson).not.toHaveProperty('license');
      expect(restrictedPkgJson).not.toHaveProperty('atlassian.website');
    });
    it('should have a readme', () => {
      expect(fs.existsSync(`${RESTRICTED_PATH}/README.md`)).toBeTruthy();
    });
    it('should have a tsconfig', () => {
      expect(fs.existsSync(`${RESTRICTED_PATH}/tsconfig.json`)).toBeTruthy();
    });
  });

  describe('generating a private package', () => {
    it('should have tests', () => {
      // Integration tests
      expect(
        fs.existsSync(`${PRIVATE_PATH}/__tests__/integration/index.ts`),
      ).toBeTruthy();
      // SSR test
      expect(
        fs.existsSync(`${PRIVATE_PATH}/__tests__/unit/ssr.tsx`),
      ).toBeTruthy();
      // VR tests
      expect(
        fs.existsSync(`${PRIVATE_PATH}/__tests__/visual-regression/index.ts`),
      ).toBeTruthy();
      // Component unit tests
      expect(
        fs.existsSync(`${PRIVATE_PATH}/src/ui/${PRIVATE_DIR}/test.tsx`),
      ).toBeTruthy();
    });
    it('should NOT have docs', () => {
      expect(fs.existsSync(`${PRIVATE_PATH}/docs`)).not.toBeTruthy();
    });
    it('should have examples', () => {
      expect(
        fs.existsSync(`${PRIVATE_PATH}/examples/00-basic.tsx`),
      ).toBeTruthy();
    });
    it('should have src', () => {
      expect(fs.existsSync(`${PRIVATE_PATH}/src/index.ts`)).toBeTruthy();
      expect(
        fs.existsSync(`${PRIVATE_PATH}/src/ui/${PRIVATE_DIR}/index.tsx`),
      ).toBeTruthy();
    });
    it('should NOT have an .npmignore', () => {
      expect(fs.existsSync(`${PRIVATE_PATH}/.npmignore`)).not.toBeTruthy();
    });
    it('should NOT have a license', () => {
      expect(fs.existsSync(`${PRIVATE_PATH}/LICENSE.md`)).not.toBeTruthy();
    });
    it('should have a package.json with the correct fields', () => {
      expect(fs.existsSync(`${PRIVATE_PATH}/package.json`)).toBeTruthy();

      expect(privatePkgJson).toMatchObject({
        name: privateConfig.packageName,
        description: privateConfig.description,
        version: '0.0.0',
        private: true,
        atlassian: {
          team: defaultConfig.team,
          inPublicMirror: false,
          releaseModel: 'continuous',
        },
      });
      expect(privatePkgJson).not.toHaveProperty('author');
      expect(privatePkgJson).not.toHaveProperty('license');
      expect(privatePkgJson).not.toHaveProperty('publishConfig');
    });
    it('should have a readme', () => {
      expect(fs.existsSync(`${PRIVATE_PATH}/README.md`)).toBeTruthy();
    });
    it('should have a tsconfig', () => {
      expect(fs.existsSync(`${PRIVATE_PATH}/tsconfig.json`)).toBeTruthy();
    });
  });
});
