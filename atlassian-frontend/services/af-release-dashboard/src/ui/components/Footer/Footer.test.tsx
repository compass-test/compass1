import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from './index';
import * as Constants from '../../../server/constants';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('Footer', () => {
  it('should show help text', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Maintained by')).not.toBeNull();
  });
  it('should have a link to the slack channel', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('#team-twp-editor').href).toBe(
      'https://atlassian.slack.com/archives/CFKURAWVC',
    );
  });
  describe('Environment label', () => {
    it('should show localhost label if site is running locally', () => {
      const history = createMemoryHistory();
      jest
        .spyOn(Constants, 'getEnvironment')
        .mockReturnValue(Constants.ENVIRONMENT.LOCALHOST);
      const { getByText } = render(
        <Router history={history}>
          <Footer />
        </Router>,
      );
      expect(getByText('env: localhost')).not.toBeNull();
    });

    it('should show staging label if staging site', () => {
      const history = createMemoryHistory();
      jest
        .spyOn(Constants, 'getEnvironment')
        .mockReturnValue(Constants.ENVIRONMENT.STAGING);
      const { getByText } = render(
        <Router history={history}>
          <Footer />
        </Router>,
      );
      expect(getByText('env: staging')).not.toBeNull();
    });

    it('should show no label if production', () => {
      const history = createMemoryHistory();
      jest
        .spyOn(Constants, 'getEnvironment')
        .mockReturnValue(Constants.ENVIRONMENT.PROD);
      const { queryByText } = render(
        <Router history={history}>
          <Footer />
        </Router>,
      );
      expect(queryByText('env: localhost')).toBeNull();
    });
  });
});
