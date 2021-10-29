import React from 'react';
import { PrimaryButton } from '@atlaskit/atlassian-navigation';

import Link from 'next/link';
import { useRouter } from 'next/router';

export type AppNavLinkProps = {
  href: string;
};

const AppNavLink: React.FC<AppNavLinkProps> = ({ children, href }) => {
  const router = useRouter();
  const isHighlighted = new RegExp(`^${href}/?`).test(router.asPath);
  return (
    <Link href={href} passHref>
      <PrimaryButton isHighlighted={isHighlighted}>{children}</PrimaryButton>
    </Link>
  );
};

export default AppNavLink;
