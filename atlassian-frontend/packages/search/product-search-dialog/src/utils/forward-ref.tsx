/**
 * Thin helper method to simplify forward ref
 */
import React from 'react';

export const withForwardRef = <
  T extends HTMLElement,
  P extends { forwardRef: React.Ref<T> }
>(
  Component: React.ComponentType<P>,
) => {
  return React.forwardRef<T, P>((props, ref) => (
    <Component {...props} forwardRef={ref} />
  )) as React.ForwardRefExoticComponent<
    Omit<P, 'forwardRef'> & React.RefAttributes<T>
  >;
};
