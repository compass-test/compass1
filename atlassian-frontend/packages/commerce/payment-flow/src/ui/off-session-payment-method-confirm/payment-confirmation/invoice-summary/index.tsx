import React from 'react';

import { Invoice } from '@atlassian/commerce-billing-history';

import {
  InvoiceItemPanel,
  InvoiceItemsContainer,
  ItemDescription,
  ItemPeriod,
  Strong,
  TotalsRow,
} from './styled';

type InvoiceSummaryProps = {
  invoice: Invoice;
};

const formatCurrency = (n: number): string => n.toFixed(2);

const twoDigits = (n: number): string => (n < 10 ? `0${n}` : String(n));

export const formatDate = (d: number) => {
  const date = new Date(d);
  const dd = date.getUTCDate();

  const mm = date.getUTCMonth() + 1;

  const yyyy = date.getUTCFullYear();

  return `${yyyy}-${twoDigits(mm)}-${twoDigits(dd)}`;
};

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ invoice }) => {
  return (
    <div>
      <InvoiceItemsContainer>
        {invoice.items.map((item) => (
          <InvoiceItemPanel key={item.id}>
            <div>
              <ItemDescription>{item.description}</ItemDescription>
              <ItemPeriod>{`Billing period: ${formatDate(
                item.period.startAt,
              )} - ${formatDate(item.period.endAt)}`}</ItemPeriod>
            </div>
            <Strong>
              {item.currency} {formatCurrency(item.total)}
            </Strong>
          </InvoiceItemPanel>
        ))}
      </InvoiceItemsContainer>
      <div>
        <TotalsRow>
          <div>Subtotal</div> <div>{formatCurrency(invoice.subtotal)}</div>
        </TotalsRow>
        <TotalsRow>
          <div>Tax</div> <div>{formatCurrency(invoice.tax)}</div>
        </TotalsRow>
        <TotalsRow>
          <Strong>Total to pay</Strong>{' '}
          <Strong>{formatCurrency(invoice.total)}</Strong>
        </TotalsRow>
      </div>
    </div>
  );
};
