import { GraphEntity } from './utils/graph-types';

export type BillingDocumentProps = {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;

  id: string;
  Header?: React.ReactNode;
  Details?: React.ReactNode;
  LineItems?: React.ReactNode;
  BreadCrumbs?: React.ReactNode;
  AuditTrail?: React.ReactNode;
};

export const BillingDocumentType = {
  INVOICE: GraphEntity.INVOICE,
  REFUND: GraphEntity.REFUND,
  QUOTE: GraphEntity.QUOTE,
};

export interface BillingContactAddress {
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
}

export enum SourceSystem {
  HAMS = 'HAMS',
  CCP = 'CCP',
}
