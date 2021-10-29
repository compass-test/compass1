import React from 'react';

export function PaymentDefault(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={60} height={40} viewBox="0 0 72 46" {...props}>
      <title>{'Group'}</title>
      <g fill="none" fillRule="evenodd">
        <path
          d="M68.09 1H3.278A2.285 2.285 0 001 3.291V42.59a2.285 2.285 0 002.278 2.292H68.09a2.285 2.285 0 002.278-2.292V3.291A2.285 2.285 0 0068.09 1z"
          strokeLinecap="round"
          strokeWidth={2}
          stroke="#1F5081"
          fill="#F5F5F5"
          strokeLinejoin="round"
        />
        <path
          fill="#205081"
          d="M1 1h69v8H1zm49 21h16v5H50zM5 38h3v2.975H5zm4 0h3v2.975H9zm18 0h3v2.975h-3zm-14 0h3v2.975h-3zm18 0h3v2.975h-3zm-14 0h3v2.975h-3zm18 0h3v2.975h-3zm10 0h3v2.975h-3zm-24 0h3v2.975h-3zm18 0h3v2.975h-3zm10 0h3v2.975h-3z"
        />
        <path
          d="M5.5 26H43M5.5 21H26"
          stroke="#205081"
          strokeWidth={2}
          strokeLinecap="square"
        />
      </g>
    </svg>
  );
}
