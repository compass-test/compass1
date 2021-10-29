import React from 'react';

import { BillingDocumentProps } from '../../../common/types';
import FormattedDate from '../../../common/ui/FormattedDate';
import { Invoice } from '../../../common/utils/graph-types';

import InvoiceBillingShippingBlock from './invoice-billing-shipping-block';
import InvoiceContactBlock from './invoice-contact-block';

interface Props {
  additionalContent?: React.ReactNode;
  invoice?: Invoice;
  componentProps?: BillingDocumentProps;
}

// Common Billing Doc Details: Contacts and Dates
const InvoiceDetails = ({ invoice }: Props) => {
  const getPaidLabel = (billingDoc?: Invoice) => {
    if (
      billingDoc?.paymentMethod &&
      // leaving as array in case more items needed to be added
      ['DEFERRED'].includes(billingDoc.paymentMethod)
    ) {
      if (billingDoc.status && ['PAID'].includes(billingDoc.status)) {
        return 'Paid';
      }
      return 'Due by';
    }
    return 'Paid';
  };

  return (
    <div
      data-testid="billing-doc-details"
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '16px',
      }}
    >
      {invoice?.sourceSystem === 'CCP' ? (
        <>
          <div style={{ marginRight: '32px' }}>
            <h4>Billing Details</h4>
            <InvoiceBillingShippingBlock
              contact={invoice?.billTo}
              block={'billTo'}
            />
          </div>

          <div style={{ marginRight: '32px' }}>
            <h4>Shipping Details</h4>
            <InvoiceBillingShippingBlock
              contact={invoice?.shipTo}
              block={'shipTo'}
            />
          </div>
        </>
      ) : (
        <>
          {invoice && (
            <div data-testid="billing-contact" style={{ marginRight: '32px' }}>
              <h4>Billing contact</h4>
              <InvoiceContactBlock contact={invoice.billTo} />
            </div>
          )}
          {invoice && (
            <div
              data-testid="technical-contact"
              style={{ marginRight: '32px' }}
            >
              <h4>Technical contact</h4>
              <InvoiceContactBlock contact={invoice.shipTo} />
            </div>
          )}
        </>
      )}
      <div
        data-testid="additional-content"
        style={{ display: 'flex', flex: '1' }}
      >
        <div className="invoice-dates">
          <h4>
            Issued: <FormattedDate date={invoice?.createdDate} />
          </h4>
          <h4>
            {getPaidLabel(invoice)}:{' '}
            <span>
              <FormattedDate date={invoice?.dueDate} />
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
