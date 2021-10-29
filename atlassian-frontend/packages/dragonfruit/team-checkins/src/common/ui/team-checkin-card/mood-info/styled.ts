import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';

export const MoodInfoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const EmojiWrapper = styled.div`
  margin-right: ${gridSize() * 0.5}px;
`;

export const LozengeWrapper = styled.div`
  margin-left: ${gridSize() * 0.5}px;

  // This is accommodate the height of the Lozenge
  // as the underlying Lozenge does not expose configurable height
  & > span {
    font-size: 12px;
    line-height: 20px;

    // This is accommodate the font-weight of the Lozenge text
    // as the underlying Lozenge does not expose configurable font-weight
    & > span {
      font-weight: 600;
    }
  }
`;

export const Emoji = styled.img`
  display: block;
  margin: 0;
  padding: 0;

  // This is accommodate the size of the emoji
  // as the underlying source does not expose configurable size
  width: 24px;
  height: 24px;
`;
