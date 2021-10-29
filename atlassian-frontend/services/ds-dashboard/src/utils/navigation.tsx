import sortBy from 'lodash/sortBy';

import { getDisplayName, getUnscopedName } from './package';
import { getInsights } from './insights';
import type { PackageJSON } from '../types/package';

import type { SideNavData } from '../components/side-nav-link';

export const getPackagesSideNavData = (
  packages: PackageJSON[],
): SideNavData => ({
  header: {
    title: 'Packages',
    icon: 'packages',
  },
  sections: [
    {
      linkData: [{ href: '/packages', label: 'Overview', icon: 'overview' }],
    },
    {
      title: 'Focused pages',
      linkData: sortBy(packages, getDisplayName).map((pkg) => ({
        href: `/packages/${getUnscopedName(pkg)}`,
        label: getDisplayName(pkg),
      })),
    },
  ],
});

export const getInsightsSideNavData = (): Promise<SideNavData> =>
  getInsights().then((insights) => ({
    header: {
      title: 'Insights',
      icon: 'insights',
    },
    sections: [
      {
        linkData: [{ href: '/insights', label: 'Overview', icon: 'overview' }],
      },
      {
        title: 'Focused pages',
        linkData: insights.map((insight) => ({
          href: `/insights/${insight}`,
          label: insight,
        })),
      },
    ],
  }));
