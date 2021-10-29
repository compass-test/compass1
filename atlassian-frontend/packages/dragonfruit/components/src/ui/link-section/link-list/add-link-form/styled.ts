import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const AddLinkFormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${gridSize() * -1.5}px;
  width: 100%;
  column-gap: 1em;
`;

export const AddLinkFieldWrapper = styled.div`
  flex-grow: 1;

  // Prevent link field from overlapping.
  max-width: 100%;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin-top: ${gridSize()}px;
`;
