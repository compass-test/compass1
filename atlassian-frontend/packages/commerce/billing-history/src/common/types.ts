import { BillingDetails } from '@atlassian/commerce-billing-details';
import { PaymentMethodId } from '@atlassian/commerce-payment-methods';
import {
  Currency,
  EpochDateTime,
  InvoiceGroupId,
  Opaque,
} from '@atlassian/commerce-types';

type EmptyPage = {
  data: [];
};

export type PagedList<T, ID> =
  | EmptyPage
  | {
      data: T[];
      min: ID;
      max: ID;
    };

export type InvoiceList = PagedList<Invoice, InvoiceId>;

export type InvoiceId = Opaque<string>;

export type InvoiceStatus =
  | 'DRAFT'
  | 'OPEN'
  | 'PAID'
  | 'UNCOLLECTIBLE'
  | 'VOID';

/**
 * The amount in the lowest units for the currency e.g. cents for USD or yens in JPY
 */
export type UnitMoneyAmount = Opaque<number>;

export type InvoiceItem = {
  id: string;
  currency: Currency;
  description: string;
  period: {
    startAt: EpochDateTime;
    endAt: EpochDateTime;
  };
  subtotal: UnitMoneyAmount;
  total: UnitMoneyAmount;
  tax: UnitMoneyAmount;
  taxPercent: number;
  quantity: number;
  unitAmount: number;
};

export type Invoice = {
  id: InvoiceId;
  invoiceGroup: InvoiceGroupId;
  number: string;
  status: InvoiceStatus;
  createdAt: EpochDateTime;
  finalizedAt: EpochDateTime;
  dueAt: EpochDateTime;
  paidAt: EpochDateTime | null;
  billTo: BillingDetails;
  shipTo: BillingDetails;
  paymentMethod: PaymentMethodId;
  currency: Currency;
  subtotal: UnitMoneyAmount;
  total: UnitMoneyAmount;
  tax: UnitMoneyAmount;
  items: InvoiceItem[];
};
