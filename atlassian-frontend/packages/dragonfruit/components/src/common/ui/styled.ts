import styled from 'styled-components';

import { N500 } from '@atlaskit/theme/colors';

export const AddLinkButton = styled.a`
  &,
  &:hover {
    color: ${N500};
  }

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const EditInExternalSourceLink = styled.a`
  &,
  &:hover {
    color: ${N500};
  }

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
