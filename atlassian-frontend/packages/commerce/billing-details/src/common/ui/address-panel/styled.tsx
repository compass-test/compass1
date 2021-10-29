import styled from '@emotion/styled';

export const Empty = styled.span`
  font-style: italic;
  &::before {
    content: '<';
  }
  &::after {
    content: '>';
  }
`;

export const Address = styled.address`
  font-style: normal;
  span + span {
    &::before {
      content: ', ';
    }
  }
`;
