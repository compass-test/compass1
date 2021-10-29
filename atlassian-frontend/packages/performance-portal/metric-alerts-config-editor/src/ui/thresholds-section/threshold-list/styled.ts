import styled from '@emotion/styled';

import { N100, text } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h600 } from '@atlaskit/theme/typography';

export const ThresholdTitle = styled.h3`
  ${h600};
  line-height: ${gridSize() * 4}px;
  margin-right: ${gridSize() * 4}px;
  margin-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AdvancedToggleWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;
export const AdvancedToggleLabel = styled.div<{ isDisabled: boolean }>`
  margin-left: 6px;
  color: ${(props) => (props.isDisabled ? N100 : text)};
`;

export const AdvancedToggleHelpTooltip = styled.div`
  margin-left: 6px;
`;
