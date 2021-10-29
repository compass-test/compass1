import styled from 'styled-components';

import { N800 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';
import { Card } from '@atlassian/dragonfruit-common-ui';

export const ErrorStateWrapper = styled(Card)`
  text-align: center;
  word-wrap: break-word;
`;

export const Header = styled.div`
  ${h400()};
  margin-top: 0;
  margin-bottom: ${gridSize() * 2}px;
`;

export const Description = styled.p`
  color: ${N800};
  margin-top: 0;
  margin-bottom: 0;
`;
