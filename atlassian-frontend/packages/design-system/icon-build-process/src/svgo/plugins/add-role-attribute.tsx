import type { CustomSVGOPlugin } from '../../types';

const roleAttribute = {
  name: 'role',
  local: 'role',
  prefix: '',
  value: 'presentation',
};

export const addRoleAttribute: CustomSVGOPlugin = {
  type: 'full',

  active: true,

  description: 'Hides SVG elements from screen readers',

  fn(data) {
    const svg = data.content[0];
    if (svg.isElem('svg') && !svg.hasAttr(roleAttribute.name)) {
      svg.addAttr(roleAttribute);
    }
    return data;
  },
};
