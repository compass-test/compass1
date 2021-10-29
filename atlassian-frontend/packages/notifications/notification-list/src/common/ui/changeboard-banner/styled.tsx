import styled from '@emotion/styled';

export const ChangeBoardContainer = styled.div<{ hide: boolean }>`
  margin-bottom: ${({ hide }) => (hide ? '0px' : '14px')};
  overflow: hidden;
  max-height: ${({ hide }) => (hide ? '0px' : '600px')};
  transition: max-height 0.5s, padding-bottom 0.5s, margin-top 0.5s;
`;

export const LearnMoreLink = styled.a`
  font-weight: 500;
`;
