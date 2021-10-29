import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PlanSelectionTableBase } from './examples';

// Tests don't currently work, looks like this might be because
// the component has a useEffect that updates state and is triggered asynchronously.
// Would need async act to fix this, per https://github.com/facebook/react/issues/15379
// which isn't available in current React version
describe.skip('<PlanSelectionTable />', () => {
  it('should select plans on current page correctly when nothing selected', () => {
    const plansProvider = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        plans: [
          { id: 1, name: 'A', link: '/some-url/1' },
          { id: 2, name: 'B', link: '/some-url/2' },
          { id: 3, name: 'C', link: '/some-url/3' },
        ],
        totalNumberOfPlans: 10,
      });
    });
    const onSelectedPlansChanged = jest.fn();

    const { getByTestId } = render(
      <PlanSelectionTableBase
        selectedPlans={[]}
        plansProvider={plansProvider}
        onSelectedPlansChanged={onSelectedPlansChanged}
      />,
    );

    expect(
      getByTestId('checkbox-select-all-in-current-page--checkbox-label'),
    ).toBeInTheDocument();

    const selectAllInPageCheckbox = getByTestId(
      'checkbox-select-all-in-current-page--checkbox-label',
    );

    act(() => {
      userEvent.click(selectAllInPageCheckbox);
    });

    expect(onSelectedPlansChanged).toBeCalledWith([
      { id: 1, name: 'A', link: '/some-url/1' },
      { id: 2, name: 'B', link: '/some-url/2' },
      { id: 3, name: 'C', link: '/some-url/3' },
    ]);
  });

  it('should select plans on current page correctly when some on current page and other pages already selected', () => {
    const plansProvider = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        plans: [
          { id: 1, name: 'A', link: '/some-url/1' },
          { id: 2, name: 'B', link: '/some-url/2' },
          { id: 3, name: 'C', link: '/some-url/3' },
        ],
        totalNumberOfPlans: 10,
      });
    });
    const onSelectedPlansChanged = jest.fn();

    const { getByTestId } = render(
      <PlanSelectionTableBase
        selectedPlans={[
          { id: 2, name: 'B', link: '/some-url/2' },
          { id: 4, name: 'D', link: '/some-url/4' },
        ]}
        plansProvider={plansProvider}
        onSelectedPlansChanged={onSelectedPlansChanged}
      />,
    );

    expect(
      getByTestId('checkbox-select-all-in-current-page--checkbox-label'),
    ).toBeInTheDocument();

    const selectAllInPageCheckbox = getByTestId(
      'checkbox-select-all-in-current-page--checkbox-label',
    );

    act(() => {
      userEvent.click(selectAllInPageCheckbox);
    });

    expect(onSelectedPlansChanged).toBeCalledWith([
      { id: 2, name: 'B', link: '/some-url/2' },
      { id: 4, name: 'D', link: '/some-url/4' },
      { id: 1, name: 'A', link: '/some-url/1' },
      { id: 3, name: 'C', link: '/some-url/3' },
    ]);
  });

  it('should show a link to the plan', () => {
    const plansProvider = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        plans: [
          { id: 1, name: 'My amazing plan', link: '/some-url/1' },
          { id: 2, name: 'Plan B', link: '/some-url/2' },
          { id: 3, name: 'Antoher plan', link: '/some-url/3' },
        ],
        totalNumberOfPlans: 10,
      });
    });
    const onSelectedPlansChanged = jest.fn();

    const { getByText } = render(
      <PlanSelectionTableBase
        selectedPlans={[]}
        plansProvider={plansProvider}
        onSelectedPlansChanged={onSelectedPlansChanged}
      />,
    );

    const planLink = getByText('My amazing plan').closest('a');
    expect(planLink).toBeInTheDocument();
    expect(planLink).toHaveAttribute('href', '/some-url/1');
  });
});
