import styled from '@emotion/styled';

import { B200 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LabelWrapper = styled.div`
  // This is a weird margin.
  //
  // The top margin makes sense; we're just providing some space between the
  // image and the label. It's possible that we have no label for the
  // ImageRadio. In that case we don't render the label div at all and the
  // margin isn't present.
  //
  // The negative bottom margin is to negate the bottom line margin inherent to
  // the label text. We're doing this so that we visually distribute the image
  // and label text more symmetrically. This is especially relevant because a
  // checked ImageRadio will have a visible border.
  margin: ${gridSize()}px 0 -0.25em 0;

  text-align: center;
`;

export const RadioDisplay = styled.div`
  border: 1px solid transparent;
  border-radius: 2px;
  padding: ${gridSize()}px;
`;

export const RadioWrapper = styled.label`
  display: inline-block;
  margin: 0;
  padding: 0;
  cursor: pointer;

  & > input {
    box-sizing: border-box;
    display: block;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;

    &:checked + div {
      border-color: ${B200};
    }
  }
`;
