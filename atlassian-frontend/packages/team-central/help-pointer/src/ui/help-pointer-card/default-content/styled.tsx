import styled from '@emotion/styled';

import { N500, N800 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

export const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow: inherit;
  display: flex;
  flex-direction: column;
`;

export const HelpCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 0 16px 0;
`;

export const IconWrapper = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  width: 24px;
  height: 24px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Title = styled.div`
  display: flex;
  flex-grow: 1;
  align-self: center;
  white-space: break-spaces;
  color: ${token('color.text.highEmphasis', N800)};
  font-weight: 600;
  padding-left: 8px;
  padding-right: 8px;

  span {
    white-space: normal;
    word-break: break-word;
  }
`;

export const Description = styled.div`
  display: -webkit-box;
  flex-grow: 1;
  overflow: auto;
  color: ${token('color.text.mediumEmphasis', N500)};

  span {
    width: inherit;
    white-space: normal;
    word-break: break-word;
  }
`;

export const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin-left: -4px;
  margin-top: 10px;
`;
