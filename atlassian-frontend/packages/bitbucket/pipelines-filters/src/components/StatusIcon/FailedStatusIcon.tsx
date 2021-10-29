import React from 'react';

import type { CustomGlyphProps } from '@atlaskit/icon/types';

export const FailedStatusIcon = (props: CustomGlyphProps) => {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      role="presentation"
    >
      <path
        d="M7 9h2V4H7v5zm0 3h2v-2H7v2zm8.367-7.102a8.039 8.039 0 00-1.703-2.546 8.103 8.103 0 00-2.555-1.71A7.736 7.736 0 008 0C6.917 0 5.882.21 4.898.633a8.055 8.055 0 00-2.547 1.703A8.14 8.14 0 00.64 4.89 7.776 7.776 0 000 8c0 1.083.21 2.117.632 3.102.422.984.99 1.833 1.703 2.546a8.103 8.103 0 002.555 1.71C5.88 15.786 6.917 16 8 16c1.083 0 2.117-.21 3.1-.633a8.048 8.048 0 002.548-1.703 8.08 8.08 0 001.71-2.555c.428-.99.642-2.027.642-3.11 0-1.083-.21-2.117-.633-3.102z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
