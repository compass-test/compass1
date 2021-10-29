import styled from 'styled-components';

import { N0, N20, N50, N70, N900 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const AvatarPreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${gridSize() * 3}px;
  margin-left: ${gridSize()}px;
`;

export const AvatarPreviewCanvas = styled.canvas`
  border-radius: 50%;
  width: 96px;
  height: 96px;
`;

export const ColorPaletteWrapper = styled.div`
  /* Firefox bug fix: https://product-fabric.atlassian.net/browse/ED-1789 */
  display: flex;
`;

export const Button = styled.button`
  height: 26px;
  width: 26px;
  background: ${N900};
  padding: 0;
  border-radius: ${gridSize() * 0.5}px;
  border: 1px solid ${N0};
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 0px 1px ${N20}, 0px 0px 0px 2px ${N70};
  }
`;

export const ButtonWrapper = styled.span`
  margin-bottom: 1px;
  margin-right: 3px;
  font-size: 0;
  display: flex;
  align-items: center;
  padding-bottom: 1px;
  padding-right: 3px;
  border-radius: 6px;
  &:hover {
    border-color: ${N50};
  }
`;

export const InitialsEditor = styled.div`
  display: flex;
`;

export const EditableInputs = styled.div`
  width: 218px;
  margin-bottom: ${gridSize() * 3 - 3}px;
`;

export const ModalHeaderWrapper = styled.div`
  margin-bottom: -${gridSize() * 3}px;
`;

export const ErrorMessageWrapper = styled.div`
  margin-bottom: -${gridSize() * 2 + 4}px;
`;
