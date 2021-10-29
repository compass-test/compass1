import React, { FC } from 'react';

import styled from 'styled-components';

import { N40 } from '@atlaskit/theme/colors';

type ViewParagraphProps = {
  id: string;
  value?: string;
};

export const ViewParagraph: FC<ViewParagraphProps> = ({ value }) => {
  return <DisabledParagraphPlaceholder>{value}</DisabledParagraphPlaceholder>;
};

const DisabledParagraphPlaceholder = styled.div`
  border-style: dashed;
  border-color: ${N40};
  border-radius: 3px;
  border-width: 2px;
  background-color: white;
  cursor: default;
  padding: 6px;
  min-height: 100px;
  line-height: 1.42857;
`;
