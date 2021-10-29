import React from 'react';

import type { CustomGlyphProps } from '@atlaskit/icon/types';

export const RerunStatusIcon = (props: CustomGlyphProps) => {
  return (
    <svg {...props} width="16" height="16" viewBox="0 0 16 16">
      <g fillRule="nonzero" fill="none">
        <circle fill="currentColor" cx={8} cy={8} r={8} />
        <path
          d="M4.632 6.857h1.056a.571.571 0 110 1.143H3.485a.629.629 0 01-.628-.629V5.143a.571.571 0 111.143 0v.415a4.571 4.571 0 11-.138 4.65.571.571 0 011-.554 3.429 3.429 0 10-.23-2.797z"
          fill="#FFF"
        />
      </g>
    </svg>
  );
};
