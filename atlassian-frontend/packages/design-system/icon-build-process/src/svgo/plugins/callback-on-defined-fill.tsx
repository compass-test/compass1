import type { CustomSVGOPlugin } from '../../types';

export const callbackOnDefinedFill: CustomSVGOPlugin = {
  type: 'perItem',

  active: true,

  description: exports.description = 'callback when it finds a color fill',

  params: {
    allowedValues: ['currentColor', 'none', 'inherit'],
    callback: console.log.bind(console), // eslint-disable-line no-console
  },

  fn(item, params) {
    let fill;

    if (item.hasAttr('fill')) {
      fill = item.attr('fill').value;

      if (fill && params.allowedValues.indexOf(fill) === -1) {
        params.callback(fill);
      }
    }
  },
};
