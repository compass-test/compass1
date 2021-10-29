import React from 'react';
import styled from '@emotion/styled';

interface Props {
  className?: string;
}

// todo - this icon is equivalent to import SearchIcon from '@atlaskit/icon/glyph/search'; we should document the deliberate reason for this, and mark whether this component is private or public?

export const SearchIcon: React.FunctionComponent<Props> = ({ className }) => (
  <svg
    className={className}
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 8.15126 11.6109 9.21164 10.9571 10.0568L13.5846 12.7302C13.8427 12.9928 13.839 13.4149 13.5764 13.673C13.3139 13.9311 12.8918 13.9274 12.6337 13.6648L10.0086 10.9939C9.17144 11.6255 8.12945 12 7 12ZM10.6667 7C10.6667 9.02504 9.02504 10.6667 7 10.6667C4.97496 10.6667 3.33333 9.02504 3.33333 7C3.33333 4.97496 4.97496 3.33333 7 3.33333C9.02504 3.33333 10.6667 4.97496 10.6667 7Z"
      fill="currentColor"
    />
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="2"
      y="2"
      width="12"
      height="12"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 8.15126 11.6109 9.21164 10.9571 10.0568L13.5846 12.7302C13.8427 12.9928 13.839 13.4149 13.5764 13.673C13.3139 13.9311 12.8918 13.9274 12.6337 13.6648L10.0086 10.9939C9.17144 11.6255 8.12945 12 7 12ZM10.6667 7C10.6667 9.02504 9.02504 10.6667 7 10.6667C4.97496 10.6667 3.33333 9.02504 3.33333 7C3.33333 4.97496 4.97496 3.33333 7 3.33333C9.02504 3.33333 10.6667 4.97496 10.6667 7Z"
        fill="currentColor"
      />
    </mask>
    <g mask="url(#mask0)">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 16H16V0H0V16Z" />
    </g>
  </svg>
);

export const LargeSearchIcon = styled(SearchIcon)`
  width: 24px;
  height: 24px;
`;
