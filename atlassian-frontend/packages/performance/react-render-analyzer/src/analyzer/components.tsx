import React, { FC } from 'react';

export const Component: FC = ({ children }) => (
  <span
    style={{
      color: 'var(--dom-tag-name-color, #9980ff)',
    }}
  >
    {'<'}
    {children}
    {'/>'}
  </span>
);

export const Emoji: FC = ({ children }) => (
  <span
    style={{
      fontFamily:
        '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    }}
  >
    {children}
  </span>
);

export const Title: FC<{
  displayName: string;
  styledComponent?: boolean;
  errors?: number;
  warnings?: number;
}> = ({ displayName, styledComponent, errors, warnings }) => (
  <span style={{ fontWeight: 'normal' }}>
    <Component>{displayName}</Component>
    {errors ? (
      <>
        {' '}
        <Emoji>⛔️</Emoji>
        {errors}
      </>
    ) : null}
    {warnings ? (
      <>
        {' '}
        <Emoji>⚠️</Emoji>
        {warnings}
      </>
    ) : null}
  </span>
);
