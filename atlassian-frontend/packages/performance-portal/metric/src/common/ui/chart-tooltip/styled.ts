import styled from '@emotion/styled';

import { headingSizes } from '@atlaskit/theme/typography';

export const TooltipContainer = styled.div`
  box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 3px;
  background-color: #fff;
  padding: 20px 16px;
`;

export const HighlightedContentContainer = styled.div`
  font-size: ${headingSizes.h400.size}px;
  line-height: ${headingSizes.h400.lineHeight}px;
`;

export const ContentContainer = styled.div`
  font-size: 11px;
  line-height: 14px;
`;
