import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const IllustratedDialogContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  position: relative;
  z-index: 10;
  margin-top: ${gridSize() * 1.25}px;

  > div {
    flex: 1;
  }

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const SvgWrapper = styled.div`
  width: ${gridSize() * 35}px;
  height: auto;
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  align-items: center;

  min-width: 0; //Hack to prevent flex-box growth: https://css-tricks.com/flexbox-truncated-text/

  text-align: center;

  @media (max-width: 750px) {
    margin-right: 0;
    margin-bottom: ${gridSize() * 2}px;
    align-self: center;
  }
`;

export const TeamDataSection = styled.div`
  min-width: 0; //Hack to prevent flex-box growth: https://css-tricks.com/flexbox-truncated-text/

  @media (max-width: 750px) {
    margin-left: 0;
  }
`;

export const DescriptionParagraph = styled.p`
  white-space: pre-line;
  margin-bottom: ${gridSize() * 3}px;
`;

export const TeamNameWrapper = styled.div`
  margin-bottom: ${gridSize() * 3}px;
`;

export const UserPickerWrapper = styled.div`
  margin-bottom: ${gridSize() * 1.25}px;
`;
