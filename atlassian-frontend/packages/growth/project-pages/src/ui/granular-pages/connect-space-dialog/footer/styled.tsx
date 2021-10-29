import styled from 'styled-components';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { N200 } from '@atlaskit/theme/colors';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const WrappedErrorIcon = styled(ErrorIcon)`
  margin-right: 8px;
`;

export const WrappedError = styled.div`
  display: flex;
  align-items: center;
  color: ${N200};
  font-size: 12px;
`;
