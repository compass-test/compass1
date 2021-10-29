import React, { Fragment } from 'react';
import { useLocation } from '@reach/router';

import NavItem, { NavItemProps } from './side-nav/nav-item';
import NavSection from './side-nav/nav-section';
import { HeadingItem } from './side-nav/heading-item';

function escapeSlashes(string: string) {
  // prettier-ignore
  return string.replace(/\//g, '\\/');
}

const SideNav = ({
  heading,
  navItems,
  isLoggedIn,
}: {
  heading: string;
  navItems: NavItemProps[];
  isLoggedIn: boolean;
}) => {
  const { pathname } = useLocation();
  const subItems = navItems.filter((item) => {
    return item.parent;
  });

  const items = navItems.filter((item) => {
    return !item.parent;
  });

  const getSubItems = (navItem: NavItemProps) => {
    return subItems.filter(({ parent }) => {
      return parent === navItem.slug;
    });
  };
  return (
    // locked if
    // user is not logged in and the route is private

    <NavSection>
      <HeadingItem>{heading}</HeadingItem>
      {items.map((navItem) => {
        return (
          <Fragment key={navItem.to}>
            <NavItem
              key={navItem.to}
              isSelected={
                navItem.to === pathname || navItem.to === `${pathname}/`
              }
              text={navItem.text}
              to={navItem.to}
              isLocked={!isLoggedIn && navItem.isPrivate}
            />

            {getSubItems(navItem) && (
              <NavSection
                key={navItem.slug}
                isOpen={!!pathname.match(`${escapeSlashes(navItem.to)}`)}
              >
                {getSubItems(navItem).map((subItem) => (
                  <NavItem
                    isSubItem={true}
                    key={subItem.slug}
                    isSelected={
                      subItem.to === pathname || subItem.to === `${pathname}/`
                    }
                    text={subItem.text}
                    to={`${subItem.to}`}
                    isLocked={!isLoggedIn && subItem.isPrivate}
                  />
                ))}
              </NavSection>
            )}
          </Fragment>
        );
      })}
    </NavSection>
  );
};

export default SideNav;
