import styled from 'styled-components';

import { N90 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';

const EVENT_SPACING = gridSize() * 0.375;
export const EVENT_WIDTH = gridSize() * 28;

export const PopupWrapper = styled.div`
  padding: ${gridSize()}px;
`;

PopupWrapper.displayName = 'PopupWrapper';

export const PopupHeader = styled.div`
  display: flex;
  align-items: center;
`;

PopupHeader.displayName = 'PopupHeader';

export const PopupDate = styled.h2`
  ${h400}
  color: ${N90};
  flex-grow: 1;
`;

PopupDate.displayName = 'PopupDate';

export const EventBackground = styled.div<{
  backgroundColor: string;
  borderColor: string;
}>`
  width: ${EVENT_WIDTH}px;
  white-space: nowrap;
  margin-top: ${EVENT_SPACING}px;
  border-radius: ${EVENT_SPACING}px;
  background-color: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.borderColor ?? 'transparent'};
  border-width: ${(props) =>
    props.borderColor && props.borderColor !== 'transparent' ? '2px' : '0px'};
  border-style: ${(props) =>
    props.borderColor && props.borderColor !== 'transparent'
      ? 'solid'
      : 'none'};
`;

EventBackground.displayName = 'EventBackground';
