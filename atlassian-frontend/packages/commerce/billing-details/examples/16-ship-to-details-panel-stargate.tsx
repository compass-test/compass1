import React from 'react';

import { CommerceStartgateProxy } from '@atlassian/commerce-environment/mocks';
import { TransactionAccountId } from '@atlassian/commerce-types';

import { ShipToDetailsPanel, useShipToDetailsListService } from '../src';

const Example = ({ txa }: { txa: TransactionAccountId }) => {
  const { data: shipToDetailsList, loading } = useShipToDetailsListService(txa);

  if (loading || !shipToDetailsList) {
    return <p>loading...</p>;
  }
  return (
    <>
      {shipToDetailsList.map((details) => (
        <ShipToDetailsPanel shipToDetails={details} />
      ))}
    </>
  );
};

export default () => (
  <CommerceStartgateProxy>
    {(txa) => <Example txa={txa} />}
  </CommerceStartgateProxy>
);
