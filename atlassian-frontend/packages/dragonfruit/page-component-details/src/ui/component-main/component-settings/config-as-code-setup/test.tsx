import React from 'react';

import { render } from '@testing-library/react';

import { CONFIG_AS_CODE_FILE_NAME } from '@atlassian/dragonfruit-external-component-management/constants';
import {
  CompassComponentDetailViewFragment,
  CompassComponentType,
} from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ConfigAsCodeSetup from './index';

const baseComponent: CompassComponentDetailViewFragment = {
  name: 'TestName',
  id:
    'ari:cloud:compass:4958bb5d-3970-4a13-bebc-62bbca57f370:component/5ce8c075-7b72-4455-9be9-7f0a1c6e6db4/a60d9b0f-fa86-436c-b3c2-0eece8e94fdb',
  type: CompassComponentType.SERVICE,
};

describe('ConfigAsCodeSetup', () => {
  test('renders successfully', () => {
    const wrapper = render(
      <CompassTestProvider>
        <ConfigAsCodeSetup component={baseComponent} />
      </CompassTestProvider>,
    );

    expect(wrapper.getAllByText(CONFIG_AS_CODE_FILE_NAME)[0]).toBeDefined();
  });
});
