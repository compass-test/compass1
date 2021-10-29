import { EventHandlers } from '@atlaskit/editor-common';

export const rendererEventHandlers: EventHandlers = {
  link: {
    onClick: (event: any, url?: string) => {
      // Intercept link event and open in another window stripping any opener or referrer info
      event.preventDefault();
      window!.open(url, '_blank', 'noopener noreferrer');
    },
  },
};
