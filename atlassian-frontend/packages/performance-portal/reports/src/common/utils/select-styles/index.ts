import { N500 } from '@atlaskit/theme/colors';
import { fontFamily, fontSize } from '@atlaskit/theme/constants';

export const selectStyles = {
  singleValue: (base: {}) => ({
    ...base,
    fontSize: fontSize(),
    fontWeight: 500,
    fontFamily: fontFamily(),
    color: N500,
  }),
};
