import type { Package as BoltPackage } from 'bolt';

const createPackage = (
  name: string,
  dir: string,
  config: any,
): BoltPackage => ({
  name,
  dir: `/atlassian-frontend${dir}`,
  config: {
    name,
    ...config,
  },
});

export const mockedDSTPackages: BoltPackage[] = [
  createPackage('@atlaskit/avatar', '/packages/design-system/avatar', {
    atlassian: { team: 'Design System Team' },
  }),
  createPackage('@atlaskit/css-reset', '/packages/css-packs/css-reset', {
    atlassian: { team: 'Design System Team' },
  }),
  createPackage('@atlassian/ds-dashboard', '/services/ds-dashboard', {
    private: true,
    atlassian: { team: 'Design System Team' },
  }),
  createPackage('@atlaskit/layer', '/packages/design-system/layer', {
    atlassian: { team: 'Design System Team', website: { deprecated: '' } },
  }),
];

export const mockedPackages: BoltPackage[] = mockedDSTPackages.concat([
  createPackage('@atlaskit/date', '/packages/elements/date', {
    atlassian: { team: 'Editor' },
  }),
]);

jest.mock('bolt', () => {
  return {
    getWorkspaces: (options: unknown) => {
      if (options !== undefined) {
        /**
         * Our mocked function doesn't handle options.
         * If we don't error tests might pass when they shouldn't.
         *
         * If we start needing to test this with options, we can
         * implement mocked behavior for the options we use.
         */
        throw new Error('Unhandled options');
      }
      return mockedPackages;
    },
  };
});
