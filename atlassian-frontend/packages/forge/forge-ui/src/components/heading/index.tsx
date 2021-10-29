import React, { ReactNode } from 'react';
import { Props } from '..';
import { HeadingProps } from '@atlassian/forge-ui-types';

export function Heading({
  size = 'medium',
  children,
}: Omit<HeadingProps, 'children'> & { children: ReactNode | ReactNode[] }) {
  if (size === 'large') {
    return <h1>{children}</h1>;
  }
  if (size === 'small') {
    return <h5>{children}</h5>;
  }
  // size === 'medium'
  return <h3>{children}</h3>;
}

export default Heading;

export function HeadingFn({
  Components,
  props,
  children,
  renderChildren,
  dispatch,
  render,
}: Props) {
  const { size } = props as HeadingProps;
  return (
    <Heading size={size}>
      {renderChildren({ Components, children, render, dispatch })}
    </Heading>
  );
}
