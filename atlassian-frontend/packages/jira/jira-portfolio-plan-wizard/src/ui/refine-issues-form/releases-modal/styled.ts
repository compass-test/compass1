import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';

// Copied from @atlaskit/inline-dialog ModalBody, there are some typing problems with styled(ModalBody)
export const ModalBodyContainer = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;

  @media (min-width: 320px) and (max-width: 508px) {
    overflow-y: auto;
    height: 100%;
  }

  &:focus {
    outline-offset: -1px;
    outline-style: dotted;
    outline-color: ${colors.N800};
    outline-width: thin;
  }
`;

export const ModalContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  flex: 1 1 auto;
`;
