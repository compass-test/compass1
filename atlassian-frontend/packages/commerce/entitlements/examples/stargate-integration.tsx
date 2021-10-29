import React, { useCallback, useEffect, useState } from 'react';

import SectionMessage from '@atlaskit/section-message';
import { CommerceStartgateProxy } from '@atlassian/commerce-environment/mocks';
import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import {
  createAmendmentOrderItem,
  EntitlementId,
  ExpandedEntitlement,
  OfferingKey,
  PricingPlanId,
  useCancelScheduledDeactivation,
  useDeactivateEntitlement,
  useEntitlementDetailsService,
  useEntitlementsService,
  usePlaceOrderAndWaitEntitlementsUpdate,
  useReactivateEntitlement,
} from '../src';

const formatEntitlements = (list: ExpandedEntitlement[]) => {
  const readableEntitlements = list.map((e) => ({
    entitlementId: e.entitlementId,
    status: e.status,
    version: e.version,
    order: {
      id: e.order.id,
      item: {
        type: e.order.item?.type,
      },
    },
    subscription: e.subscription && {
      id: e.subscription.id,
      invoiceGroupId: e.subscription.invoiceGroupId,
      status: e.subscription.status,
      scheduledChanges: e.subscription?.scheduledChanges,
    },
    offeringKey: e.offering?.key,
    lastOrderId: e.order.id,
  }));

  return JSON.stringify(readableEntitlements, null, 4);
};

const EntitlementSelect: React.FC<{
  current: ExpandedEntitlement | null;
  onUpdate: (newEntitlement: ExpandedEntitlement) => void;
  entitlements: ExpandedEntitlement[];
}> = ({ entitlements, current, onUpdate }) => (
  <>
    <select
      value={current ? (current.entitlementId as string) : undefined}
      onChange={(event) => {
        const changed = entitlements.filter(
          (e) => e.entitlementId === (event.target.value as EntitlementId),
        )[0];
        onUpdate(changed);
      }}
    >
      <option value={undefined}>Choose an entitlement</option>
      {entitlements.map((it) => (
        <option value={it.entitlementId}>
          {it.entitlementId} {it.status}
        </option>
      ))}
    </select>
  </>
);

const ShowEntitlementDetails: React.FC<{
  txaId: TransactionAccountId;
  entitlement: ExpandedEntitlement;
  refresh: () => void;
}> = ({ txaId, entitlement }) => {
  const [details, setDetails] = useState<ExpandedEntitlement | null>(null);

  const {
    fetchData: fetchDetails,
    loading,
    error,
  } = useEntitlementDetailsService(txaId);

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetchDetails(entitlement.entitlementId).then((res) => {
      setDetails(() => res);
    });
  };

  useEffect(() => {
    setDetails(null);
  }, [entitlement]);

  if (error) {
    return <span>Fetch detail error: {JSON.stringify(error)}</span>;
  }

  return (
    <>
      <h2>Show entitlement details</h2>
      {details && <pre>{formatEntitlements([details])}</pre>}
      <form onSubmit={handleOnSubmit}>
        <button type="submit" disabled={loading}>
          FETCH DETAILS
        </button>
      </form>
    </>
  );
};

const PlaceCancellationOrder: React.FC<{
  txaId: TransactionAccountId;
  entitlement: ExpandedEntitlement;
  refresh: () => void;
}> = ({ txaId, refresh, entitlement }) => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const resetMsg = useCallback(() => setErrorMsg(undefined), []);

  const { update: deactivate, loading, error } = useDeactivateEntitlement(
    txaId,
  );

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      resetMsg();
      await deactivate(entitlement).then(refresh);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  if (error) {
    console.log(JSON.stringify(error));
  }
  return (
    <>
      <h2>Deactivate</h2>
      <form onSubmit={handleOnSubmit}>
        <button type="submit" disabled={loading}>
          DEACTIVATE
        </button>
        {errorMsg && (
          <SectionMessage title="Deactivation Error" appearance="error">
            {errorMsg}
          </SectionMessage>
        )}
      </form>
    </>
  );
};

const PlaceReactivationOrder: React.FC<{
  txaId: TransactionAccountId;
  entitlement: ExpandedEntitlement;
  refresh: () => void;
}> = ({ txaId, refresh, entitlement }) => {
  const [errorMsg, setErrorMsg] = useState(undefined);
  const resetMsg = useCallback(() => setErrorMsg(undefined), []);

  const { update: reactivate, loading, error } = useReactivateEntitlement(
    txaId,
  );

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      resetMsg();
      await reactivate(entitlement).then(refresh);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  if (error) {
    console.log(JSON.stringify(error));
  }
  return (
    <>
      <h2>Reactivate</h2>
      <form onSubmit={handleOnSubmit}>
        <button type="submit" disabled={loading}>
          REACTIVATE
        </button>
        {errorMsg && (
          <SectionMessage title="Reactivation Error" appearance="error">
            {errorMsg}
          </SectionMessage>
        )}
      </form>
    </>
  );
};

