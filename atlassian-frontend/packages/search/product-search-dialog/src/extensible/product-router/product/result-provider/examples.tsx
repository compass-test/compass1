import React from 'react';
import { IntlProvider } from 'react-intl';

import { withKnobs, select } from '@storybook/addon-knobs';

import { ResultRenderer } from './result-renderer';

import { PRE_QUERY_ITEMS, POST_QUERY_ITEMS } from '../../__mocks__/results';
import { ProductStates } from '../../../product-state-machine/product-state-machine-types';
import { SearchSessionProvider } from '../../../../common/search-session-provider';
import styled from 'styled-components';
import { SearchDialog } from '@atlassian/search-dialog';

export default {
  title: 'Result Renderer',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">
        <SearchSessionProvider sessionKey="">{story()}</SearchSessionProvider>
      </IntlProvider>
    ),
    withKnobs,
  ],
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
};

const defaultProps = {
  preQueryItems: PRE_QUERY_ITEMS,
  postQueryItems: POST_QUERY_ITEMS,
  onRetry: () => null,
  urlGeneratorForNoResultsScreen: () => '',
};

const stateSelectorKnob = () =>
  select(
    'Result Provider State',
    ProductStates,
    ProductStates.PreQuerySuccess,
    'select',
  );

export const DefaultRenderer = () => {
  const state = stateSelectorKnob();

  return (
    <ResultRenderer {...defaultProps} productState={state}></ResultRenderer>
  );
};

const LargeHeader = styled.span`
  display: flex;
  height: 100%;
  padding: 8px;
`;

export const CustomComponents = () => {
  const state = stateSelectorKnob();

  return (
    <SearchDialog>
      <ResultRenderer {...defaultProps} productState={state}>
        {({ productState }) => {
          return {
            Header: () => (
              <LargeHeader>
                I am a custom header in {productState} state
              </LargeHeader>
            ),
            Body: () => <div>I am a custom body in {productState} state</div>,
            Footer: () => (
              <div>I am a custom footer in {productState} state</div>
            ),
          };
        }}
      </ResultRenderer>
    </SearchDialog>
  );
};
