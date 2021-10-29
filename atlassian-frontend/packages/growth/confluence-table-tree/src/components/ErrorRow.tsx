import React from 'react';
import { Row, Cell } from '@atlaskit/table-tree';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';

const ErrorRowBase = function () {
  return (
    <Row itemId="error" hasChildren={false}>
      <Cell>
        <small>
          <FormattedMessage {...messages.errorRow} />
        </small>
      </Cell>
    </Row>
  );
};

export default injectIntl(ErrorRowBase);
