import React from 'react';

import { uid } from 'react-uid';

import { Props as LogoProps } from '@atlaskit/logo/constants';
import Wrapper from '@atlaskit/logo/Wrapper';

const svg = () => {
  const gradient1 = uid('compass_icon_gradient1');
  const gradient2 = uid('compass_icon_gradient2');

  return `
    <canvas width="32" height="32" aria-hidden="true"></canvas>
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gradient1}" x1="8" y1="7.5" x2="4" y2="12" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1D57C6"/>
          <stop offset="0.967726" stop-color="#3777F1"/>
        </linearGradient>
        <linearGradient id="${gradient2}" x1="12.5" y1="0" x2="12.5" y2="7" gradientUnits="userSpaceOnUse">
          <stop stop-color="#3777F1"/>
          <stop offset="1" stop-color="#3777F1"/>
        </linearGradient>
      </defs>
      <path fill="url(#${gradient1})" fill-rule="evenodd" clip-rule="evenodd" d="M0 5C0 4.44772 0.447715 4 1 4H8V8H4V12H8V8H12V15C12 15.5523 11.5523 16 11 16H1C0.447715 16 0 15.5523 0 15V5Z"/>
      <path fill="url(#${gradient2})" fill-rule="evenodd" clip-rule="evenodd" d="M8 0V4H12V8H16V1C16 0.447715 15.5523 0 15 0H8Z" />
    </svg>
    `;
};

export default function CompassIcon(props: LogoProps) {
  return <Wrapper {...props} svg={svg} />;
}
