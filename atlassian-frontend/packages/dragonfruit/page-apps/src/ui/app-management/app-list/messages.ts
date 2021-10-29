import { defineMessages, FormattedMessage } from 'react-intl';

import { PUBLISHED_APPS } from '../../../common/constants';

const appDescriptions: Record<string, FormattedMessage.MessageDescriptor> = {};

for (const app of PUBLISHED_APPS) {
  appDescriptions[app.intlDescriptionKey] = {
    id: `dragonfruit-apps.app-card.${app.key}-app-description`,
    defaultMessage: app.description,
    description: `Description for the ${app.name} app`,
  };
}

export default defineMessages(appDescriptions);
