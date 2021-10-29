import styled from '@emotion/styled';

import { N600, N900 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h500 } from '@atlaskit/theme/typography';

export const Section = styled.div`
  margin-bottom: ${gridSize() * 2}px;
`;

export const Title = styled.div`
  ${h500()}

  color: ${N900};
  margin-bottom: ${gridSize()}px;
`;

export const Description = styled.div`
  color: ${N600};
`;
