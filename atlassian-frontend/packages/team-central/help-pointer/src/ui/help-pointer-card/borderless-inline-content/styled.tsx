import styled from '@emotion/styled';

import { N300, N500, N800 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

export const Content = styled.div`
  width: 100%;
  overflow: inherit;
`;

export const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${token('color.text.highEmphasis', N800)};
  font-weight: 600;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Description = styled.div<{ descriptionLineCount: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => props.descriptionLineCount};
  overflow: inherit;

  min-height: ${(props) => props.descriptionLineCount * 20}px;
  color: ${token('color.text.mediumEmphasis', N500)};
`;

export const Owner = styled.div`
  white-space: nowrap;
  overflow: inherit;
  text-overflow: ellipsis;

  margin-top: 8px;
  color: ${token('color.text.lowEmphasis', N300)};
`;

export const IconWrapper = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  width: 32px;
  height: 32px;
  margin: 4px 0;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
