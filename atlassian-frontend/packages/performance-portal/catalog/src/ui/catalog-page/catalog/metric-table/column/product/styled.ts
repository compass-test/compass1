import styled from '@emotion/styled';

import { fontSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

export const Product = styled.div`
  font-size: ${headingSizes.h100.size / fontSize()}em;
  font-weight: normal;
  margin: 0;
`;
