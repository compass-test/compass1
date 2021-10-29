import type { CustomSVGOPlugin } from '../../types';

export const replaceIDs: CustomSVGOPlugin = {
  type: 'perItem',

  active: true,

  description: 'Replace static linearGradient IDs with a variable placeholder',

  params: {
    placeholderStr: 'idPlaceholder',
  },

  fn(item, opts) {
    const { placeholderStr } = opts;

    if (item.isElem('linearGradient') && item.hasAttr('id')) {
      // eslint-disable-next-line no-param-reassign
      item.attrs.id.value += `-${placeholderStr}`;
    } else if (item.hasAttr('fill')) {
      const fillAttr = item.attr('fill');
      const replacedFillValue = fillAttr.value.replace(
        /\burl\(("|')?#(.+?)\1\)/,
        `url(#$2-${placeholderStr})`,
      );

      // eslint-disable-next-line no-param-reassign
      item.attrs.fill.value = replacedFillValue;
    }

    return item;
  },
};
