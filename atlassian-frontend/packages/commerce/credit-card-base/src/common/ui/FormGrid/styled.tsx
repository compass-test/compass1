import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';

import { CVC, EXPIRY, NAME, NUMBER } from '../../constants/field-names';

export const FormGrid = styled.div`
  display: grid;
  grid-template-areas: '${NUMBER} ${NUMBER}' '${NAME} ${NAME}' '${EXPIRY} ${CVC}';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: ${gridSize() * 2}px;
  grid-row-gap: ${gridSize() * 2}px;
`;
