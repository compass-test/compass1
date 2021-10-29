import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  appConsentModalHeading: {
    id: 'com.atlassian.migrations-platform.consent-modal.heading',
    defaultMessage: 'Agree to app data migration',
    description: 'Heading for app consent modal',
  },
  appConsetModalDescription: {
    id: 'com.atlassian.migrations-platform.consent-modal.description',
    defaultMessage:
      '{name} will have access to the following data during the course of migration:',
    description: 'Description for the app consent modal',
  },
  appConsentByVendor: {
    id: 'com.atlassian.migrations-platform.consent-modal.vendor-name',
    defaultMessage: 'by {vendorName}',
    description: 'Label for the vendor name in app consent modal',
  },
  appConsentVendorLogo: {
    id: 'com.atlassian.migrations-platform.consent-modal.vendor-logo',
    defaultMessage: '{vendorName} logo',
    description: 'Label for the vendor logo',
  },
  appConsentModalTopVendor: {
    id: 'com.atlassian.migrations-platform.consent-modal.top-vendor',
    defaultMessage: 'Top vendor',
    description: 'Label for top vendor in app consent modal',
  },
  appConsentModalMarketplaceTerms: {
    id: 'com.atlassian.migrations-platform.consent-modal.marketplace-terms',
    defaultMessage: 'terms of use',
    description: 'Marketplace terms of use',
  },
  appConsentModalVendorPrivacyPolicyLink: {
    id:
      'com.atlassian.migrations-platform.consent-modal.vendor-privacy-policy-link',
    defaultMessage: 'privacy policy',
    description: 'Privacy policy terms label',
  },
  appConsentModalVendorTermsOfUseLink: {
    id:
      'com.atlassian.migrations-platform.consent-modal.vendor-terms-of-use-link',
    defaultMessage: 'terms of use',
    description: 'Terms of use label',
  },
  appConsentModalTerms: {
    id: 'com.atlassian.migrations-platform.consent-modal.terms',
    defaultMessage:
      "By installing this app you agree to Atlassian Marketplace's {marketplaceTerms} and {vendorName}'s {vendorPrivacyPolicy} and {vendorTerms}.",
    description: 'The terms and conditions for app consent modal',
  },
  appConsentModalConfirmButton: {
    id: 'com.atlassian.migrations-platform.consent-modal.confirm-button',
    defaultMessage: 'Confirm',
    description: 'The confirm button for app consent modal',
  },
  appConsentModalCancelButton: {
    id: 'com.atlassian.migrations-platform.consent-modal.cancel-button',
    defaultMessage: 'Cancel',
    description: 'The cancel button for app consent modal',
  },
  scopeDescriptionAppDataOther: {
    id: 'com.atlassian.migrations-platform.consent-modal.scope.app-data-other',
    defaultMessage:
      'Read and export app data containing any other information stored by {appName}.',
    description: 'App data other scope description',
  },
  scopeDescriptionAppDataPii: {
    id: 'com.atlassian.migrations-platform.consent-modal.scope.app-data-pii',
    defaultMessage:
      'Read and export app data containing personally identifiable information like usernames, emails or addresses.',
    description:
      'App data personally identifiable information scope description',
  },
  scopeDescriptionAppDataSecurity: {
    id:
      'com.atlassian.migrations-platform.consent-modal.scope.app-data-security',
    defaultMessage:
      'Read and export app data containing security details like passwords, tokens or secrets.',
    description: 'App data security scope description',
  },
  scopeDescriptionAppDataUgc: {
    id: 'com.atlassian.migrations-platform.consent-modal.scope.app-data-ugc',
    defaultMessage:
      'Read and export app data containing content created by users.',
    description: 'App data user generated content scope description',
  },
  scopeDescriptionMigrationTracingIdentity: {
    id:
      'com.atlassian.migrations-platform.consent-modal.scope.mig-tracing-identity',
    defaultMessage: 'Read user and group information.',
    description: 'Migration tracing identity scope description',
  },
  scopeDescriptionMigrationTracingProduct: {
    id:
      'com.atlassian.migrations-platform.consent-modal.scope.mig-tracing-product',
    defaultMessage:
      'Read product-related data like pages, sites, issues and projects.',
    description: 'Migration tracing product scope description',
  },
  scopeDescriptionProductDataOther: {
    id:
      'com.atlassian.migrations-platform.consent-modal.scope.product-data-other',
    defaultMessage:
      'Read and export product data containing any other information stored by Atlassian.',
    description: 'Product data other scope description',
  },
  scopeDescriptionProductDataPii: {
    id:
      'com.atlassian.migrations-platform.consent-modal.scope.product-data-pii',
    defaultMessage:
      'Read and export product data containing personally identifiable information like usernames, emails or addresses.',
    description:
      'Product data personally identifiable information scope description',
  },
  scopeDescriptionProductDataSecurity: {
    id:
      'com.atlassian.migrations-platform.consent-modal.scope.product-data-security',
    defaultMessage:
      'Read and export product data containing security details like passwords, tokens or secrets.',
    description: 'Product data security scope description',
  },
  scopeDescriptionProductDataUgc: {
    id:
      'com.atlassian.migrations-platform.consent-modal.scope.product-data-ugc',
    defaultMessage:
      'Read and export product data containing content created by users.',
    description: 'Product data user generated content scope description',
  },
});
