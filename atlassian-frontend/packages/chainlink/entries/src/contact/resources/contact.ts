import { createResource } from '@atlaskit/router';

export const contactResource = createResource({
  type: 'CONTACT',
  getKey: () => 'contact-quote',
  getData: async () => {
    const response = await fetch('https://got-quotes.herokuapp.com/quotes');

    return await response.json();
  },
});
