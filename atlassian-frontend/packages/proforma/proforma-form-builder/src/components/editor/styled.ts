import styled from 'styled-components';

import { DN900, N90 } from '@atlaskit/theme/colors';
import { themed } from '@atlaskit/theme/components';
import { fontFamily, gridSize } from '@atlaskit/theme/constants';

export const ExtendedEditorWrapper = styled.div`
  display: flex;
  flex-grow: 1;

  div.akEditor > div {
    min-height: 0;
  }

  div.akEditor > div:first-child {
    // This is the editor toolbar.
    padding: ${gridSize()}px 0;
    z-index: auto;
  }

  div.fabric-editor-popup-scroll-parent > div > div {
    height: 100%;
    padding: 0;

    > div {
      padding: 0;
    }
  }
`;

export const FormNameArea = styled.input`
  background: transparent;
  border: none;
  color: ${themed({ light: 'black', dark: DN900 })};
  font-family: ${fontFamily()};
  font-size: 2em;
  outline: none;
  padding: 0 0 ${gridSize() * 3}px 0;
  width: 100%;

  &::placeholder {
    color: ${N90};
  }
`;
