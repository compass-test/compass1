import React from 'react';

import { CustomGlyphProps } from '@atlaskit/icon/types';

export default (props: CustomGlyphProps) => (
  <svg {...props} width={20} height={20}>
    <g fill="none">
      <circle fill="#FFAB00" cx={10} cy={10} r={10} />
      <path fill="#FFF" d="M5 8.75h10v2.5H5z" />
    </g>
  </svg>
);
