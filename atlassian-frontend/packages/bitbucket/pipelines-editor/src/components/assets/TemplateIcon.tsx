import React from 'react';

import Icon from '@atlaskit/icon';
import { CustomGlyphProps } from '@atlaskit/icon/types';

const templateGlyph = (props: CustomGlyphProps) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 3C3.89543 3 3 3.89543 3 5V7C3 7.55229 3.44772 8 4 8C4.55228 8 5 7.55229 5 7V5H7C7.55228 5 8 4.55229 8 4C8 3.44772 7.55228 3 7 3H5Z"
      fill="#42526E"
    />
    <path
      d="M21 5C21 3.89543 20.1046 3 19 3H17C16.4477 3 16 3.44772 16 4C16 4.55228 16.4477 5 17 5H19V7C19 7.55228 19.4477 8 20 8C20.5523 8 21 7.55228 21 7V5Z"
      fill="#42526E"
    />
    <path
      d="M5 21C3.89543 21 3 20.1046 3 19V17C3 16.4477 3.44772 16 4 16C4.55228 16 5 16.4477 5 17V19H7C7.55228 19 8 19.4477 8 20C8 20.5523 7.55228 21 7 21H5Z"
      fill="#42526E"
    />
    <path
      d="M4 10C3.44772 10 3 10.4477 3 11V13C3 13.5523 3.44772 14 4 14C4.55228 14 5 13.5523 5 13V11C5 10.4477 4.55228 10 4 10Z"
      fill="#42526E"
    />
    <path
      d="M11 5C10.4477 5 10 4.55228 10 4C10 3.44772 10.4477 3 11 3H13C13.5523 3 14 3.44772 14 4C14 4.55228 13.5523 5 13 5H11Z"
      fill="#42526E"
    />
    <path
      d="M14 10C14 9.44771 14.4477 9 15 9C15.5523 9 16 9.44772 16 10V14H20C20.5523 14 21 14.4477 21 15C21 15.5523 20.5523 16 20 16H16V20C16 20.5523 15.5523 21 15 21C14.4477 21 14 20.5523 14 20V16H10C9.44771 16 9 15.5523 9 15C9 14.4477 9.44772 14 10 14H14V10Z"
      fill="#42526E"
    />
  </svg>
);

const TemplateIcon = () => {
  return (
    <Icon glyph={templateGlyph} label="Change the template" size="medium" />
  );
};

export default TemplateIcon;
