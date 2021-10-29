import React from 'react';
import PackageIcon from '@atlaskit/icon/glyph/chevron-right';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import LinkIcon from '@atlaskit/icon/glyph/shortcut';
import styled from 'styled-components';
import { isSubNavExpanded } from '../utils/linkComponents';
import renderNav from '../utils/renderNav';
import { Directory, File, NavGroup, NavGroupItem } from '../../../types';
import * as fs from '../../../utils/fs';
import { getRedirectURL } from '../../../utils/redirects';
import { packageUrl, packageDocUrl } from '../../../utils/url';

const CenteredIcon = styled.span`
  align-items: center;
  display: flex;
  font-size: 12px;
  height: 16px;
  justify-content: center;
  line-height: 24px;
  width: 16px;
`;

export function buildSubNavGroup(
  children: Array<File>,
  groupTitle: string,
  url: (id: string) => string,
  // TODO: [strictFunctionTypes] Fix any
  Icon: React.ComponentType<any>,
): NavGroup | null {
  if (!children || !children.length) {
    return null;
  }
  return children
    .filter(item => !item.id.startsWith('_'))
    .reduce(
      (acc, item) => {
        acc.items.push({
          to: url(fs.normalize(item.id)),
          title: fs.titleize(item.id),
          isCompact: true,
          icon: <CenteredIcon>•</CenteredIcon>,
        });
        return acc;
      },
      { items: [] as Array<NavGroupItem> },
    );
}

const getItemDetails = (pkg: Directory, group: Directory, pathname: string) => {
  const redirectUrl = getRedirectURL(packageUrl(group.id, pkg.id));
  // Logic only present when in prod mode
  const isRedirect =
    redirectUrl?.includes('atlassian.design') &&
    process.env.NODE_ENV !== 'development';

  let navigationItemIcon = <CenteredIcon>•</CenteredIcon>;

  const docs = fs.maybeGetById(fs.getDirectories(pkg.children) || [], 'docs');
  if (!docs) {
    return null;
  }

  const docItems = fs
    .getFiles(
      docs && docs.children && docs.children.length ? docs.children : [],
    )
    .slice(1);

  const items: Array<NavGroup> = [];

  const docsSubnav = buildSubNavGroup(
    docItems,
    'Docs',
    packageDocUrl.bind(null, group.id, pkg.id),
    PackageIcon,
  );

  if (docsSubnav) {
    items.push(docsSubnav);
  }

  const isNavExpanded = isSubNavExpanded(
    packageUrl(group.id, pkg.id),
    pathname,
  );

  if (items.length) {
    navigationItemIcon = isNavExpanded ? (
      <ChevronDownIcon label="chevron" size="small" />
    ) : (
      <PackageIcon label="package" size="small" />
    );
  }

  let to = packageUrl(group.id, pkg.id);
  let external = false;

  if (isRedirect && !isNavExpanded) {
    navigationItemIcon = <LinkIcon label="external link" size="small" />;
    to = redirectUrl as string; // path not reached if redirectUrl is falsy
    external = true;
  }

  return {
    isCompact: true,
    icon: navigationItemIcon,
    to,
    external,
    title: fs.titleize(pkg.id),
    items,
  };
};

export const packagesList = {
  to: '/packages',
  title: 'Overview',
};

export type PackagesNavProps = {
  pathname: string;
  packages: Directory;
  onClick?: (e: Event) => void;
};

export const standardGroups = (
  dirs: Directory[],
  pathname: string,
): NavGroup[] =>
  dirs.reduce<NavGroup[]>((acc, group) => {
    const packages = fs.getDirectories(group.children);

    const items = packages.reduce<NavGroupItem[]>((acc, pkg) => {
      const details = getItemDetails(pkg, group, pathname);

      if (details) {
        return [...acc, details];
      }

      return acc;
    }, []);

    if (items.length) {
      return [
        ...acc,
        {
          title: group.id,
          items,
        },
      ];
    }

    return acc;
  }, []);

export default function PackagesNav(props: PackagesNavProps) {
  const { packages, pathname } = props;
  const dirs = fs.getDirectories(packages.children);
  return (
    <div>
      {renderNav(
        [{ items: [packagesList] }, ...standardGroups(dirs, pathname)],
        {
          pathname,
        },
      )}
    </div>
  );
}
