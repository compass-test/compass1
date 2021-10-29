import React from 'react';

import styled from 'styled-components';

interface PrescribedValueProps {
  value: string;
}

/**
 * Renders a value in a similar way to a dropdown, except without the dropdown component.
 * Use this to match UI where the choice is prescribed with UI where users can make a choice.
 */
export const PrescribedValue: React.FunctionComponent<PrescribedValueProps> = props => {
  const { value } = props;
  return (
    <OuterDiv>
      <InnerDiv>{value}</InnerDiv>
    </OuterDiv>
  );
};

const OuterDiv = styled.div`
  background-color: #EBECF0;
  border-color: #EBECF0;
  border-radius: 3px;
  border-style: solid;
  border-width: 2px;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 2;
  justify-content: space-between;
  min-height: 40px;
  position: relative;
  box-sizing: border-box;
}
`;

const InnerDiv = styled.div`
  align-items: center;
  flex: 1;
  padding: 8px 8px 8px 10px;
  overflow: hidden;
}
`;
