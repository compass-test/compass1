import React from 'react';

export default () => {
  return (
    <svg width={32} height={32}>
      <defs>
        <rect id="prefix__a" width={32} height={32} rx={3} />
        <path
          d="M16.062 6V4h2.415a3.472 3.472 0 013.472 3.47v1.954c0 1.92-1.55 3.47-3.475 3.47H16v-2h2.474c.821 0 1.475-.655 1.475-1.47V7.47c0-.81-.66-1.469-1.472-1.469h-2.415zm-7.175 5v2H6.472C5.66 13 5 13.66 5 14.47v1.954c0 .815.654 1.47 1.474 1.47H8.95v2H6.474A3.466 3.466 0 013 16.423V14.47A3.472 3.472 0 016.472 11h2.415zM10 12a1 1 0 00.997 1h3.006a1 1 0 000-2h-3.006c-.547 0-.997.45-.997 1zm-2 0c0-1.657 1.347-3 2.997-3h3.006a3 3 0 010 6h-3.006A3 3 0 018 12zm2 7a1 1 0 00.997 1h3.006a1 1 0 000-2h-3.006c-.547 0-.997.45-.997 1zm-2 0c0-1.657 1.347-3 2.997-3h3.006a3 3 0 010 6h-3.006A3 3 0 018 19zm2-14a1 1 0 00.997 1h3.006a1 1 0 000-2h-3.006C10.45 4 10 4.45 10 5zM8 5c0-1.657 1.347-3 2.997-3h3.006a3 3 0 010 6h-3.006A3 3 0 018 5z"
          id="prefix__c"
        />
      </defs>
      <g
        style={{
          mixBlendMode: 'multiply',
        }}
        fill="none"
        fillRule="evenodd"
      >
        <mask id="prefix__b" fill="#fff">
          <use xlinkHref="#prefix__a" />
        </mask>
        <use fill="#F4F5F7" xlinkHref="#prefix__a" />
        <g mask="url(#prefix__b)">
          <g transform="translate(4 4)">
            <mask id="prefix__d" fill="#fff">
              <use xlinkHref="#prefix__c" />
            </mask>
            <use fill="#42526E" fillRule="nonzero" xlinkHref="#prefix__c" />
            <g mask="url(#prefix__d)">
              <path fill="#42526E" d="M0 24h24V0H0z" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
