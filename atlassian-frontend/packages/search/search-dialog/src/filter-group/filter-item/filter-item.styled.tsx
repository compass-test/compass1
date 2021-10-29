import styled from '@emotion/styled';
import { nowrapEllipsis, grid } from '../../style-utils';
import { N900 } from '@atlaskit/theme/colors';

export const WIDTH = grid.multiple(22);
export const HALF_WIDTH = WIDTH.half();

const IRREMOVABLE_AVATAR_PADDING_SIZE = 2;

// The +4px is to ensure consistency with the Atlaskit avatar which has a 2px padding around the 24px icon
const ICON_WIDTH =
  grid.multiple(3).unitless + IRREMOVABLE_AVATAR_PADDING_SIZE * 2;
const ICON_HEIGHT =
  grid.multiple(3).unitless + IRREMOVABLE_AVATAR_PADDING_SIZE * 2;

export const IconWrapper = styled.span`
  height: ${ICON_HEIGHT}px;
  width: ${ICON_WIDTH}px;
  padding: 0 ${grid.unitless - IRREMOVABLE_AVATAR_PADDING_SIZE}px 0
    ${grid.half().unitless - IRREMOVABLE_AVATAR_PADDING_SIZE}px;
`;

export const LabelWrapper = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
  // Offset the label's 4px padding-left
  margin-left: -4px;
  // The -2px is to offset the 28px container (see IconWrapper)
  padding: ${grid.unitless - 2} 0;
`;

export const FilterColLabelText = styled.span`
  ${nowrapEllipsis};
  width: ${WIDTH.px};
  color: ${N900};
`;

export const FilterRowLabelText = styled.span`
  ${nowrapEllipsis};
  padding-left: ${grid.half().px};
  color: ${N900};
  width: ${HALF_WIDTH.px};
`;

export const CheckboxWrapper = styled.span`
  padding: ${grid.unitless - 2}px 0;
  display: flex;
  flex-grow: 1;
`;
