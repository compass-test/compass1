import styled from '@emotion/styled';

import {
  B50,
  B500,
  N0,
  N200,
  N50,
  N800,
  R400,
  Y75,
} from '@atlaskit/theme/colors';

import { StatusText } from './types';

const BACKGROUND_COLOR = {
  [StatusText.OPEN]: R400,
  [StatusText.ACKNOWLEDGED]: B50,
  [StatusText.SNOOZED]: Y75,
  [StatusText.CLOSED]: N0,
};

const BORDER_COLOR = {
  ...BACKGROUND_COLOR,
  [StatusText.CLOSED]: N50,
};

const TEXT_COLOR = {
  [StatusText.OPEN]: N0,
  [StatusText.ACKNOWLEDGED]: B500,
  [StatusText.SNOOZED]: N800,
  [StatusText.CLOSED]: N200,
};

export const Container = styled.div<{ statusText: StatusText }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => BACKGROUND_COLOR[props.statusText]};
  color: ${(props) => TEXT_COLOR[props.statusText]};
  border: 2px solid ${(props) => BORDER_COLOR[props.statusText]};
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
  padding: 0 4px;
  margin-left: 8px;
  justify-self: flex-end;
`;
