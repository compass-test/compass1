import styled from '@emotion/styled';
import { N40A } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

const footerHeight = gridSize() * 6;

export const SearchFooter = styled.div`
  width: 100%;
  border-top: 1px solid ${N40A};
  height: ${footerHeight}px;
`;