const CancelDeactivation: React.FC<{
  txaId: TransactionAccountId;
  entitlement: ExpandedEntitlement;
  refresh: () => void;
}> = ({ txaId, refresh, entitlement }) => {
  const [errorMsg, setErrorMsg] = useState(undefined);

  const {
    update: cancelScheduledDeactivation,
    loading,
    error,
  } = useCancelScheduledDeactivation(txaId);

  const onSubmit = async () => {
    try {
      await cancelScheduledDeactivation(entitlement);
      refresh();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  if (error) {
    console.log(JSON.stringify(error));
  }

  return (
    <>
      <h3>Cancel Scheduled Deactivation</h3>
      <button onClick={onSubmit} disabled={loading}>
        CANCEL SCHEDULED DEACTIVATION
      </button>
      {errorMsg && (
        <SectionMessage title="Amendment Error" appearance="error">
          {errorMsg}
        </SectionMessage>
      )}
    </>
  );
};

const PlaceAmendmentOrder: React.FC<{
  txaId: TransactionAccountId;
  entitlement: ExpandedEntitlement;
  refresh: () => void;
}> = ({ txaId, refresh, entitlement }) => {
  const [errorMsg, setErrorMsg] = useState(undefined);
  const resetMsg = useCallback(() => setErrorMsg(undefined), []);

  const [invoiceGroupId, setInvoiceGroupId] = useState<
    InvoiceGroupId | undefined
  >(entitlement.subscription?.invoiceGroupId);
  const [offeringId, setOfferingId] = useState<OfferingKey | undefined>(
    undefined,
  );
  const [pricingPlanId, setPricingPlanId] = useState<PricingPlanId | undefined>(
    undefined,
  );
  const [skipTrial, setSkipTrial] = useState<boolean>(false);

  const {
    update: amend,
    loading,
    error,
  } = usePlaceOrderAndWaitEntitlementsUpdate(txaId);

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    resetMsg();

    try {
      let orderItem = createAmendmentOrderItem(entitlement, {
        offeringId,
        optedUsageOptions: pricingPlanId
          ? {
              trial: {
                skipTrial,
              },
              chargingDetails: {
                pricingPlanId,
              },
            }
          : undefined,
      });

      await amend({ invoiceGroupId, items: [orderItem] }).then(refresh);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  if (error) {
    console.log(JSON.stringify(error));
  }

  return (
    <>
      <h3>Upgrade / Downgrade</h3>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="invoiceGroupId">Invoice group ID</label>
          <input
            type="text"
            name="invoiceGroupId"
            onChange={(e) =>
              setInvoiceGroupId(e.target.value as InvoiceGroupId)
            }
            value={invoiceGroupId}
          />
        </div>
        <div>
          <label htmlFor="offeringId">Offering ID</label>
          <input
            type="text"
            name="offeringId"
            onChange={(e) => setOfferingId(e.target.value as OfferingKey)}
            value={offeringId}
          />
        </div>
        <div>
          <label htmlFor="pricingPlanId">Pricing Plan ID</label>
          <input
            type="text"
            name="pricingPlanId"
            onChange={(e) => setPricingPlanId(e.target.value as PricingPlanId)}
            value={pricingPlanId}
          />
        </div>
        <div>
          <label htmlFor="skipTrial">Skip trial</label>
          <input
            type="checkbox"
            name="skipTrial"
            checked={skipTrial}
            onChange={(e) => setSkipTrial(e.target.checked)}
          />
        </div>
        <button type="submit" disabled={loading}>
          UPGRADE / DOWNGRADE
        </button>
        {errorMsg && (
          <SectionMessage title="Amendment Error" appearance="error">
            {errorMsg}
          </SectionMessage>
        )}
      </form>
    </>
  );
};

const Example = ({ txaId }: { txaId: TransactionAccountId }) => {
  const { data: entitlements, loading, refresh } = useEntitlementsService(
    txaId,
  );
  const [
    selectedEntitlement,
    setSelectedEntitlement,
  ] = useState<ExpandedEntitlement | null>(null);

  if (loading || entitlements === undefined) {
    return <span>Loading...</span>;
  }
  return (
    <>
      <h1>Entitlement List</h1>
      <pre>{formatEntitlements(entitlements)}</pre>
      <button onClick={refresh}>REFRESH LIST</button>

      <h1>Select an entitlement</h1>
      <EntitlementSelect
        current={selectedEntitlement}
        onUpdate={setSelectedEntitlement}
        entitlements={entitlements}
      />

      {selectedEntitlement && (
        <>
          <ShowEntitlementDetails
            txaId={txaId}
            refresh={refresh}
            entitlement={selectedEntitlement}
          />
          <PlaceCancellationOrder
            txaId={txaId}
            refresh={refresh}
            entitlement={selectedEntitlement}
          />
          <PlaceReactivationOrder
            txaId={txaId}
            refresh={refresh}
            entitlement={selectedEntitlement}
          />
          <PlaceAmendmentOrder
            txaId={txaId}
            refresh={refresh}
            entitlement={selectedEntitlement}
          />
          <CancelDeactivation
            txaId={txaId}
            refresh={refresh}
            entitlement={selectedEntitlement}
          />
        </>
      )}
    </>
  );
};

export default () => (
  <CommerceStartgateProxy>
    {(txa: TransactionAccountId) => <Example txaId={txa} />}
  </CommerceStartgateProxy>
);
