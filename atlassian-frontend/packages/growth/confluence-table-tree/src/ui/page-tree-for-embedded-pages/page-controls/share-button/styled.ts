import styled from '@emotion/styled';
import { h200, h600 } from '@atlaskit/theme/typography';
import { N800 } from '@atlaskit/theme/colors';
import { gridSize, fontSizeSmall } from '@atlaskit/theme/constants';

export const ShareMenuWrapper = styled.div`
  padding: ${gridSize() * 2.5}px;
`;

export const Title = styled.h3`
  ${h600};
`;

export const Subtitle = styled.h4`
  ${h200};
`;

export const Content = styled.div`
  display: flex;
  gap: ${gridSize() * 2}px;
  margin-top: ${gridSize() / 2}px;
`;

export const InlineMessage = styled.div`
  display: flex;
  align-items: center;
  color: ${N800};
  font-size: ${fontSizeSmall()}px;
  gap: ${gridSize() / 2}px;
  margin-top: ${gridSize()}px;
`;
