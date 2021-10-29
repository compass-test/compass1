/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { colors } from '@atlaskit/theme';
// @ts-ignore - issue in monorepo with internal module resolution https://product-fabric.atlassian.net/browse/AFP-1822
import { CustomItem } from '@atlaskit/menu';
import LockIcon from '@atlaskit/icon/glyph/lock';
import { N600, N30, N20, B200 } from '@atlaskit/theme/colors';

import { Link } from 'gatsby';

export interface NavItemProps {
  text: string;
  slug?: string;
  type?: 'heading';
  href?: string;
  to: string;
  isSelected?: boolean;
  isLocked?: boolean;
  isPrivate?: boolean;
  isSubItem?: boolean;
  isPartiallyActive?: () => {};
  parent?: string | undefined | null;
}

const navLinkCss = css`
  height: 32px;
  color: ${N600} !important;
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  &:hover {
    background-color: ${N20};
  }
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 4px;
    left: 0;
    top: 0;
    background-color: ${B200};
  }
  &:first-child:not(style) {
    margin-top: 0 !important;
  }
  &:last-child:not(style) {
    margin-bottom: 0 !important;
  }
`;

const NavItem = ({
  text,
  href,
  to,
  isSelected = false,
  isSubItem,
  isLocked = false,
  isPartiallyActive,
}: NavItemProps) => {
  return (
    <CustomItem
      isSelected={isSelected}
      component={({
        wrapperClass,
        children,
        ...rest
      }: {
        wrapperClass: string;
        children: React.ReactNode;
      }) => {
        return (
          <Link
            getProps={isPartiallyActive}
            className={wrapperClass}
            to={href || to}
            css={css`
              ${navLinkCss}
              padding-left: ${isSubItem ? '48px' : '32px'} !important;
              background-color: ${isSelected ? N30 + ' !important' : 'none'};
              width: 100%;
              &:after {
                ${isSelected ? 'opacity: 1' : 'opacity: 0'}
              }
            `}
            {...rest}
          >
            {children}
            {isLocked && (
              <LockIcon label="private-icon" primaryColor={colors.N90} />
            )}
          </Link>
        );
      }}
    >
      {text}
    </CustomItem>
  );
};

export default NavItem;
