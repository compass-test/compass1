import React from 'react';

import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { PaginationDetailsStyled } from './styled';

interface Props {
  itemsCount: number;
  totalCount: number;
}

export const PaginationDetails = ({ itemsCount, totalCount }: Props) => (
  <PaginationDetailsStyled data-testid="paginated-picker.ui.async-select.pagination-details">
    <FormattedMessage
      {...messages.ofTotalCount}
      values={{
        itemsCount,
        totalCount,
      }}
    />
  </PaginationDetailsStyled>
);

export default PaginationDetails;
