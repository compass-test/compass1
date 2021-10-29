/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, useState } from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import {
  AtlassianNavigation,
  generateTheme,
  PrimaryButton,
  Profile,
  useOverflowStatus,
} from '@atlaskit/atlassian-navigation';
import { MenuGroup, Section, ButtonItem, LinkItem } from '@atlaskit/menu';
import Popup from '@atlaskit/popup';
import { useProfile, useLogout } from '../hooks';
import { N900, B200 } from '@atlaskit/theme/colors';
import Avatar from '@atlaskit/avatar';
import Search from './search';
import Logo from './logo';

const theme = generateTheme({
  name: 'dark',
  backgroundColor: N900,
  highlightColor: B200,
});

const UserProfile = () => {
  // currently there's a flash everytime the nav re-renders
  // we can fix this by caching the result of this auth call
  const [isOpen, setIsOpen] = useState(false);
  const profile = useProfile();
  const { logout } = useLogout();
  const onClose = () => setIsOpen(false);
  const onClick = () => setIsOpen(!isOpen);

  if (profile && profile.photos) {
    return (
      <Popup
        placement="bottom-start"
        content={() => (
          <MenuGroup>
            <Section>
              <ButtonItem onClick={() => logout()}>Logout</ButtonItem>
            </Section>
          </MenuGroup>
        )}
        onClose={onClose}
        isOpen={isOpen}
        trigger={(triggerProps) => (
          <Profile
            icon={
              <Avatar
                src={profile.photos[0].value}
                name={profile.displayName}
              />
            }
            onClick={onClick}
            isSelected={isOpen}
            {...triggerProps}
          />
        )}
      />
    );
  } else {
    return null;
  }
};

const NavItem = ({ href, pathname, ...rest }) => {
  const { isVisible } = useOverflowStatus();
  return isVisible ? (
    <PrimaryButton
      /*
        We are using `startsWith so that sub-pages in each section also cause the correct location to be highlighted
      */
      {...rest}
      isHighlighted={pathname.startsWith(href)}
      component={Link}
      to={href}
    />
  ) : (
    <LinkItem href={href} isSelected={pathname.startsWith(href)}>
      {rest.children}
    </LinkItem>
  );
};

const TopNav = () => {
  return (
    <Fragment>
      {/* BC: location is undefined in SSR calls, so we are defaulting it to an empty object */}
      <Location>
        {({ location = {} }) => (
          <AtlassianNavigation
            label="site navigation"
            theme={theme}
            renderProductHome={() => (
              <Link to="/">
                <Logo />
              </Link>
            )}
            renderSearch={Search}
            // TODO: BC - this doesn't do anything yet, but can't really until we implement auth. This is on me to be real when I implement auth
            renderProfile={UserProfile}
            primaryItems={[
              <NavItem pathname={location.pathname} href="/brand">
                Brand
              </NavItem>,
              <NavItem pathname={location.pathname} href="/foundations">
                Foundations
              </NavItem>,
              <NavItem pathname={location.pathname} href="/content">
                Content
              </NavItem>,
              <NavItem pathname={location.pathname} href="/components">
                Components
              </NavItem>,
              <NavItem pathname={location.pathname} href="/patterns">
                Patterns
              </NavItem>,
              <NavItem pathname={location.pathname} href="/resources">
                Resources
              </NavItem>,
            ]}
          />
        )}
      </Location>
    </Fragment>
  );
};

export default TopNav;
