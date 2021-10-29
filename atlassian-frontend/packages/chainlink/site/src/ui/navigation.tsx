import React, { ReactNode } from 'react';

import { Link, useRouter } from '@atlaskit/router';

const NavLink = ({
  name,
  to,
  children,
}: {
  name: string;
  to: string;
  children: ReactNode;
}) => {
  const [{ route }] = useRouter();
  const isActive = name === route.name;

  return (
    // @ts-ignore Seems like we can't pass className to Link?
    <Link to={to} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  );
};

export const Navigation = () => (
  <ul>
    <li>
      <NavLink name="HOME" to={'/'}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink name="ABOUT" to={'/about'}>
        About
      </NavLink>
    </li>
    <li>
      <NavLink name="CONTACT" to={'/contact'}>
        Contact
      </NavLink>
    </li>
  </ul>
);
