import React from 'react';

import type { CustomGlyphProps } from '@atlaskit/icon/types';

export const DefaultStatusIcon = (props: CustomGlyphProps) => {
  return (
    <svg {...props} width="7" height="7" viewBox="0 0 7 7">
      <circle cx="3.5" cy="3.5" r="3.5" fill="#C1C7D0" fillRule="evenodd" />
    </svg>
  );
};
