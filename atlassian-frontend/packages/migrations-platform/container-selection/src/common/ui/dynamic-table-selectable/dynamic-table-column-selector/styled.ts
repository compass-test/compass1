import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';

export const CheckboxWrapper = styled.div`
  display: flex;

  /* needed to align this with other header */
  height: ${gridSize() * 2}px;
  margin-top: -${gridSize() / 2}px;

  /* No label for this checkbox, we use tooltips instead.
     Display none because of unnecessary padding on the label span even when no label text is provided.
     This used to be done via Checkbox overrides, but that prop is now deprecated.
   */
  label > span {
    display: none;
  }
`;

export const IconWrapper = styled.span`
  cursor: pointer;
  display: flex;
  flex: 1;
  margin-top: -${gridSize() / 2}px;
  margin-left: -${gridSize()}px;
`;
