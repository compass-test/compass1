import { B400, N40 } from '@atlaskit/theme/colors';

const getIconColors = (isSelected: boolean | undefined) => {
  if (isSelected) {
    return { primary: B400, secondary: N40 };
  }
  return { primary: N40, secondary: N40 };
};

export default getIconColors;
