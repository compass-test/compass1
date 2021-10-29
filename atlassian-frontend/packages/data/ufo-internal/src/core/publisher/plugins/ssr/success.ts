import { SSRConfig } from '../../../types';

export const ssrSuccess = (ssr: SSRConfig | null) => {
  if (ssr?.getDoneMark()) {
    return { 'ssr:success': true };
  }

  return null;
};
