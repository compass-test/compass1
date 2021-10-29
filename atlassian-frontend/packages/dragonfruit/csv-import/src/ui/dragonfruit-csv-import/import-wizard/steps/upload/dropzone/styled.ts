import styled from 'styled-components';

// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { N20, N30A, N50 } from '@atlaskit/theme/colors';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${gridSize() * 4}px;
  border: 2px dashed ${N50};
  border-radius: ${gridSize()}px;
  background-color: ${N20};
  overflow: hidden;
  margin-top: ${gridSize() * 2}px;
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${N30A};
`;

export const StyledInput = styled.input`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  opacity: 0;
  &:focus {
    outline: none;
  }
`;

export const DropzoneInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DropzoneInnerText = styled.div`
  margin-top: ${gridSize() * 2}px;
`;
