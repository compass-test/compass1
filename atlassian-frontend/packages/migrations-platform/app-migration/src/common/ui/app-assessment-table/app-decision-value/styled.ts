import styled from 'styled-components';

import { N700 } from '@atlaskit/theme/colors';
import { borderRadius } from '@atlaskit/theme/constants';

export const Wrapper = styled.div`
  min-width: 185px; /* Avoid ellipsis for button text */
`;

export const ButtonWrapper = styled.div`
  border: 1px solid ${N700};
  border-radius: ${borderRadius() + 1}px;
  background-color: white;

  button,
  /* Combining hover styles as they get overriden by default hover styles */
  button:hover {
    text-align: left;
    padding-right: 0; /* Reduce iconAfter padding */
  }
`;
