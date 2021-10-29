import React from 'react';

import { render } from '@testing-library/react';

import {
  AppStatusValueError,
  AppStatusValueIsLoading,
  AppStatusValueNoopError,
  AppStatusValueNoopSuccess,
  AppStatusValueSuccess,
} from './examples';

describe('<AppStatusValue />', () => {
  describe('given the component is loading', () => {
    it('should show the loading view', () => {
      const { queryByLabelText } = render(<AppStatusValueIsLoading />);

      expect(queryByLabelText('Loading…')).toBeInTheDocument();
    });
  });

  describe('given a success appearance', () => {
    it('should show the success status', () => {
      const { queryByLabelText } = render(<AppStatusValueSuccess />);

      expect(queryByLabelText('Success')).toBeInTheDocument();
    });
  });

  describe('given a error appearance', () => {
    it('should show the error status', () => {
      const { queryByLabelText } = render(<AppStatusValueError />);

      expect(queryByLabelText('Error')).toBeInTheDocument();
    });
  });

  describe('given a noop success appearance', () => {
    it('should show the noop success status', () => {
      const { queryByLabelText } = render(<AppStatusValueNoopSuccess />);

      expect(
        queryByLabelText('Success without any further action'),
      ).toBeInTheDocument();
    });
  });

  describe('given a noop error appearance', () => {
    it('should show the noop error status', () => {
      const { queryByLabelText } = render(<AppStatusValueNoopError />);

      expect(queryByLabelText('The status is ignored')).toBeInTheDocument();
    });
  });
});
