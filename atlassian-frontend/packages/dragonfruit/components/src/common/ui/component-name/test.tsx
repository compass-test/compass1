import React from 'react';

import { mount } from 'enzyme';
import { Link } from 'react-resource-router';

import {
  CompassComponent,
  CompassComponentType,
} from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentName } from './main';

const testComponent: CompassComponent = {
  __typename: 'CompassComponent',
  id: '1234',
  type: CompassComponentType.SERVICE,
  name: 'test-component-name',
  changeMetadata: {},
};

const testUrl = 'https://www.atlassian.com/';

describe('ComponentName', () => {
  it('should render ComponentName', async () => {
    const wrapper = mount(
      <CompassTestProvider>
        <ComponentName
          component={testComponent}
          componentDetailsUrl={testUrl}
        />
      </CompassTestProvider>,
    );
    expect(wrapper.find(Link).at(0).props().to).toEqual(
      'https://www.atlassian.com/',
    );
    expect(wrapper.find(Link).at(0).props().children).toEqual(
      'test-component-name',
    );
  });
});
