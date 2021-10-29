import React, { ReactNode } from 'react';

import { P300, T300, N0 } from '@atlaskit/theme/colors';
import { borderRadius } from '@atlaskit/theme/constants';

import FolderFilledIcon from '@atlaskit/icon/glyph/folder-filled';
import PremiumIcon from '@atlaskit/icon/glyph/premium';

import { css } from '@emotion/core';

import {
  Header,
  NavigationHeader,
  NavigationContent,
  SideNavigation,
  Section,
  LinkItem,
  LinkItemProps,
} from '@atlaskit/side-navigation';

import OverviewIcon from '@atlaskit/icon/glyph/overview';

import { useRouter } from 'next/router';
import Link from 'next/link';

export type SideNavLinkProps = {
  href: string;
  children: string;
};

const SideNavLink: React.FC<LinkItemProps & SideNavLinkProps> = ({
  children,
  href,
  ...rest
}) => {
  const router = useRouter();
  const isSelected = React.useMemo(
    () => router.asPath.replace(/\/$/, '').endsWith(href),
    [router, href],
  );
  return (
    <Link href={href} passHref>
      <LinkItem isSelected={isSelected} {...rest}>
        {children}
      </LinkItem>
    </Link>
  );
};

export default SideNavLink;

export type SideNavIcon = 'packages' | 'insights' | 'overview' | null;

export type SideNavData = {
  header: {
    title: string;
    icon?: SideNavIcon;
  };
  sections: {
    title?: string;
    linkData: { href: string; label: string; icon?: SideNavIcon }[];
  }[];
};

const baseIconStyles = css({
  borderRadius: borderRadius(),
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  height: '100%',
  color: N0,
});

const packagesIconStyles = css([baseIconStyles, { backgroundColor: T300 }]);
const insightsIconStyles = css([baseIconStyles, { backgroundColor: P300 }]);

const PackagesIcon = () => (
  <div css={packagesIconStyles}>
    <FolderFilledIcon size="small" label="" />
  </div>
);

const InsightsIcon = () => (
  <div css={insightsIconStyles}>
    <PremiumIcon size="small" label="" />
  </div>
);

const renderIcon = (icon?: SideNavIcon): ReactNode => {
  switch (icon) {
    case 'insights':
      return <InsightsIcon />;

    case 'packages':
      return <PackagesIcon />;

    case 'overview':
      return <OverviewIcon label="" />;

    default:
      return null;
  }
};

export const renderSideNavData = (data: SideNavData): ReactNode => {
  return (
    <SideNavigation label="Project navigation" testId="side-navigation">
      <NavigationHeader>
        <Header iconBefore={renderIcon(data.header.icon)}>
          {data.header.title}
        </Header>
      </NavigationHeader>
      <NavigationContent>
        {data.sections.map((section, i) => (
          <Section title={section.title} key={i}>
            {section.linkData.map((link) => (
              <SideNavLink
                href={link.href}
                key={link.href}
                iconBefore={renderIcon(link.icon)}
              >
                {link.label}
              </SideNavLink>
            ))}
          </Section>
        ))}
      </NavigationContent>
    </SideNavigation>
  );
};
