import React from 'react';

import Icon from '@atlaskit/icon';
import { CustomGlyphProps } from '@atlaskit/icon/types';

const pieGlyph = (props: CustomGlyphProps) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 3C0 1.34315 1.34315 0 3 0H21C22.6569 0 24 1.34315 24 3V21C24 22.6569 22.6569 24 21 24H3C1.34315 24 0 22.6569 0 21V3Z"
      fill="#F4F5F7"
    />
    <path
      d="M12 7C13.27 7 14.42 7.49 15.31 8.28L16.73 6.86C15.48 5.71 13.82 5 12 5C8.14 5 5 8.14 5 12H7C7 9.24 9.24 7 12 7Z"
      fill="#42526E"
    />
    <path
      d="M16.52 9.9C16.82 10.54 17 11.25 17 12C17 14.76 14.76 17 12 17C9.95004 17 8.20004 15.76 7.42004 14H5.29004C6.15004 16.89 8.83004 19 12 19C15.86 19 19 15.86 19 12C19 10.69 18.63 9.46 18 8.41L16.52 9.9Z"
      fill="#42526E"
    />
    <path
      d="M12 7C13.27 7 14.42 7.49 15.31 8.28L16.73 6.86C15.48 5.71 13.82 5 12 5C8.14 5 5 8.14 5 12H7C7 9.24 9.24 7 12 7Z"
      fill="#42526E"
    />
    <path
      d="M16.52 9.9C16.82 10.54 17 11.25 17 12C17 14.76 14.76 17 12 17C9.95004 17 8.20004 15.76 7.42004 14H5.29004C6.15004 16.89 8.83004 19 12 19C15.86 19 19 15.86 19 12C19 10.69 18.63 9.46 18 8.41L16.52 9.9Z"
      fill="#42526E"
    />
  </svg>
);

const PieChartIcon = () => {
  return <Icon glyph={pieGlyph} label="Pie Chart" />;
};

export default PieChartIcon;
