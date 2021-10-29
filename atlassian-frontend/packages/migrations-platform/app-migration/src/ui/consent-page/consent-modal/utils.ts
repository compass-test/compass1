import { FormattedMessage } from 'react-intl';

import type { DataScope } from '../../../common/types';

import { messages } from './messages';

export const scopeDescriptions: Record<
  DataScope,
  FormattedMessage.MessageDescriptor
> = {
  APP_DATA_OTHER: messages.scopeDescriptionAppDataOther,
  APP_DATA_PII: messages.scopeDescriptionAppDataPii,
  APP_DATA_SECURITY: messages.scopeDescriptionAppDataSecurity,
  APP_DATA_UGC: messages.scopeDescriptionAppDataUgc,
  MIGRATION_TRACING_IDENTITY: messages.scopeDescriptionMigrationTracingIdentity,
  MIGRATION_TRACING_PRODUCT: messages.scopeDescriptionMigrationTracingProduct,
  PRODUCT_DATA_OTHER: messages.scopeDescriptionProductDataOther,
  PRODUCT_DATA_PII: messages.scopeDescriptionProductDataPii,
  PRODUCT_DATA_SECURITY: messages.scopeDescriptionProductDataSecurity,
  PRODUCT_DATA_UGC: messages.scopeDescriptionProductDataUgc,
};
