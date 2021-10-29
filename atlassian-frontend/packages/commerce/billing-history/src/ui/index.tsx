import React, { useMemo } from 'react';

import Button from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import AkEmptyState from '@atlaskit/empty-state';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { ResponsiveResize } from '@atlassian/commerce-layout';

import { DOWNLOAD_INVOICE_LINK } from '../common/constants/breadcrumb-names';
import { Invoice } from '../common/types';
import { formatDate } from '../common/utils';
import {
  AnalyticsRoot,
  RepackageAtlaskitEvent,
} from '../common/utils/analytics';

import { Amount } from './amount';
import folder from './assets/folder.svg';
import { TextRight } from './styled';

export const tHead = {
  cells: [
    {
      key: 'date',
      content: 'Date',
      width: 20,
    },
    {
      key: 'invoice-number',
      content: 'Invoice number',
      width: 40,
    },
    {
      key: 'amount',
      content: <TextRight>Amount</TextRight>,
      width: 30,
    },
    {
      key: 'actions',
      content: 'Actions',
      width: 10,
      shouldTruncate: true,
    },
  ],
};

const buildRows = (arr: Invoice[]) =>
  arr.map(({ id, createdAt, total, currency, number }) => ({
    key: `row-${id}`,
    cells: [
      {
        key: createdAt,
        content: formatDate(createdAt),
      },
      {
        key: number,
        content: number,
      },
      {
        key: total,
        content: (
          <TextRight>
            <Amount currency={currency} total={total} />
          </TextRight>
        ),
      },
      {
        key: id,
        content: (
          <RepackageAtlaskitEvent actionSubjectId={DOWNLOAD_INVOICE_LINK}>
            <Button
              appearance="link"
              href={`/gateway/api/ccp/api/v1/invoices/${id}/download`}
              target="_blank"
              spacing="none"
              download={`invoice-${id}`}
            >
              <ResponsiveResize
                sm={<DownloadIcon label="Download" />}
                lg={'Download'}
              />
            </Button>
          </RepackageAtlaskitEvent>
        ),
      },
    ],
  }));

export const BillingHistory: React.FC<{
  invoiceData?: Invoice[];
}> = ({ invoiceData = [] }) => {
  const filteredInvoiceData = useMemo(
    () => invoiceData.filter((it) => it.status !== 'OPEN'),
    [invoiceData],
  );
  const mappedInvoiceData = useMemo(() => buildRows(filteredInvoiceData), [
    filteredInvoiceData,
  ]);

  return (
    <AnalyticsRoot>
      {filteredInvoiceData.length === 0 ? (
        <div data-testid="billing-history.empty-state">
          <AkEmptyState
            imageUrl={folder}
            header="No tax invoices yet"
            description="Your tax invoices will appear here once you make your first payment."
            size="narrow"
          />
        </div>
      ) : (
        <DynamicTable
          head={tHead}
          rows={mappedInvoiceData}
          defaultSortKey="date"
          defaultSortOrder="ASC"
        />
      )}
    </AnalyticsRoot>
  );
};
