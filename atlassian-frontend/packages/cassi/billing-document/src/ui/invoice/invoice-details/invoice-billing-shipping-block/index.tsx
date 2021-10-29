import React from 'react';

import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';

import { BillingContactAddress } from '../../../../common/types';
import { InvoiceBillAndShipTo } from '../../../../common/utils/graph-types';

export interface Props {
  contact?: InvoiceBillAndShipTo | null;
  block: string;
}

const getCityStatePostalCode = ({
  city,
  state,
  postalCode,
}: BillingContactAddress): string => {
  if (city && state) {
    return postalCode && !isEmpty(postalCode)
      ? `${city}, ${state} ${postalCode}`
      : `${city}, ${state}`;
  }

  return [city, state, postalCode].filter(negate(isEmpty)).join(' ');
};

const InvoiceBillingShippingBlock = ({ contact, block }: Props) => {
  if (!contact) {
    return (
      <div>
        {block === 'shipTo' ? 'Shipping ' : 'Billing '}information not found
      </div>
    );
  }

  const displayName =
    [contact.firstName, contact.lastName].filter(negate(isEmpty)).join(' ') ??
    'No name';

  const hasFullAddress = contact.address1 && contact.country;

  return (
    <div
      className="billing-shipping-detail"
      data-testid={`billing-shipping-doc-${block}`}
    >
      {block === 'billTo' && (
        <div
          className="billing-shipping-detail-name"
          data-testid="billing-shipping-doc-name"
        >
          <strong>{displayName}</strong>
        </div>
      )}

      <div className="billing-shipping-detail-tax-id">
        Tax ID: {contact.taxId || 'Not found'}
      </div>

      {hasFullAddress ? (
        <>
          <div className="billing-shipping-detail-address">
            {contact.address1}
          </div>
          {contact.address2 && (
            <div className="billing-shipping-detail-address">
              {contact.address2}
            </div>
          )}
          <div
            className="billing-shipping-detail-city"
            data-testid="billing-shipping-detail-city-state"
          >
            {getCityStatePostalCode({
              city: contact.city,
              state: contact.state,
              postalCode: contact.postalCode,
            })}
          </div>

          <div className="billing-shipping-detail-country">
            {contact.country}
          </div>
        </>
      ) : (
        <div> Address: Not found</div>
      )}
    </div>
  );
};

export default InvoiceBillingShippingBlock;
