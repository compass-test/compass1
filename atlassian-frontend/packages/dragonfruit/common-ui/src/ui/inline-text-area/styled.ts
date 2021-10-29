import styled from 'styled-components';

import { fontSize, gridSize } from '@atlaskit/theme/constants';

import { InlineReadView, InlineWrapper } from '../../common/ui/inline-edit';

export const Wrapper = styled(InlineWrapper)`
  // Position relative so that the spinner can overlay
  position: relative;
`;

type SpinnerWrapperProps = {
  active?: boolean;
};

export const SpinnerWrapper = styled.div<SpinnerWrapperProps>`
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};

  display: flex;
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  align-items: center;
  justify-content: center;
`;

export const ReadViewContent = styled(InlineReadView)`
  font-size: ${fontSize()}px;
  line-height: ${(gridSize() * 2.5) / fontSize()};
  min-height: ${(gridSize() * 2.5) / fontSize()}em;
`;
