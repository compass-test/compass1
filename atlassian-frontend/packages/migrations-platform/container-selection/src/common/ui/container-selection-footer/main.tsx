import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import FooterSection from './footer-section';
import messages from './messages';
import RowsPerPageSelect from './rows-per-page-select';
import { PaginationWrapper, TableFooterWrapper } from './styled';

type Props = {
  defaultRowsPerPage: number;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowsPerPageOptions: number[];
  pagination: React.ReactNode;
};

const ContainerSelectionFooter = ({
  defaultRowsPerPage,
  onRowsPerPageChange,
  pagination,
  rowsPerPageOptions,
  intl,
}: Props & InjectedIntlProps) => (
  <TableFooterWrapper>
    <FooterSection heading={intl.formatMessage(messages.rowsPerPageLabel)}>
      <RowsPerPageSelect
        defaultRowsPerPage={defaultRowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </FooterSection>
    <PaginationWrapper>{pagination}</PaginationWrapper>
  </TableFooterWrapper>
);

export default injectIntl(ContainerSelectionFooter);
