import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Textfield from '@atlaskit/textfield';

type ViewOtherOptionProps = {
  dropdown: boolean;
  display: boolean;
  value?: string;
};

export const ViewOtherOption = injectIntl(
  ({ dropdown, display, value }: ViewOtherOptionProps & InjectedIntlProps) => {
    if (!display) {
      return <></>;
    }
    const TextWrapper = dropdown
      ? OptionalTextDisabledWrapperDropdown
      : OptionalTextDisabledWrapper;
    return (
      <TextWrapper>
        <Textfield value={value} width="small" isDisabled />
      </TextWrapper>
    );
  },
);

const OptionalTextDisabledWrapper = styled.div`
  margin-left: 28px;
  > div {
    background-color: white;
    cursor: default;
    color: #172b4d !important;
  }
`;

const OptionalTextDisabledWrapperDropdown = styled.div`
  margin-top: 5px;
  > div {
    background-color: white;
    cursor: default;
    color: #172b4d !important;
  }
`;
