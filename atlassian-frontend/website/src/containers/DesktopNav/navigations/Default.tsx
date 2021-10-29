/* global PUBLIC_PATH */
import React from 'react';
import HomeIcon from '@atlaskit/icon/glyph/home';
import LockIcon from '@atlaskit/icon/glyph/lock';
import ComponentIcon from '@atlaskit/icon/glyph/component';
import OverviewIcon from '@atlaskit/icon/glyph/overview';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { BitbucketIcon } from '@atlaskit/logo/bitbucket-icon';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import renderNav from '../utils/renderNav';

const publicPath =
  PUBLIC_PATH !== '/' ? `${PUBLIC_PATH}index.html#/` : PUBLIC_PATH;

const defaultNavGroups = [
  {
    items: [
      {
        to: '/',
        title: 'Homepage',
        icon: <HomeIcon label="Homepage" />,
      },
    ],
  },
  {
    title: 'Atlaskit',
    items: [
      {
        to: `${publicPath}get-started`,
        title: 'Get started',
        icon: <OverviewIcon label="Get started" />,
        external: true,
      },
      {
        to: '/packages',
        title: 'Packages',
        icon: <ComponentIcon label="Packages" />,
      },
      {
        to: '/deprecations',
        title: 'Deprecations',
        icon: <WarningIcon label="Deprecations" />,
      },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        to:
          'https://developer.atlassian.com/cloud/framework/atlassian-frontend',
        title: 'Atlassian Frontend docs (Atlassians-only)',
        icon: <LockIcon label="Atlassian Frontend docs (Atlassians-only)" />,
        external: true,
      },
      {
        to: 'https://bitbucket.org/atlassian/atlassian-frontend',
        title: 'Repository (Atlassians-only)',
        icon: (
          <BitbucketIcon label="Repository (Atlassians-only)" size="small" />
        ),
        external: true,
      },
      {
        to: 'https://bitbucket.org/atlassian/design-system-mirror',
        title: 'Repository (Public)',
        icon: <BitbucketIcon label="Repository (Public)" size="small" />,
        external: true,
      },
      {
        to: 'https://atlassian.design/',
        title: 'Atlassian Design System',
        icon: <DashboardIcon label="Atlassian Design System" />,
        external: true,
      },
    ],
  },
];

export type DefaultNavProps = {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  pathname: string;
};

export default function DefaultNav({ pathname, onClick }: DefaultNavProps) {
  return (
    <div id="test">{renderNav(defaultNavGroups, { pathname, onClick })}</div>
  );
}
