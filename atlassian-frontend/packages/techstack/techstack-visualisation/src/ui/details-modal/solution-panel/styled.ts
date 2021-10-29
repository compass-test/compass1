import styled from '@emotion/styled';

import { fontSizeSmall, gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div`
  margin: ${gridSize()}px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Heading = styled.h4`
  display: flex;
  justify-content: space-between;
`;
export const Caption = styled.h5``;
export const SubCaption = styled.h6``;
export const Description = styled.p`
  font-size: ${fontSizeSmall()}px;
`;
export const CheckWrapper = styled.p`
  display: flex;
  justify-content: space-between;
`;

export const VideoWrapper = styled.div`
  margin-top: ${gridSize()}px;
`;
