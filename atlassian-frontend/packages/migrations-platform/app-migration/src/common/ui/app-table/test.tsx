import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import userEvents from '@testing-library/user-event';

import {
  AppTableEmpty,
  AppTableEmptyWithDescription,
  AppTableEmptyWithHomeCta,
  AppTableNormal,
} from './examples';

describe('<AppTable />', () => {
  describe('given the rows is empty', () => {
    it('should render the empty state', () => {
      const renderResult = render(<AppTableEmpty />);

      expect(renderResult.queryByTestId('emptyState')).toBeInTheDocument();
    });

    describe('given the empty state description is provided', () => {
      it('should render the empty state with description', () => {
        const renderResult = render(
          <AppTableEmptyWithDescription emptyDescription="Cooleo" />,
        );

        expect(renderResult.queryByText('Cooleo')).toBeInTheDocument();
      });
    });

    describe('given the home callback is provided', () => {
      it('should render the empty state with home cta button', () => {
        const onHome = jest.fn();
        const renderResult = render(
          <AppTableEmptyWithHomeCta onHome={onHome} />,
        );
        const homeButton = renderResult.getByTestId('homeButton');

        userEvents.click(homeButton);
        expect(onHome).toBeCalledTimes(1);
      });
    });
  });

  describe('given the rows is not empty', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = render(<AppTableNormal />);
    });

    it('should not render the empty state', () => {
      expect(renderResult.queryByTestId('emptyState')).not.toBeInTheDocument();
    });
  });
});
