import type { CustomSVGOPlugin } from '../../types';

export const callbackOnStyleElement: CustomSVGOPlugin = {
  type: 'perItem',

  active: true,

  description: 'callback when it finds a style element',

  params: {
    callback: console.log.bind(console), // eslint-disable-line no-console
  },

  fn(item, params) {
    if (item.isElem('style')) {
      params.callback();
    }
  },
};
