import React, { useState } from 'react';

import { boolean, text } from '@storybook/addon-knobs';

import {
  AnalyticsListener,
  UIAnalyticsEvent,
  withAnalyticsContext,
} from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import { SelectWithoutAnalytics } from '@atlaskit/select/Select';

import withSmarts from '../src';

interface State {
  [key: string]: any;
}

const groupedOptions = [
  {
    label: 'Recent labels',
    options: [
      {
        label: 'new-labels-abound',
        value: 'new-labels-abound',
      },
    ],
  },
  {
    label: 'All labels',
    options: [
      {
        label: 'new-labels-abound',
        value: 'new-labels-abound',
      },
      {
        label: 'new-new-labl',
        value: 'new-new-labl',
      },
      {
        label: 'new-label',
        value: 'new-label',
      },
      {
        label: 'ac',
        value: 'ac',
      },
    ],
  },
];

const Example = () => {
  const [state, setState] = useState<State>({
    alt: true,
    env: 'staging',
    baseUrl: 'https://api-private.stg.atlassian.com',
    containerId: 'project1',
    fieldId: 'location',
    objectId: 'jira-123',
    options: groupedOptions,
    principalId: 'context',
    product: 'jira',
    requiresHashing: true,
    smartRank: true,
    tenantId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5', //pug
    userId: '655363:23cdc6cc-d81e-492d-8fe1-ec56fb8094a4', ////oliver
  });

  //example of passing through onChange
  const onChangeHandler = (payload: any) => {
    console.log('onChange', payload);
  };

  //Wrap our Basic select with smart analytics and pass in any extra context
  const SmartSelect = withAnalyticsContext({
    container: 'mycontainer',
    page: '/example-page',
  })(withSmarts(SelectWithoutAnalytics));

  //knobs for storybook
  const useKnobs = boolean('Use Knobs', false, 'rank');
  const withRerank = boolean('Smart Rank', state.smartRank, 'rank');
  const requiresHashing = boolean(
    'Requires Hashing',
    state.requiresHashing,
    'rank',
  );
  const fieldId = text('FieldId', state.fieldId, 'rank');
  const containerId = text('ContainerId', state.containerId, 'rank');
  const principalId = text('principalId', state.principalId, 'rank');
  const product = text('product', state.product, 'rank');
  const tenantId = text('tenantId', state.tenantId, 'rank');
  const objectId = text('objectId', state.objectId, 'rank');

  const updateOptions = () => {
    setState({
      ...state,
      alt: !state.alt,
      options: state.alt ? groupedOptions : [],
    });
  };

  const onEvent = (e: UIAnalyticsEvent) => {
    console.log(
      `Analytics ${e.payload.attributes.sessionId} ${e.payload.actionSubject} ${e.payload.action} `,
      e.payload,
    );
  };

  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <div
        style={{
          marginBottom: '10px',
        }}
      >
        <Button onClick={updateOptions}>Update options</Button>
      </div>
      <hr />
      <AnalyticsListener onEvent={onEvent} channel="fabric-elements">
        <SmartSelect
          smartContext={{
            baseUrl: state.baseUrl,
            containerId: useKnobs ? containerId : state.containerId,
            fieldId: useKnobs ? fieldId : state.fieldId,
            objectId: useKnobs ? objectId : state.objectId,
            principalId: useKnobs ? principalId : state.principalId,
            product: useKnobs ? product : state.product,
            requiresHashing: useKnobs ? requiresHashing : state.requiresHashing,
            smartRank: useKnobs ? withRerank : state.smartRank,
            tenantId: useKnobs ? tenantId : state.tenantId,
          }}
          isMulti={true}
          options={state.options}
          placeholder="Choose a City"
          onChange={onChangeHandler}
          onMenuOpen={onChangeHandler}
          onMenuClose={onChangeHandler}
        />
      </AnalyticsListener>
    </div>
  );
};

export default Example;
