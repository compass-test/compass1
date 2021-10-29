import {
  networksScenarios,
  ok,
  serverFailure,
  TXA_ID,
  TXA_ID_2,
  TXA_ID_NO,
  TXA_ID_NO_2,
  url,
} from '../../common/scenarios';

import {
  TRANSACTION_ACCOUNTS_URL,
  TransactionAccountsServerResponse,
} from './index';

export const scenarios = networksScenarios({
  empty: {
    request: url(TRANSACTION_ACCOUNTS_URL),
    response: ok<TransactionAccountsServerResponse>({
      data: [],
    }),
  },
  single: {
    request: url(TRANSACTION_ACCOUNTS_URL),
    response: ok<TransactionAccountsServerResponse>({
      data: [{ id: TXA_ID, number: TXA_ID_NO }],
    }),
  },
  success: {
    request: url(TRANSACTION_ACCOUNTS_URL),
    response: ok<TransactionAccountsServerResponse>({
      data: [
        { id: TXA_ID, number: TXA_ID_NO },
        { id: TXA_ID_2, number: TXA_ID_NO_2 },
      ],
    }),
  },
  failure: {
    request: url(TRANSACTION_ACCOUNTS_URL),
    response: serverFailure(),
  },
});
