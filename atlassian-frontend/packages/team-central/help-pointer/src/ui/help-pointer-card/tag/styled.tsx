import styled from '@emotion/styled';

export const TagContentWrapper = styled.div<{ elemBeforeExists: boolean }>`
  margin-left: ${(props) => (props.elemBeforeExists ? '18px' : undefined)};
  padding: 2px 4px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;

export const TagWrapper = styled.div`
  cursor: pointer;
`;
