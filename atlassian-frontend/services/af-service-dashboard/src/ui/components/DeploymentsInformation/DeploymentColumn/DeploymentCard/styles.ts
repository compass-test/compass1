import { css } from '@emotion/core';

import {
  flex,
  transitionTiming,
  link,
  flexJustifyCenter,
} from '../../../../styles';
export { link, inlineText, flexGrow } from '../../../../styles';

export const successColor = '#5DB082';
export const failColor = '#EC6240';
export const inprogressColor = '#2966F6';
export const buttonPrimaryColor = '#6B778C';
const buttonBackground = '#F5F6F7';
const buttonBackgroundHover = '#ebecf0';

export const cardContainer = css`
  ${flex};
  background: white;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 300px;
  word-break: break-word;
`;

const cardSection = css`
  display: flex;
  justify-content: space-between;
`;

export const topSection = css`
  ${cardSection};
  cursor: pointer;
`;

export const expandCardSection = css`
  ${cardSection};
  padding-top: 5px;
  margin-top: 5px;
  border-top: 1px solid rgb(223, 225, 230);
`;

export const expandedSection = css`
  padding-top: 12px;
  ${transitionTiming};
`;

export const small = css`
  font-size: 0.7em;
  margin-top: 2px;
  margin-bottom: 7px;
`;

export const button = css`
  cursor: pointer;
  border-radius: 5px;
  padding: 2px 4px;
  margin-left: 5px;
  background: ${buttonBackground};
  ${transitionTiming};

  &:hover {
    background: ${buttonBackgroundHover};
  }
`;

export const cardLink = css`
  ${link}
  display: block;
  margin-bottom: 5px;
`;

export const uploadButton = css`
  ${button};
`;

export const editButton = css`
  ${button};
`;

export const tagContainer = css`
  display: flex;
  flex-wrap: wrap;
`;

export const tagMarginOverride = css`
  margin-left: -4px;
  margin-right: 4px;
`;

export const secondaryText = css`
  color: grey;
  margin-left: 5px;
  font-size: 0.8em;
`;

export const spinner = css`
  ${flexJustifyCenter}
  padding: 0;
`;
