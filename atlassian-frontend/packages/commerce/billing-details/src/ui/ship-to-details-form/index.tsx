import React, { FC, ReactNode, useState } from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import { FieldContainer, useForm } from '@atlassian/commerce-final-form';

import {
  AddressFieldErrorMessages,
  BillingCountry,
  BillingCountryStateLookup,
  BillingDetails,
  ShipToDetails,
} from '../../common/types';
import {
  AddressFieldsList,
  AddressFormFrame,
} from '../../common/ui/address-form';
import { anyFieldModified } from '../../common/utils';

import {
  mapFromFormToShipToDetails,
  mapFromShipToDetailsToForm,
} from './utils';

type ShipToDetailsType = {
  countries: BillingCountry[];
  sharedCountryStates: BillingCountryStateLookup;
  billingDetails?: BillingDetails;
};

export const ShipToDetailsFieldsList: FC<ShipToDetailsType> = ({
  countries,
  sharedCountryStates,
  billingDetails,
}) => {
  const {
    mutators: { formValuesMutator },
    getState,
  } = useForm();
  const { initialValues } = getState();
  const [copyBillingAdressChecked, setCopyBillingAdressChecked] = useState(
    false,
  );
  const mappedBillingDetails = billingDetails
    ? mapFromShipToDetailsToForm(billingDetails)
    : undefined;

  return (
    <>
      <AddressFieldsList
        readOnly={copyBillingAdressChecked}
        countries={countries}
        sharedCountryStates={sharedCountryStates}
      />
      {Boolean(billingDetails) && (
        <Checkbox
          isChecked={copyBillingAdressChecked}
          testId="commerce.billing-details.ship-to-details-form.checkbox"
          onClick={() => {
            setCopyBillingAdressChecked(!copyBillingAdressChecked);
            copyBillingAdressChecked
              ? formValuesMutator(initialValues)
              : formValuesMutator(mappedBillingDetails);
          }}
          label="Use billing address"
        />
      )}
    </>
  );
};
export const ShipToDetailsFields: FC<ShipToDetailsType> = ({
  countries,
  sharedCountryStates,
  billingDetails,
}) => (
  <FieldContainer>
    <ShipToDetailsFieldsList
      billingDetails={billingDetails}
      countries={countries}
      sharedCountryStates={sharedCountryStates}
    />
  </FieldContainer>
);

export const ShipToDetailsFormFrame: React.FC<{
  onSubmit: (
    data: ShipToDetails,
    meta: { dirty: boolean },
  ) =>
    | void
    | AddressFieldErrorMessages
    | Promise<AddressFieldErrorMessages | void>;
  children: ReactNode;
  initialValues?: ShipToDetails;
}> = ({ onSubmit, children, initialValues }) => (
  <AddressFormFrame
    initialValues={
      initialValues ? mapFromShipToDetailsToForm(initialValues) : undefined
    }
    onSubmit={async (data, { fieldsModified }) =>
      await onSubmit(mapFromFormToShipToDetails(data), {
        dirty: anyFieldModified(fieldsModified),
      })
    }
  >
    {children}
  </AddressFormFrame>
);
