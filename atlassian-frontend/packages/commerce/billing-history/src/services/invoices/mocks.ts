import { fullBillingDetails } from '@atlassian/commerce-billing-details/mocks';
import {
  IG_ID,
  networksScenarios,
  ok,
  serverFailure,
  url,
} from '@atlassian/commerce-environment/mocks';
import { visaPaymentMethodId } from '@atlassian/commerce-payment-methods/mocks';
import { Currency, EpochDateTime } from '@atlassian/commerce-types';

import {
  Invoice,
  InvoiceId,
  InvoiceList,
  UnitMoneyAmount,
} from '../../common/types';

import { INVOICES_URL } from './index';

// Thu Jun 18 2020 16:50:44 GMT+1000
const Jun18 = 1592463044000 as EpochDateTime;

// +24h
const Jun19 = (Jun18 + 24 * 60 * 60 * 1000) as EpochDateTime;

export const invoice1: Invoice = {
  id: '2-first-invoice-id' as InvoiceId,
  invoiceGroup: IG_ID,
  number: 'E4C17EB2-0001',
  status: 'PAID',
  createdAt: Jun18,
  finalizedAt: Jun19,
  dueAt: Jun18,
  paidAt: Jun19,
  billTo: fullBillingDetails,
  shipTo: fullBillingDetails,
  paymentMethod: visaPaymentMethodId,
  currency: 'USD' as Currency,
  subtotal: 0 as UnitMoneyAmount,
  total: 0 as UnitMoneyAmount,
  tax: 0 as UnitMoneyAmount,
  items: [],
};

export const invoice2: Invoice = {
  id: '1-second-invoice-id' as InvoiceId,
  invoiceGroup: IG_ID,
  number: 'E4C17EB2-0002',
  status: 'PAID',
  createdAt: Jun19,
  finalizedAt: Jun19,
  dueAt: Jun19,
  paidAt: Jun19,
  billTo: fullBillingDetails,
  shipTo: fullBillingDetails,
  paymentMethod: visaPaymentMethodId,
  currency: 'USD' as Currency,
  subtotal: 10000 as UnitMoneyAmount,
  total: 120.03 as UnitMoneyAmount,
  tax: 2000 as UnitMoneyAmount,
  items: [],
};

export const invoice3: Invoice = {
  id: 'thrid-invoice-id' as InvoiceId,
  invoiceGroup: IG_ID,
  number: 'E4C17EB2-0003',
  status: 'PAID',
  createdAt: Jun18,
  finalizedAt: Jun19,
  dueAt: Jun18,
  paidAt: Jun19,
  billTo: fullBillingDetails,
  shipTo: fullBillingDetails,
  paymentMethod: visaPaymentMethodId,
  currency: 'USD' as Currency,
  subtotal: 80000 as UnitMoneyAmount,
  total: 960.12 as UnitMoneyAmount,
  tax: 1600 as UnitMoneyAmount,
  items: [],
};

export const invoice4: Invoice = {
  id: 'fourth-invoice-id' as InvoiceId,
  invoiceGroup: IG_ID,
  number: 'E4C17EB2-0004',
  status: 'OPEN',
  createdAt: Jun18,
  finalizedAt: Jun19,
  dueAt: Jun18,
  paidAt: null,
  billTo: fullBillingDetails,
  shipTo: fullBillingDetails,
  paymentMethod: visaPaymentMethodId,
  currency: 'USD' as Currency,
  subtotal: 80000 as UnitMoneyAmount,
  total: 96000 as UnitMoneyAmount,
  tax: 1600 as UnitMoneyAmount,
  items: [
    {
      id: 'an-inoice-item-id',
      description: 'Jira Software Monthly Charge',
      period: {
        startAt: 1578614400000 as EpochDateTime,
        endAt: 1581292800000 as EpochDateTime,
      },
      subtotal: 80000 as UnitMoneyAmount,
      total: 96000 as UnitMoneyAmount,
      unitAmount: 10,
      tax: 1600 as UnitMoneyAmount,
      taxPercent: 10,
      currency: 'USD' as Currency,
      quantity: 2,
    },
  ],
};

export const openInvoice = invoice4;

export const scenarios = networksScenarios({
  invoicesSuccess: {
    name: 'Request to fetch invoices',
    request: url(`${INVOICES_URL}?convertAmount=true`),
    response: ok<InvoiceList>({
      // we shuffle invoices a little to reflect production behaviour
      data: [invoice2, invoice4, invoice1],
      min: invoice1.id,
      max: invoice4.id,
    }),
  },
  invoiceSuccess: {
    name: 'Request to fetch invoice matching id',
    request: url(`${INVOICES_URL}/${openInvoice.id}`),
    response: ok<Invoice>(invoice4),
  },
  invoicesNextPage: {
    name: 'Request to fetch invoices after given invoice',
    request: url(`${INVOICES_URL}?convertAmount=true&after=${invoice2.id}`),
    response: ok<InvoiceList>({
      data: [invoice3],
      min: invoice3.id,
      max: invoice4.id,
    }),
  },
  invoicesEmpty: {
    name: 'Request to fetch empty invoices',
    request: url(`${INVOICES_URL}?convertAmount=true`),
    response: ok<InvoiceList>({
      data: [],
    }),
  },
  invoicesFailure: {
    name: 'Server failure',
    request: url(`${INVOICES_URL}?convertAmount=true`),
    response: serverFailure(),
  },
});
