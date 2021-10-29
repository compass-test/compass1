import React from 'react';

import { fireEvent, render, RenderResult } from '@testing-library/react';

import { MockedTenantInfoProvider } from '@atlassian/dragonfruit-tenant-context';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ScorecardHeader from './main';

describe('ScorecardHeader', () => {
  let result: RenderResult;
  let nameField: HTMLElement | null;
  let descriptionField: HTMLElement | null;

  const nameFieldTestId = 'header-test-name-field';
  const descriptionFieldTestId = 'header-test-description-field';

  beforeEach(() => {
    jest.resetAllMocks();

    result = render(
      <MockedTenantInfoProvider>
        <CompassTestProvider locale="en">
          <ScorecardHeader
            name="Click to enter value"
            description="Click to enter description"
            testId="header-test"
          />
        </CompassTestProvider>
      </MockedTenantInfoProvider>,
    );

    nameField = result.getByTestId(nameFieldTestId);
    descriptionField = result.getByTestId(descriptionFieldTestId);
  });

  it('should render the name editor with placeholder value', () => {
    expect(nameField).toBeInTheDocument();
    fireEvent.click(nameField!);
    expect(nameField?.getAttribute('value')).toEqual('Click to enter value');
  });

  it('should render the description editor with placeholder value', () => {
    expect(descriptionField).toBeInTheDocument();
    expect(descriptionField!.innerText).toEqual('Click to enter description');
  });
});
