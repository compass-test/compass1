import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

export const Row = styled.div`
  margin-top: 16px;

  &:first-child {
    margin-top: 0;
  }
`;

export const HeaderContainer = styled.div<{ isSettingsMode?: boolean }>`
  position: relative;
  padding-top: ${(props) => gridSize() * (props.isSettingsMode ? 0 : 6)}px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const Description = styled.p`
  margin: 2rem 0;
`;

export const FormContainer = styled.div<{ isSettingsMode?: boolean }>`
  width: 100%;
  padding: ${(props) => (props.isSettingsMode ? 0 : gridSize() * 2)}px 0;
`;
