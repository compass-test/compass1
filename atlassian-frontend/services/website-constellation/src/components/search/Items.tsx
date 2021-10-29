// TODO: to fix those import.
/* eslint-disable import/no-unresolved */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'gatsby';

import { CustomItem } from '@atlaskit/menu';
import Icon from '@atlaskit/icon';
import { B100, N800, N10, N20 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import HeadingIcon from '../../components/HeadingIcon';

export const HeadingItem = ({ children, indexName }) => {
  return (
    <CustomItem
      component={({ children }) => (
        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            padding: '12px 24px',
            whiteSpace: 'normal',
            backgroundColor: N10,
            fontSize: '12px',
            color: N800,
            lineHeight: `${gridSize() * 2}px`,
            textTransform: 'uppercase',
            fontFamily: 'Charlie Display',
          }}
        >
          <HeadingIcon heading={indexName} />
          {children}
        </div>
      )}
    >
      {children}
    </CustomItem>
  );
};

export const LinkItem = ({ to, children, ...props }) => (
  <CustomItem
    {...props}
    component={({ wrapperClass, ...rest }) => (
      <Link
        css={{
          padding: '12px 24px',
          color: 'inherit',
          outline: 'none',
          tabIndex: 0,
          textDecoration: 'none',
          '& p': {
            lineHeight: `${gridSize() * 3}px`,
          },
          '&:hover': {
            color: 'inherit',
            textDecoration: 'none',
            backgroundColor: N20,
            outline: 'none',
          },
          '&:focus': {
            color: 'inherit',
            boxShadow: `0px 0px 0px ${gridSize() / 4}px inset ${B100};`,
            textDecoration: 'none',
            outline: 'none',
          },
          '&: active': {
            textDecoration: 'none',
            outline: 'none',
            backgroundColor: N20,
          },
          em: {
            fontWeight: 'bold',
            fontStyle: 'inherit',
          },
        }}
        to={to}
        {...rest}
      />
    )}
  >
    {children}
  </CustomItem>
);
