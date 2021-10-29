import styled from '@emotion/styled';

export const FormSection = styled.section`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;

  text-align: left;

  & > * {
    grid-area: 1/1;
  }
`;
