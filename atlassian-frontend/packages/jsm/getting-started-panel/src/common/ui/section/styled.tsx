import styled from 'styled-components';
import { N800 } from '@atlaskit/theme/colors';

export const Scrollable = styled.div`
  /* Expand to fill the available height and scroll if the content doesn't fit */
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
`;

export const TabContainerWrapper = styled.div`
  box-sizing: content-box;
  width: 288px;

  padding: 20px 16px 0px;

  /* Increases the padding between cards */
  & > * {
    margin: 12px 0;

    /* Resets sharp borders coming from @atlassiansox/checklist */
    border-radius: 4px;
  }

  /* Reduces the font size of the card titles */
  h4 {
    font-weight: 500;
    font-size: 14px;
  }

  /* Use semi-bold for card text referring to UI elements */
  strong {
    font-weight: 500;
  }
`;

export const DescriptionWrapper = styled.p`
  margin: 0 4px 20px;
  font-size: 12px;
  color: ${N800};
`;
