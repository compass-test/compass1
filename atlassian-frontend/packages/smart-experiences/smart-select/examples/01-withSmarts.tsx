import React, { useState } from 'react';

import { boolean, text } from '@storybook/addon-knobs';

import {
  AnalyticsListener,
  withAnalyticsContext,
} from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import Select, { SelectWithoutAnalytics } from '@atlaskit/select/Select';
import Textfield from '@atlaskit/textfield';

import withSmarts from '../src';

//Wrap our Basic select with smart analytics and pass in any extra context
const SmartSelect = withAnalyticsContext({
  container: 'mycontainer',
  page: '/example-page',
})(withSmarts(SelectWithoutAnalytics));

interface State {
  [key: string]: any;
}

const Example = () => {
  const options1 = [
    { label: 'Adelaide', value: 'adelaide' },
    { label: 'Brisbane', value: 'brisbane' },
    { label: 'Canberra', value: 'canberra' },
    { label: 'Darwin', value: 'darwin' },
    { label: 'Hobart', value: 'hobart' },
    { label: 'Melbourne', value: 'melbourne' },
    { label: 'Perth', value: 'perth' },
    { label: 'Sydney', value: 'sydney' },
  ];

  const options2 = [
    { label: 'London', value: 'london' },
    { label: 'Manchester', value: 'manchester' },
    { label: 'Liverpool', value: 'liverpool' },
    { label: 'Chelmsford', value: 'chelmsford' },
    { label: 'Southampton', value: 'southampton' },
    { label: 'Portsmouth', value: 'portsmouth' },
    { label: 'Devon', value: 'devon' },
    { label: 'Southend', value: 'southend' },
  ];
  const [state, setState] = useState<State>({
    alt: true,
    env: 'staging',
    baseUrl: 'https://api-private.stg.atlassian.com',
    containerId: 'project1',
    fieldId: 'location',
    objectId: 'jira-123',
    options: options1,
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

  // apply a delayed options callback to simulate a search
  const onInputChangeHandler = () => {
    setTimeout(() => {
      const newSortedOptions = options1.sort(() => Math.random() - 0.5);
      setState({
        ...state,
        options: newSortedOptions,
      });
    }, 1000);
  };

  const products = [
    { label: 'Jira', value: 'jira' },
    { label: 'Confluence', value: 'confluence' },
    { label: 'People', value: 'people' },
    { label: 'Bitbucket', value: 'bitbucket' },
  ];
  const productsMap = products
    .map((p) => ({ [p.value]: p }))
    .reduce((acc, val) => ({ ...acc, ...val }), {});

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

  const createBoolean = (id: string, label: string) => {
    return (
      <div
        style={{
          marginBottom: '10px',
        }}
      >
        <input
          checked={Boolean(state[id] as boolean)}
          id={id}
          onChange={() =>
            setState({
              ...state,
              [id]: !state[id],
            })
          }
          type="checkbox"
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  };
  const createText = (id: string, width: 'large' | 'medium', label: string) => {
    return (
      <div
        style={{
          marginBottom: '10px',
        }}
      >
        <label htmlFor={id}>{label}</label>
        <Textfield
          width={width}
          name={id}
          value={(state[id] as string) || ''}
          onChange={(e: any) => {
            // @ts-ignore
            setState({
              ...state,
              [id]: e.currentTarget.value,
            });
          }}
        />
      </div>
    );
  };

  const updateOptions = () => {
    setState({
      ...state,
      alt: !state.alt,
      options: state.alt ? options2 : options1,
    });
  };

  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <h2>Props</h2>
      <hr />
      <label htmlFor="product">Product</label>
      <Select
        width="medium"
        onChange={(selectedValue) => {
          if (selectedValue) {
            setState({
              ...state,
              // @ts-ignore
              product: selectedValue.value,
            });
          }
        }}
        value={productsMap[state.product]}
        className="single-select"
        classNamePrefix="react-select"
        options={products}
        placeholder="Choose a Product"
      />
      {createText('baseUrl', 'large', 'Base URL')}
      {createText('containerId', 'large', 'Container Id')}
      {createText('fieldId', 'large', 'Field Id')}
      {createText('objectId', 'large', 'Object Id')}
      {createText('principalId', 'large', 'Principal Id')}
      {createText('tenantId', 'large', 'Tenant Id')}
      {createBoolean('smartRank', 'Enable Smart Rank')}
      {createBoolean('requiresHashing', 'Requires hashing')}
      <div
        style={{
          marginBottom: '10px',
        }}
      >
        <Button onClick={updateOptions}>Update options</Button>
      </div>
      <hr />
      <AnalyticsListener
        onEvent={(e) => console.log(e.payload)}
        channel="fabric-elements"
      >
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
          creatable
          isMulti={true}
          options={state.options}
          placeholder="Choose a City"
          onChange={onChangeHandler}
          onMenuOpen={onChangeHandler}
          onMenuClose={onChangeHandler}
          onInputChange={onInputChangeHandler}
        />
      </AnalyticsListener>
    </div>
  );
};

export default Example;
