import React from 'react';

import type { CustomGlyphProps } from '@atlaskit/icon/types';

export const RedeployStatusIcon = (props: CustomGlyphProps) => {
  return (
    <svg {...props} width="16" height="16" viewBox="0 0 16 16">
      <g fill="none" fillRule="evenodd">
        <path
          d="M14.464 5.088A7.06 7.06 0 008.059 1h0a7.059 7.059 0 106.966 8.202"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="M8.059 12.47a4.412 4.412 0 114.324-5.29l.088-.004a1.765 1.765 0 00-.76 3.358 4.406 4.406 0 01-3.652 1.937z"
          fill="currentColor"
        />
        <path
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 12.47V8.942h-3.508"
        />
      </g>
    </svg>
  );
};
