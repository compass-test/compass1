import { useMemo, useState } from 'react';

type ConsentAction = {
  grantConsent: (appKey: string) => void;
  revokeConsent: (appKey: string) => void;
  showConsentModal: (appKey: string) => void;
  hideConsentModal: () => void;
};

type ConsentController = (
  consent: (appKey: string, consentGiven: boolean) => void,
) => [string | undefined, ConsentAction];

const useConsentController: ConsentController = (consent) => {
  const [appKey, setAppKey] = useState<string>();
  const consentActions = useMemo<ConsentAction>(() => {
    return {
      grantConsent: (appKey) => {
        consent(appKey, true);
      },
      revokeConsent: (appKey) => {
        consent(appKey, false);
      },
      showConsentModal: (appKey) => {
        setAppKey(appKey);
      },
      hideConsentModal: () => {
        setAppKey(undefined);
      },
    };
  }, [consent]);

  return [appKey, consentActions];
};

export default useConsentController;
