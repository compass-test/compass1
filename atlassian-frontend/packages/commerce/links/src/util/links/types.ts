export type CommerceLinks =
  | 'faq'
  | 'faqOrg'
  | 'cloudPricing'
  | 'cloudPricingOrg'
  | 'purchasingLicense'
  | 'support'
  | 'cloudTermsOfService'
  | 'softwareLicenseAgreement'
  | 'summaryOfChanges'
  | 'customerAgreement'
  | 'privacyPolicy'
  | 'accessPricingBilling'
  | 'contactSupport'
  | 'mac'
  | 'billingQuotes'
  | 'billingInvoices'
  | 'jpyLearnMore'
  | 'partnerDiscountDetails'
  | 'CSAT';

export type CommerceLanguages = 'en' | 'ja';

type PartialRecordt<K extends keyof any, T> = {
  [P in K]?: T;
};

export type LinksDefinition = Record<
  CommerceLinks,
  PartialRecordt<CommerceLanguages, string>
>;
