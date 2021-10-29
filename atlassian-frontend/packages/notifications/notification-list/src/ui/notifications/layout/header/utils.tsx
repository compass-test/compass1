import { RequestCategory } from '../../../../common/types';
import messages from '../../../../common/utils/i18n/messages';

export const resolveCategoryMessage = (category: RequestCategory) => {
  switch (category) {
    case RequestCategory.DIRECT:
      return messages.direct;
    case RequestCategory.NONE:
      return messages.watching;
    // This also handles the unused RequestCategory.ANY
    default:
      return messages.direct;
  }
};
