import styled from 'styled-components';

export const FormContainer = styled.div`
  // Since the form is passed into <EmptyState> as a tertiary action (which has 'text-align: center'),
  // we need to override the text-align to ensure the form label is positioned correctly
  text-align: left;
`;
