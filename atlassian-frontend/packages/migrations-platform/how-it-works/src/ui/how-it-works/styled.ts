import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

import lineImg from '../../assets/line.png';

const fontSize = 12;

export const StepList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: ${gridSize() * 6}px 0;
  width: 900px;
`;

const StepBase = styled.li`
  width: 150px;
  position: relative;
  list-style-type: none;
  background-position: center top;
  text-align: center;
  font-size: ${fontSize}px;

  &::before {
    content: '';
    display: block;
    height: 150px;
    width: 100%;
    background-repeat: no-repeat;
  }

  &:not(:last-of-type) {
    &::after {
      content: '';
      display: block;
      background: url(${lineImg}) no-repeat center;
      background-size: contain;
      width: 28px;
      height: ${gridSize()}px;

      position: absolute;
      top: 75px;
      right: -32px;
    }
  }
`;

export const StepTitle = styled.h5`
  font-size: ${fontSize}px;
  margin-bottom: ${gridSize()}px;
`;

export const Step = styled(StepBase)<{ img: string }>`
  &::before {
    background-image: url(${(props) => props.img});
  }
`;
