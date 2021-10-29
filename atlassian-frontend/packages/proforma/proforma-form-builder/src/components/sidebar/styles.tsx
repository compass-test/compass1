import styled from 'styled-components';

import { N30 } from '@atlaskit/theme/colors';

export const SideBarSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: N30,
    borderWidth: '2px',
    borderColor: N30,
    borderRadius: '3px',
  }),
};

export const ModalTitleContainer = styled.span`
  h1,
  h1 > span {
    font-size: 20px;
    font-weight: 500;
    line-height: 1;
  }
`;
