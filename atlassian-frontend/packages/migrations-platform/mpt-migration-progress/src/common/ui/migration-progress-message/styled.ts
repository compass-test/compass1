import styled from 'styled-components';

import { N70, N800 } from '@atlaskit/theme/colors';

export const Message = styled.span`
  color: ${N800};
  margin-left: 8px;
  margin-right: 8px;
  line-height: 24px;
`;

export const MessageDisabled = styled.span`
  color: ${N70};
  margin-left: 8px;
  margin-right: 8px;
  line-height: 24px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TooltipIconContainer = styled.div`
  display: flex;
`;
