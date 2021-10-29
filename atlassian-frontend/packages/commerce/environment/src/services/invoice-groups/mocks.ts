import {
  IG_ID,
  networksScenarios,
  ok,
  serverFailure,
  url,
} from '../../common/scenarios';
import { IG_ID_2 } from '../../common/scenarios/constants';

import { INVOICE_GROUP_URL, InvoiceGroupServerResponse } from './index';

export const scenarios = networksScenarios({
  success: {
    name: 'Request to fetch invoice groups',
    request: url(INVOICE_GROUP_URL),
    response: ok<InvoiceGroupServerResponse>({
      data: [{ id: IG_ID }, { id: IG_ID_2 }],
    }),
  },
  failure: {
    name: 'Request to fetch invoice groups failed',
    request: url(INVOICE_GROUP_URL),
    response: serverFailure(),
  },
});
