import React from 'react';

import { render } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { TeamCreateComponent } from './index';

describe('TeamCreateComponent', () => {
  const testId = 'dragonfruit.teams.team-create-component-button';
  it('should be found by data-testid', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <TeamCreateComponent
          formShown={false}
          emptyState={false}
          formKey={0}
          onCancel={jest.fn()}
          onSuccess={jest.fn()}
          setFormShown={jest.fn()}
          teamId="fake-team"
        />
      </CompassTestProvider>,
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
