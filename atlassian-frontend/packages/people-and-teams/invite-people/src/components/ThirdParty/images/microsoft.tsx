import React from 'react';

export function MicrosoftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path d="M0.5 0H11.9047V11.4047H0.5V0Z" fill="#F25022" />
        <path d="M13.0952 0H24.4999V11.4047H13.0952V0Z" fill="#7FBA00" />
        <path d="M0.5 12.5955H11.9047V24.0001H0.5V12.5955Z" fill="#00A4EF" />
        <path
          d="M13.0952 12.5955H24.4999V24.0001H13.0952V12.5955Z"
          fill="#FFB900"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="24"
            height="23.9999"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
