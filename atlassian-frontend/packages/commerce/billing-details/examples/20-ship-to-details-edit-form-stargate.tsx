import React, { useState } from 'react';

import Button from '@atlaskit/button';
import { CommerceStartgateProxy } from '@atlassian/commerce-environment/mocks';
import { TransactionAccountId } from '@atlassian/commerce-types';

import {
  ShipToDetailsId,
  useBillingCountriesService,
  useBillingDetailsService,
  useShipToDetailsListService,
  useShipToDetailsService,
  useUpdateShipToDetailsService,
} from '../src';
import {
  ShipToDetailsFields,
  ShipToDetailsFormFrame,
} from '../src/ui/ship-to-details-form';

const ShipToDetailsEditor = ({
  txa,
  shipToDetailsId,
}: {
  txa: TransactionAccountId;
  shipToDetailsId: ShipToDetailsId;
}) => {
  const { data: shipToDetails, loading, refresh } = useShipToDetailsService(
    txa,
    shipToDetailsId,
  );
  const {
    data: billingDetails,
    loading: billingDetailsLoading,
  } = useBillingDetailsService(txa);
  const { data: countries } = useBillingCountriesService();
  const {
    loading: updating,
    update,
    error: updatingError,
  } = useUpdateShipToDetailsService(txa, shipToDetailsId);
  const [countryStates] = useState({});

  if (updatingError) {
    return <p>Updating error: {JSON.stringify(updatingError)}</p>;
  }

  if (
    loading ||
    !shipToDetails ||
    billingDetailsLoading ||
    !billingDetails ||
    !countries
  ) {
    return <p>loading...</p>;
  }
  return (
    <ShipToDetailsFormFrame
      onSubmit={async (newShipToDetails, { dirty }) => {
        if (!dirty) {
          return;
        }
        await update(newShipToDetails);
        await refresh();
      }}
      initialValues={shipToDetails}
    >
      <ShipToDetailsFields
        sharedCountryStates={countryStates}
        billingDetails={billingDetails}
        countries={countries}
      />
      <Button type="submit" appearance="primary" isDisabled={updating}>
        Submit
      </Button>
    </ShipToDetailsFormFrame>
  );
};

const Example = ({ txa }: { txa: TransactionAccountId }) => {
  const { data: shipToDetailsList, loading } = useShipToDetailsListService(txa);

  const [selectedShipToDetails, selectShipToDetails] = useState<
    ShipToDetailsId
  >();

  if (loading || !shipToDetailsList) {
    return <p>loading...</p>;
  }
  return (
    <>
      <select
        name="transactionAccountId"
        value={selectedShipToDetails}
        onChange={(event) =>
          selectShipToDetails(event.target.value as ShipToDetailsId)
        }
      >
        {shipToDetailsList.map((it) => (
          <option value={it.id}>
            {it.name} {it.postalAddress.line1}
          </option>
        ))}
      </select>
      {selectedShipToDetails ? (
        <ShipToDetailsEditor
          txa={txa}
          shipToDetailsId={selectedShipToDetails}
        />
      ) : (
        <p>Select ship-to details</p>
      )}
    </>
  );
};

export default () => (
  <CommerceStartgateProxy>
    {(txa) => <Example txa={txa} />}
  </CommerceStartgateProxy>
);
