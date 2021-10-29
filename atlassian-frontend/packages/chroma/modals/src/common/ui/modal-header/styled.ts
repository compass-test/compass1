import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { N0 } from '@atlaskit/theme/colors';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { h700 } from '@atlaskit/theme/typography';

export const CloseButton = styled.button`
  @media all and (max-height: 560px) {
    span {
      color: ${colors.N0};
    }
  }
  top: 10px;
  right: 5px;
  position: absolute;
  background-color: transparent;
  text-decoration: none;
  border: none;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

export const Placeholder = styled.div`
  height: 220px;
  background: lightgrey;
`;

export const Root = styled.div`
  position: relative;
`;

export const Capitalized = styled.span`
  text-transform: capitalize;
`;

export const ModalHeaderStyling = styled.div`
  max-width: 700px;
  box-sizing: border-box;
  min-height: 220px;
  background: linear-gradient(180deg, #0065ff 0%, #0747a6 100%);
  background-size: 100% 80%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0 40px;
  text-align: center;
  background-color: white;
  @media (min-width: 800px) {
    justify-content: space-between;
    text-align: left;
  }
`;

export const ModalHeaderImage = styled.img<{ centered: boolean }>`
  align-self: stretch;
  margin: ${props => (props.centered ? '0 auto' : '0')};
  width: 216px;
  max-height: 220px;
  object-fit: contain;
  margin-top: 35px;
`;

export const Heading = styled.h1`
  ${h700()};
  & > span {
    color: ${N0};
  }
`;

export const Subheading = styled.p`
  color: ${N0};
  width: 320px;
  font-size: 16px;
`;

export const ModalHeaderText = styled.div`
  margin-top: 40px;
  width: 60%;
`;
