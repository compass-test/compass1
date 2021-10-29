import styled from '@emotion/styled';

import { fontSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

export const Container = styled.div`
  max-width: 1040px;
  margin: 0 auto;
`;

export const H2 = styled.div`
  font-size: ${headingSizes.h800.size / fontSize()}em;
  margin: 20px 0 0;
  flex: 2;
`;

export const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
