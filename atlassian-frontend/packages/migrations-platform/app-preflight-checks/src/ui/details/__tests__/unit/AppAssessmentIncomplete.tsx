import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import AppAssessmentIncomplete from '../../AppAssessmentIncomplete';

describe('AppsNotInstalledOnCloud', () => {
  it('should have the app assessment link rendered', () => {
    const href = 'https://www.google.com/';
    const { container } = render(
      <IntlProvider locale="en">
        <AppAssessmentIncomplete appAssessmentUrl={href} />
      </IntlProvider>,
    );
    const link = container.querySelector('a');
    expect(link?.href).toBe(href);
  });
});
