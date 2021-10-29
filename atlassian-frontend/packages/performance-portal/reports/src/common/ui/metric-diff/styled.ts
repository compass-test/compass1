import styled from '@emotion/styled';

import { N200 } from '@atlaskit/theme/colors';

interface IconContainerProps {
  primaryColor: string;
}

export const IconContainer = styled.div`
  display: flex;
  align-items: center;

  color: ${({ primaryColor }: IconContainerProps) => primaryColor};

  font-size: 12px;
`;

export const DiffText = styled.span`
  margin-top: 8px;
  font-size: 11px;
  padding-left: 6px;
  color: ${N200};
  white-space: nowrap;
`;

export const AlignLeft = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

export const NonBreakingText = styled.span`
  white-space: nowrap;
`;
