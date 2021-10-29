import React, { ComponentType, useMemo } from 'react';

import Select, { components, OptionType, ValueType } from '@atlaskit/select';
import { getLinkTo } from '@atlassian/commerce-links';
import { CountryIsoCode, Currency } from '@atlassian/commerce-types';

import { BillingCountry } from '../../../types';

type CurrencyProp = { currency: Currency };

// TODO: add styling
const CurrencyRestrictionSingleCountryWarningDefault: React.FC<CurrencyProp> = ({
  currency,
}) => (
  <div>
    You can not change country as your account currency is {currency}.
    <br />
    To change currency please{' '}
    <a
      aria-label="contact support"
      target="blank"
      href={getLinkTo('support', 'en')}
    >
      contact support
    </a>
  </div>
);

const CurrencyRestrictionWarningDefault: React.FC<CurrencyProp> = ({
  currency,
}) => (
  <span>
    You can only select countries that supports <b>{currency}</b> currency.
    <br />
    To change currency please{' '}
    <a
      aria-label="contact support"
      target="blank"
      href={getLinkTo('support', 'en')}
    >
      contact support
    </a>
  </span>
);

const countryToOption = (
  country: BillingCountry,
  displayCurrency: boolean,
): OptionType => ({
  value: country.isoCode,
  label: displayCurrency
    ? `${country.name} (${country.currency})`
    : country.name,
});

const MenuListWithWarning = (
  currencyRestriction: Currency,
  Warning: ComponentType<CurrencyProp>,
) => ({ children, ...other }: any) => (
  <components.MenuList {...other}>
    <Warning currency={currencyRestriction} />
    {children}
  </components.MenuList>
);

type Props = {
  value?: CountryIsoCode;
  countries: BillingCountry[];
  name?: string;
  onChange: (value: CountryIsoCode | undefined) => void;
  displayCurrency?: boolean;
  isDisabled?: boolean;
  currencyRestriction?: Currency;
  components?: {
    CurrencyRestrictionWarning?: ComponentType<CurrencyProp>;
    CurrencyRestrictionSingleCountryWarning?: ComponentType<CurrencyProp>;
  };
};

export const BillingCountrySelect: React.FC<Props> = ({
  value,
  countries,
  onChange,
  name,
  displayCurrency = false,
  isDisabled,
  currencyRestriction,
  components: {
    CurrencyRestrictionWarning = CurrencyRestrictionWarningDefault,
    CurrencyRestrictionSingleCountryWarning = CurrencyRestrictionSingleCountryWarningDefault,
  } = {},
}) => {
  const allowedCountriesOptions = useMemo(
    () =>
      (currencyRestriction
        ? countries.filter(
            (country) => country.currency === currencyRestriction,
          )
        : countries
      ).map((country) => countryToOption(country, displayCurrency)),
    [currencyRestriction, countries, displayCurrency],
  );

  // As react-select doesn't support providing just values, we need to map them to options
  // https://github.com/JedWatson/react-select/issues/2920
  const option = useMemo(
    () =>
      allowedCountriesOptions.length === 1
        ? allowedCountriesOptions[0]
        : allowedCountriesOptions.find((it) => it.value === value),
    [allowedCountriesOptions, value],
  );

  const singleCountry = allowedCountriesOptions.length === 1;

  return (
    <>
      <Select<OptionType>
        name={name}
        value={option}
        isDisabled={singleCountry || isDisabled}
        components={
          currencyRestriction
            ? {
                MenuList: MenuListWithWarning(
                  currencyRestriction,
                  CurrencyRestrictionWarning,
                ),
              }
            : {}
        }
        aria-label="country-select"
        isClearable={false}
        isMulti={false}
        options={allowedCountriesOptions}
        onChange={(opt: ValueType<OptionType>) =>
          onChange((opt as OptionType)?.value as CountryIsoCode)
        }
      />
      {singleCountry && currencyRestriction && (
        <CurrencyRestrictionSingleCountryWarning
          currency={currencyRestriction}
        />
      )}
    </>
  );
};
