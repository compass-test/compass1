// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

import { RunnerAction } from '../types';

export const CodeActionIconContainer = styled.div`
  border-radius: 3px;
  width: ${gridSize() * 3}px;
  height: ${gridSize() * 3}px;
  background-color: ${colors.N30};
  cursor: pointer;
`;

export const CodeActionIcon = styled.div`
  padding-top: ${gridSize() * 0.5}px;
  padding-left: ${gridSize() * 0.5}px;
`;

export const ConfigureWrapper = styled.div<{ runnerAction: RunnerAction }>`
  margin-top: ${({ runnerAction }) =>
    runnerAction === RunnerAction.CREATE ? '24px' : '0px'};
  p {
    color: ${colors.N200};
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    margin-bottom: 4px;
  }
`;

export const SelectorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SelectWrapper = styled.div`
  width: 48%;
`;

export const ButtonWrapper = styled.div`
  margin: 16px auto 30px auto;
  display: grid;
`;

export const ButtonGroupWrapper = styled.div`
  margin: 16px auto 30px auto;
  display: flex;
  .backButton {
    width: 48%;
    margin-right: 4%;
    background-color: ${colors.N20A};
  }
  .backButton:hover {
    background-color: ${colors.N30A};
  }
  .forwardButton {
    width: 48%;
  }
`;

export const StepWrapper = styled.div`
  margin-top: 16px;
  code {
    font-size: 12px;
    line-height: 20px;
  }
  p {
    color: ${colors.N200};
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 16px;
  }
  .fileName {
    color: black;
  }
`;

export const RunCodeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
  background-color: ${colors.N20};
  padding: 10px;
  font-size: 12px;
  line-height: 20px;
  span {
    white-space: normal !important;
  }
`;

export const UseCodeWrapper = styled.div`
  border-radius: 4px;
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 16px;
`;

export const TokenCodeContainer = styled.div`
  width: 90%;
  word-wrap: break-word;
`;

export const RunStepCopyButton = styled.div`
  display: flex;
  flex: 0 0 auto;
  margin-top: auto;
  margin-left: auto;
`;

export const LabelWrapper = styled.div`
  background-color: ${colors.N10};
  border: 2px solid ${colors.N40};
  padding: 11px;
  border-radius: 3px;
  overflow: scroll;
  height: 60px;
  p {
    margin: 0px;
    font-size: 12px;
    line-height: 20px;
  }
`;

export const LabelSection = styled.div`
  p {
    font-size: 12px;
    line-height: 16px;
    color: ${colors.N200};
    margin-bottom: 6px;
  }
`;

export const UseStepCopyButton = styled.div`
  float: right;
`;

export const Loading = styled.div`
  width: 100%;
  animation: fadein 0.25s ease-out;
  text-align: center !important;
  padding: 100px 0 100px !important;
`;

export const ErrorCard = styled.div`
  border-radius: 3px;
  padding: 0px 20px;
  box-sizing: border-box;
  background-color: ${colors.R50};
  margin-top: 16px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  margin: 0;
  p {
    margin: 0 !important;
    padding: 8px 12px;
    color: ${colors.N800} !important;
  }
`;

export const CheckboxWrapper = styled.div`
  margin-top: 12px;
`;
