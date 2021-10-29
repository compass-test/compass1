import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Icon = styled.span`
  flex-shrink: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  user-select: none;
`;
