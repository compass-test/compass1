import React from 'react';

import { BillingDocumentProps, BillingDocumentType } from '../common/types';
import { GetDocumentType } from '../common/utils/direct-match';

import { HamsQuote } from './hams-quote';
import { HamsRefund } from './hams-refund';
import { Invoice } from './invoice';
import { BillingDocumentContainer, Wrapper } from './styled';

export const BillingDocument = (props: BillingDocumentProps) => {
  // query for the id. if theres a result thats the type.
  const documentType = GetDocumentType(props.id);

  let document;

  switch (documentType) {
    case BillingDocumentType.INVOICE: {
      document = (
        <Invoice
          id={props.id}
          LineItems={props.LineItems}
          AuditTrail={props.AuditTrail}
          Header={props.Header}
          Details={props.Details}
          BreadCrumbs={props.BreadCrumbs}
        />
      );
      break;
    }
    case BillingDocumentType.QUOTE: {
      document = <HamsQuote id={props.id} />;
      break;
    }
    case BillingDocumentType.REFUND: {
      document = <HamsRefund id={props.id} />;
      break;
    }
    case undefined: {
      document = <div>Unable to find billing document {props.id}</div>;
      break;
    }
  }

  return (
    <Wrapper>
      <BillingDocumentContainer>{document}</BillingDocumentContainer>
    </Wrapper>
  );
};

export default BillingDocument;
