import styled from '@emotion/styled';

import { N200 } from '@atlaskit/theme/colors';

interface PercentageDiffTextProps {
  color: string;
}

export const Container = styled.div`
  padding: 2px 0;
`;

export const IconContainer = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
`;

export const PercentageDiffText = styled.span`
  color: ${({ color }: PercentageDiffTextProps) => color};
`;

export const DiffText = styled.span`
  color: ${N200};
`;

export const NotApplicable = styled.span`
  color: ${N200};
`;
