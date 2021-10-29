import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { appList } from '../../../../common/mocks';
import AppDataMigrationConsent from '../../AppDataMigrationConsent';

describe('AppDataMigrationConsent', () => {
  it('Should have the buttons be called correctly', () => {
    const onRemoveFn = jest.fn();
    const { getAllByRole } = render(
      <IntlProvider locale="en">
        <AppDataMigrationConsent
          consentUrl="https://www.google.com"
          onRemoveApps={onRemoveFn}
          listOfOccurrences={[]}
        />
      </IntlProvider>,
    );
    const buttons = getAllByRole('button');

    const onRemoveButton = buttons[0];
    userEvent.click(onRemoveButton);
    expect(onRemoveFn).toHaveBeenCalledTimes(1);
  });

  it('Should render a list of apps', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <AppDataMigrationConsent
          consentUrl="https://www.google.com"
          onRemoveApps={jest.fn()}
          listOfOccurrences={appList}
        />
      </IntlProvider>,
    );
    const listItems = container.querySelectorAll('td');
    expect(listItems.length).toEqual(appList.length);
    expect(listItems[0].textContent).toBe(appList[0].name);
    expect(listItems[1].textContent).toBe(appList[1].name);
  });

  it('should have the consent link rendered', () => {
    const href = 'https://www.google.com/';
    const { container } = render(
      <IntlProvider locale="en">
        <AppDataMigrationConsent
          consentUrl={href}
          onRemoveApps={jest.fn()}
          listOfOccurrences={appList}
        />
      </IntlProvider>,
    );
    const link = container.querySelector('a');
    expect(link?.href).toBe(href);
  });
});
