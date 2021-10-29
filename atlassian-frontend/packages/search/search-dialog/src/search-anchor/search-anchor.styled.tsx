import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  dialogWidth,
  zIndex,
  dialogPageCentreWidth,
  dialogPageTakeoverWidth,
} from '../style-utils';

interface IsExpandedProp {
  isExpanded: boolean;
}

export const AbsoluteContainer = styled('div')({}, (props: IsExpandedProp) => {
  if (props.isExpanded) {
    return css`
      position: absolute;
      right: 0;
      z-index: ${zIndex.searchDialog};
    `;
  }
  return {};
});

export const SearchDialogAnchor = styled('div')(
  {
    position: 'relative',
  },
  (props: IsExpandedProp) => {
    if (props.isExpanded) {
      return css`
        @media screen and (max-width: ${dialogPageCentreWidth}) {
          position: fixed;
          z-index: ${zIndex.searchDialog};
          left: calc((100% - ${dialogWidth}) / 2);
        }
        @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          overflow: auto;
        }
      `;
    }
    return {};
  },
);

export const SearchAnchorWrapper = styled.div`
  position: relative;
  /* Prevent the input from being 200px when the icon is at the maximum icon width */
  @media screen and (min-width: ${dialogPageTakeoverWidth + 1}px) {
    min-width: 200px;
  }
  width: 32px;
  height: 32px;
`;
