import type { CustomSVGOPlugin } from '../../types';

export const removeNamespacedAttributes: CustomSVGOPlugin = {
  type: 'perItem',

  active: true,

  description:
    'Removes attributes with a namespace (e.g. xmlns:link, ns:foo, ...)',

  fn(item) {
    item.eachAttr((attr: any) => {
      if (attr.prefix && attr.local) {
        item.removeAttr(attr.name);
      }
    });
  },
};
