import React from 'react';

import { render } from '@testing-library/react';

import {
  byLabelText,
  byText,
  findElement,
  pageActions,
  queryElements,
  waitTillPresent,
  waitUntil,
} from '@atlassian/commerce-test-library';

import {
  CountrySelect,
  CurrencyRestrictedCountrySelect,
  CurrencyRestrictedSingleCountrySelect,
  DisplayedCurrenciesCountrySelect,
} from './examples';

const countrySelect = async () =>
  await findElement(byLabelText('country-select'));

describe('Country Field variations', () => {
  test('CountryField is here', async () => {
    render(<CountrySelect />);
    const country = 'Australia';
    await pageActions.select(await countrySelect(), country);
    await waitTillPresent(byText(country));
  });

  test('should validate currency country select', async () => {
    render(<DisplayedCurrenciesCountrySelect />);
    const country = 'Australia (AUD)';

    await pageActions.select(await countrySelect(), country);
    await waitTillPresent(byText(country));
  });

  test('currency country select should display only those countries with currencies matching search text', async () => {
    render(<DisplayedCurrenciesCountrySelect />);
    const currency = 'AUD';

    await pageActions.fillSelectSearch(await countrySelect(), currency);
    const options = queryElements(
      byText(/!aud/i, { selector: `[id*='option']` }),
    );

    await waitUntil(() => expect(options.length).toEqual(0));
    const searchResultsValid =
      options.filter((element) => !element.textContent?.includes(currency))
        .length === 0;
    expect(searchResultsValid).toBeTruthy();
  });

  test('should validate country select is disabled for currency restricted single country select', async () => {
    render(<CurrencyRestrictedSingleCountrySelect />);
    expect(await countrySelect()).toBeDisabled();
  });

  test('validate currency restricted country select warning message', async () => {
    render(<CurrencyRestrictedCountrySelect />);

    await pageActions.fillSelectSearch(await countrySelect(), 'AUD');
    await waitTillPresent(
      byText(/You can only select countries that supports/i),
    );
  });
});
