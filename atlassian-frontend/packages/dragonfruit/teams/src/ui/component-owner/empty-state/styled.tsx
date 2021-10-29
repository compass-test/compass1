import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';
import { CardBody } from '@atlassian/dragonfruit-common-ui';

export const Wrapper = styled(CardBody)`
  align-items: center;
  text-align: center;
`;

export const ImageWrapper = styled.div`
  width: ${gridSize() * 10}px;
  height: ${gridSize() * 10}px;
  margin: ${gridSize() * 2}px;
`;

export const Message = styled.div`
  padding-bottom: ${gridSize() * 2}px;
`;

export const Title = styled.div`
  ${h400}
  margin-top: 0;
`;
