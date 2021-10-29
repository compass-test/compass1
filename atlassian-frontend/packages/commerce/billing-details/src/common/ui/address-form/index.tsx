import React, { ReactNode, useCallback } from 'react';

import TextField from '@atlaskit/textfield';
import { useCommerceFetch } from '@atlassian/commerce-environment';
import {
  FieldContainer,
  Form,
  useField,
  useForm,
} from '@atlassian/commerce-final-form';
import {
  FetchServiceResult,
  useFetchService,
} from '@atlassian/commerce-service-hook';
import { CountryIsoCode } from '@atlassian/commerce-types';

import {
  AddressFieldErrorMessages,
  AddressFieldsModified,
  AddressFormValues,
  BillingCountry,
  BillingCountryState,
  BillingCountryStateLookup,
  ValuesMutator,
} from '../../types';
import { fetchBillingCountryStates } from '../../utils/billing-country-states';
import { ValidationError } from '../../utils/validation-errors';
import { UnexpectedErrorLayout } from '../form-error-message';

import { AddressField } from './address-field';
import { BillingCountrySelect } from './billing-country-select';
import { BillingCountryStateSelect } from './billing-country-state-select';
import { TaxFieldLabel } from './tax-id-label';
import {
  formValueMutator,
  formValuesMutator,
  useTaxLabelLocationObject,
} from './utils';

export { BillingCountrySelect } from './billing-country-select';

type BillingDetailsFieldsLayoutProps = {
  readOnly?: boolean;
  countries: BillingCountry[];
  countryStates: BillingCountryState[];
  onCountrySelect: (value: CountryIsoCode | undefined) => void;
  areCountryStatesLoading: boolean;
};

const AddressFieldsLayout: React.FC<BillingDetailsFieldsLayoutProps> = ({
  readOnly,
  countries,
  onCountrySelect,
  countryStates,
  areCountryStatesLoading,
}) => {
  const { countryObject, stateObject } = useTaxLabelLocationObject(
    countries,
    countryStates,
  );
  return (
    <>
      <AddressField name="organization" label="Company name" required>
        {(fieldProps) => <TextField {...fieldProps} isDisabled={readOnly} />}
      </AddressField>
      <AddressField name="country" label="Country" required>
        {(fieldProps) => (
          <div data-testid="commerce-billing-details.src.ui.from.country-field">
            <BillingCountrySelect
              {...fieldProps}
              isDisabled={readOnly}
              countries={countries}
              onChange={(value) => {
                onCountrySelect(value);
                fieldProps.onChange(value!);
              }}
            />
          </div>
        )}
      </AddressField>
      <AddressField name="address-level2" label="City" required>
        {(fieldProps) => <TextField {...fieldProps} isDisabled={readOnly} />}
      </AddressField>
      <AddressField name="address-line1" label="Address 1" required>
        {(fieldProps) => <TextField {...fieldProps} isDisabled={readOnly} />}
      </AddressField>
      <AddressField name="address-line2" label="Address 2">
        {(fieldProps) => <TextField {...fieldProps} isDisabled={readOnly} />}
      </AddressField>
      <AddressField name="address-level1" label="State" required>
        {(fieldProps) => (
          <div
            data-testid={`commerce-billing-details.src.ui.from.state-field--${
              areCountryStatesLoading ? 'loading' : 'complete'
            }`}
          >
            <BillingCountryStateSelect
              {...fieldProps}
              disabled={Boolean(readOnly)}
              onChange={(countryState) => {
                fieldProps.onChange(countryState);
              }}
              countryStates={countryStates}
              loading={areCountryStatesLoading}
            />
          </div>
        )}
      </AddressField>
      <AddressField name="postal-code" label="Postal code" required>
        {(fieldProps) => <TextField {...fieldProps} isDisabled={readOnly} />}
      </AddressField>
      <AddressField
        name="tax-id"
        label={<TaxFieldLabel country={countryObject} state={stateObject} />}
      >
        {(fieldProps) => <TextField {...fieldProps} isDisabled={readOnly} />}
      </AddressField>
    </>
  );
};

const useBillingCountryStatesService = (
  country: CountryIsoCode | undefined,
  countryStates?: BillingCountryStateLookup,
): FetchServiceResult<BillingCountryState[]> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(async () => {
      if (country === undefined || country === null) {
        return Promise.resolve([]);
      }
      const cache = countryStates || {}; // throw away cache
      const cached = cache[country];
      if (cached) {
        return cached;
      }
      const newValue = await fetchBillingCountryStates(fetch, country);
      cache[country] = newValue;

      return newValue;
    }, [fetch, country, countryStates]),
  );
};

type AddressFieldsProps = {
  readOnly?: boolean;
  countries: BillingCountry[];
  sharedCountryStates: BillingCountryStateLookup;
};

export const AddressFieldsList: React.FC<AddressFieldsProps> = ({
  countries,
  sharedCountryStates,
  readOnly,
}) => {
  const {
    mutators: { formValueMutator },
  } = useForm();
  const {
    input: { value: countryValue },
  } = useField('country');

  const {
    loading: countryStatesLoading,
    error: countryStatesError,
  } = useBillingCountryStatesService(
    countryValue || undefined,
    sharedCountryStates,
  );

  if (countryStatesError) {
    // To be fixed in https://hello.atlassian.net/browse/TNTEXP-161
    return <UnexpectedErrorLayout />;
  }

  return (
    <FieldContainer>
      <AddressFieldsLayout
        readOnly={readOnly}
        countries={countries}
        onCountrySelect={() => {
          // Clear the state field value via formValueMutator ---
          formValueMutator('address-level1', '');
        }}
        countryStates={
          (sharedCountryStates && sharedCountryStates[countryValue]) || []
        }
        areCountryStatesLoading={countryStatesLoading}
      />
    </FieldContainer>
  );
};

export const AddressFields: React.FC<AddressFieldsProps> = ({
  readOnly,
  countries,
  sharedCountryStates,
}) => (
  <AddressFieldsList
    readOnly={readOnly}
    countries={countries}
    sharedCountryStates={sharedCountryStates}
  />
);
type AddressFormSubmitHandler = (
  data: AddressFormValues,
  meta: { fieldsModified: AddressFieldsModified },
) =>
  | void
  | AddressFieldErrorMessages
  | Promise<AddressFieldErrorMessages | void>;

export const AddressFormFrame: React.FC<{
  onSubmit: AddressFormSubmitHandler;
  children: ReactNode;
  initialValues?: Partial<AddressFormValues>;
  mutators?: Record<string, ValuesMutator>;
}> = ({ onSubmit, children, initialValues, mutators }) => (
  <Form<AddressFormValues>
    mutators={{ ...mutators, formValuesMutator, formValueMutator }}
    initialValues={initialValues}
    onSubmit={async (values: AddressFormValues, form: any) => {
      const { dirtyFields } = form.getState();
      try {
        return await onSubmit(values as AddressFormValues, {
          fieldsModified: dirtyFields,
        });
      } catch (err) {
        if (err instanceof ValidationError) {
          return err.fieldMessages;
        }
      }
    }}
    render={({
      handleSubmit,
    }: {
      handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
    }) => (
      <form onSubmit={handleSubmit} noValidate>
        {children}
      </form>
    )}
  />
);
