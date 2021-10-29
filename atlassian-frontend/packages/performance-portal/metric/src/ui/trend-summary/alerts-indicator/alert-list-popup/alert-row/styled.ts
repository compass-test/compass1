import styled from '@emotion/styled';

import { N30 } from '@atlaskit/theme/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${N30};
  padding: 16px 0;
  &:last-child {
    border-bottom: 0;
  }
`;

export const Line1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Line1Left = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Line1Right = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.a`
  margin-left: 8px;
`;

export const AlertSentAt = styled.div``;
