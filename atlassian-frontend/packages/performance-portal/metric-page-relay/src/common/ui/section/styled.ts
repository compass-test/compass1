import styled from '@emotion/styled';

import { N0, N400 } from '@atlaskit/theme/colors';

export const SectionContainer = styled.div`
  padding: 17px;

  background: ${N0};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.31), 0px 1px 1px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SectionHeader = styled.div`
  color: ${N400};
  font-size: 12px;
  line-height: 16px;

  text-transform: uppercase;
  margin-bottom: 10px;
`;
