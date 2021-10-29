import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<
  'contactVendor' | 'viewDifferences' | 'viewListing' | 'viewRoadmap',
  FormattedMessage.MessageDescriptor
>;

export default defineMessages<Messages>({
  contactVendor: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-has-cloud-value.contact-vendor',
    defaultMessage: 'Contact vendor',
    description:
      'Indicates that the admin should contact vendor for help regarding this app migration',
  },
  viewListing: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-has-cloud-value.view-listing',
    defaultMessage: 'View listing',
    description:
      'Indicates that the admin can see the marketplace listing of the app',
  },
  viewDifferences: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-has-cloud-value.view-differences',
    defaultMessage: 'View differences',
    description:
      'Indicates that the admin can see the differences of cloud and server of the app via the provided url',
  },
  viewRoadmap: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-has-cloud-value.view-differences',
    defaultMessage: 'View roadmap',
    description:
      'Indicates that the admin can view the vendor roadmap documentation if available',
  },
});
