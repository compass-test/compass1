import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { fontFamily, gridSize } from '@atlaskit/theme/constants';
import { h200 } from '@atlaskit/theme/typography';

export const Container = styled.div`
  position: relative;
  display: flex;
`;

export const TypeSelectWrapper = styled.div`
  width: 100px;
  margin-right: ${gridSize()}px;
`;

export const ValueSelectWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TeamSelectWrapper = styled.div`
  margin-left: ${gridSize()}px;
  flex: 1;
  min-width: 0;
  width: ${gridSize() * 25}px;
  position: relative;
`;

export const TeamColumnLabel = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  display: flex;
  align-items: flex-start;
  gap: 3px;
`;

/**
 * Provide a styled Label for field components
 * Copied from packages/design-system/form/src/styled/Field.ts
 */
export const Label = styled.label`
  ${h200()}
  display: inline-block;
  font-family: ${fontFamily()};
  margin-bottom: ${gridSize() * 0.5}px;
  margin-top: 0;
`;

export const Icon = styled.img<{ isDisabled?: boolean }>`
  width: ${gridSize() * 3}px;
  height: ${gridSize() * 3}px;
  object-fit: contain;
  opacity: ${(props) => (props.isDisabled ? 0.25 : 1)};
  filter: ${(props) => (props.isDisabled ? 'grayscale(25%)' : 'none')};
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;

  & > img {
    border-radius: 3px;
    margin-right: ${gridSize()}px;
  }
`;

export const WarningContent = styled.div`
  display: flex;

  > div:first-child {
    padding-right: ${gridSize() * 3}px;
  }

  > div:nth-child(2) {
    max-width: 250px;
    padding-right: 50px;
  }
`;

export const WarningContainer = styled.div`
  position: absolute;
  right: -${gridSize() * 4}px;
  height: ${gridSize() * 5}px;
  display: flex;
  align-items: center;
`;

export const GroupLabel = styled.div`
  font-style: italic;
  color: ${colors.N900};
  font-size: 11pt;
  text-transform: initial;
  font-weight: 350;
`;

export const OptionsDivider = styled.hr`
  border: 0;
  height: 1px;
  background-color: ${colors.N50};
  margin-bottom: ${gridSize() * 2}px;
`;
