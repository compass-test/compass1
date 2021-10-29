import React from 'react';

import { N0, N70 } from '@atlaskit/theme/colors';

import { IconProps } from '../../types';

export const sizes = {
  small: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
};

export const EqualIcon: React.ComponentType<IconProps> = ({
  label = 'percentage diff equal',
  size = 'medium',
  primaryColor = N70,
  secondaryColor = N0,
}: IconProps) => (
  <svg
    width={sizes[size]}
    height={sizes[size]}
    viewBox="0 0 24 24"
    fill="none"
    aria-label={label}
  >
    <circle fill={primaryColor} fillRule="nonzero" cx="12" cy="12" r="10" />
    <path
      d="M6.75 9L17.25 9C17.4489 9 17.6397 9.07902 17.7803 9.21967C17.921 9.36032 18 9.55109 18 9.75C18 9.94891 17.921 10.1397 17.7803 10.2803C17.6397 10.421 17.4489 10.5 17.25 10.5L6.75 10.5C6.55109 10.5 6.36032 10.421 6.21967 10.2803C6.07902 10.1397 6 9.94891 6 9.75C6 9.55109 6.07902 9.36032 6.21967 9.21967C6.36032 9.07902 6.55109 9 6.75 9ZM6.75 13.5L17.25 13.5C17.4489 13.5 17.6397 13.579 17.7803 13.7197C17.921 13.8603 18 14.0511 18 14.25C18 14.4489 17.921 14.6397 17.7803 14.7803C17.6397 14.921 17.4489 15 17.25 15L6.75 15C6.55109 15 6.36032 14.921 6.21967 14.7803C6.07902 14.6397 6 14.4489 6 14.25C6 14.0511 6.07902 13.8603 6.21967 13.7197C6.36032 13.579 6.55109 13.5 6.75 13.5Z"
      fill={secondaryColor}
    />
  </svg>
);
