import styled from 'styled-components';
import { N400 } from '@atlaskit/theme/colors';

export const KeyboardShortcutContainer = styled.div`
  display: flex;
  line-height: 16px;
  align-items: center;
  padding-bottom: 1px;
  padding-top: 1px;
`;

export const KeyboardShortcut = styled.div`
  background-color: ${N400};
  border-radius: 2px;
  margin-left: 4px;
  padding: 1px 8px;
  line-height: 16px;
`;
