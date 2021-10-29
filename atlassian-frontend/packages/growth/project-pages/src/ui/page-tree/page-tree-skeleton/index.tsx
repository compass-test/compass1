import React from 'react';
import styled from 'styled-components';
import { N20, N40 } from '@atlaskit/theme/colors';
import { gridSize, borderRadius } from '@atlaskit/theme/constants';

const Rectangle = styled.div`
  width: 100%;
  height: calc(100% - ${gridSize() * 2}px);
  border-radius: ${borderRadius()}px;
  background-color: ${N20};
`;

const Circle = styled.div`
  height: ${gridSize() * 4}px;
  width: ${gridSize() * 4}px;
  border-radius: 50%;
  background-color: ${N20};
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 40% auto 20%;
  width: 100%;
  border-top: 1px solid ${N40};
  padding: ${gridSize()}px 0;
  justify-content: space-between;
  align-items: center;
`;

export const PageTreeSkeleton = () => {
  return (
    <Wrapper>
      {Array.from(Array(6), (_, index) => (
        <Row key={index}>
          <Rectangle />
          <Circle />
          <Rectangle />
        </Row>
      ))}
    </Wrapper>
  );
};
