import React, { FC, useState } from 'react';

import Button from '@atlaskit/button';
import { CommerceMockedEnvironment } from '@atlassian/commerce-environment/mocks';

import { BillingDetails, ShipToDetails } from '../../common/types';
import { australiaStates } from '../../common/utils/billing-country-states/mocks';
import { defaultCountries } from '../../common/utils/billing-country/mocks';
import {
  fullBillingDetails,
  fullShipToDetails,
  minimalShipToDetails,
  successScenariosForDefaultCountries,
} from '../../mocks';

import { ShipToDetailsFields, ShipToDetailsFormFrame } from './index';

const logValues = (values: BillingDetails) => {
  // eslint-disable-next-line no-console
  console.log(values);
};

type ExampleFormProps = {
  onSubmit?: (data: BillingDetails) => void;
};

export const EmptyForm = ({ onSubmit }: ExampleFormProps) => {
  const [countryStates] = useState({});

  return (
    <CommerceMockedEnvironment scenarios={successScenariosForDefaultCountries}>
      <ShipToDetailsFormFrame onSubmit={onSubmit || logValues}>
        <ShipToDetailsFields
          sharedCountryStates={countryStates}
          billingDetails={fullBillingDetails}
          countries={defaultCountries}
        />
        <div>
          <Button testId="commerce.ship-to-details.submit-button" type="submit">
            Submit
          </Button>
        </div>
      </ShipToDetailsFormFrame>
    </CommerceMockedEnvironment>
  );
};
export const MinimallyPreFilledForm = ({ onSubmit }: ExampleFormProps) => (
  <CommerceMockedEnvironment scenarios={successScenariosForDefaultCountries}>
    <ShipToDetailsFormFrame
      onSubmit={onSubmit || logValues}
      initialValues={minimalShipToDetails}
    >
      <ShipToDetailsFields
        billingDetails={fullBillingDetails}
        countries={defaultCountries}
        sharedCountryStates={australiaStates}
      />
      <div>
        <Button testId="commerce.ship-to-details.submit-button" type="submit">
          Submit
        </Button>
      </div>
    </ShipToDetailsFormFrame>
  </CommerceMockedEnvironment>
);

export const FullyPreFilledForm = ({ onSubmit }: ExampleFormProps) => (
  <CommerceMockedEnvironment scenarios={successScenariosForDefaultCountries}>
    <ShipToDetailsFormFrame
      onSubmit={onSubmit || logValues}
      initialValues={fullShipToDetails}
    >
      <ShipToDetailsFields
        billingDetails={fullBillingDetails}
        countries={defaultCountries}
        sharedCountryStates={australiaStates}
      />
      <div>
        <Button testId="commerce.ship-to-details.submit-button" type="submit">
          Submit
        </Button>
      </div>
    </ShipToDetailsFormFrame>
  </CommerceMockedEnvironment>
);

export const FullyPreFilledFormWithCopy: FC<ExampleFormProps> = ({
  onSubmit,
}) => {
  return (
    <CommerceMockedEnvironment scenarios={successScenariosForDefaultCountries}>
      <ShipToDetailsFormFrame
        onSubmit={onSubmit || logValues}
        initialValues={fullShipToDetails as ShipToDetails}
      >
        <ShipToDetailsFields
          billingDetails={fullBillingDetails}
          countries={defaultCountries}
          sharedCountryStates={australiaStates}
        />
        <div>
          <Button testId="commerce.ship-to-details.submit-button" type="submit">
            Submit
          </Button>
        </div>
      </ShipToDetailsFormFrame>
    </CommerceMockedEnvironment>
  );
};
