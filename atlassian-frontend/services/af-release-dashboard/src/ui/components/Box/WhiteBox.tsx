import styled from 'styled-components';

export const WhiteBox = styled.div`
  margin: 0.2rem;
  padding: 0.5rem;
  border-radius: 0.4rem;
  border: 1px solid #ebecf0;
  background: white;
  min-width: 0; // Makes text-overflow ellipsis work
  position: relative;
`;
