import styled from '@emotion/styled';

import { N0, N20, N30A, N400, N800 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

export const DefaultWrapper = styled.a`
  background-color: ${token('color.background.card', N0)};
  overflow: hidden;
  border: 1px solid ${token('color.border.neutral', N30A)};
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  position: relative;
  overflow: visible;

  &:hover {
    text-decoration: none;
    box-shadow: ${token(
      'shadow.overlay',
      '0px 8px 12px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31)',
    )};
    > div.link-tooltip {
      display: block;
      z-index: 600;
    }
  }
`;

export const BorderlessWrapper = styled.a`
  overflow: hidden;
  padding: 8px 8px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: 40px;
  border-radius: 6px;
  margin: 4px 0px;

  &:hover {
    text-decoration: none;
    color: ${token('color.text.highEmphasis', N800)};
    background-color: ${token(
      'color.background.transparentNeutral.hover',
      N20,
    )};
  }

  > * + * {
    margin-left: 16px;
  }
`;

export const DefaultLinkTooltip = styled.div`
  background: ${token('color.background.boldNeutral.resting', N400)};
  border-radius: 3px;
  color: ${token('color.text.onBold', N0)};
  padding: 0 6px 0 2px;
  display: none;
  position: absolute;
  left: 0;
  bottom: -28px;
  text-align: center;

  align-items: center;
  vertical-align: center;
  line-height: 24px;

  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  > span {
    display: inline;
  }
`;
