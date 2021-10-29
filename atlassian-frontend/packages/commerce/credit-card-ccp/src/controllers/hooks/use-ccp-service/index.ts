import {
  CommerceService,
  FieldNames,
  StatedResponse,
} from '@atlassian/commerce-credit-card-base';

import { useOnCardNumberChangeBrandValidation } from '../../brand-validation';
import { CCPStripeEnvironment, useCCPTokenService } from '../use-ccp-token';

export interface CCPService extends CommerceService {
  token: StatedResponse<CCPStripeEnvironment>;
}

export const useCCPService = (id: string) => {
  const token = useCCPTokenService(id);

  const onCardNumberChangeBrandValidation = useOnCardNumberChangeBrandValidation();

  return {
    token,
    fieldConfigs: {
      [FieldNames.NUMBER]: {
        onChange: onCardNumberChangeBrandValidation,
      },
    },
  };
};
