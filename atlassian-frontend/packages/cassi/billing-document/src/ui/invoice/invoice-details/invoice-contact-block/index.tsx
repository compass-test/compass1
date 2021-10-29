import React from 'react';

import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';

import { BillingContactAddress } from '../../../../common/types';
import { InvoiceBillAndShipTo } from '../../../../common/utils/graph-types';

export interface Props {
  contact?: InvoiceBillAndShipTo | null;
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

const InvoiceContactBlock = ({ contact }: Props) => {
  if (!contact) {
    return <div>Contact not found</div>;
  }

  const displayName =
    [contact.firstName, contact.lastName].filter(negate(isEmpty)).join(' ') ??
    'No name';

  return (
    <div
      className="contact-detail"
      data-testid={`billing-doc-contact-${contact.email}`}
    >
      <div
        className="contact-detail-name"
        data-testid="billing-doc-contact-name"
      >
        <strong>{displayName}</strong>
      </div>
      {contact.email && (
        <div className="contact-detail-email">{contact.email}</div>
      )}
      {/* {contact.organization && (
        <div className="contact-detail-organization">
          <strong>{contact.organization}</strong>
        </div>
      )} */}
      {contact.address1 && (
        <div className="contact-detail-address">{contact.address1}</div>
      )}
      {contact.address2 && (
        <div className="contact-detail-address">{contact.address2}</div>
      )}
      <div
        className="contact-detail-city"
        data-testid="contact-detail-city-state"
      >
        {getCityStatePostalCode({
          city: contact.city,
          state: contact.state,
          postalCode: contact.postalCode,
        })}
      </div>
      {contact.country && (
        <div className="contact-detail-country">{contact.country}</div>
      )}
      {contact.taxId && (
        <div className="contact-detail-tax-id">Tax ID: {contact.taxId}</div>
      )}
    </div>
  );
};

export default InvoiceContactBlock;
