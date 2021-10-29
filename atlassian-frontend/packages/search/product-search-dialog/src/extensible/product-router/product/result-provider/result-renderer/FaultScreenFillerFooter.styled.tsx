import styled from '@emotion/styled';
import { gridSize } from '@atlaskit/theme/constants';

const footerHeight = gridSize() * 6;

const FaultScreenFillerFooter = styled.div`
  width: 100%;
  height: ${footerHeight}px;
`;

export default FaultScreenFillerFooter;
