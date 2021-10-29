import { B400, N40 } from '@atlaskit/theme/colors';

import getIconColors from '../get-icon-colors';

describe('get icon colors', () => {
  it('returns colors for selected status', () => {
    const colors = getIconColors(true);
    expect(colors).toEqual({
      primary: B400,
      secondary: N40,
    });
  });

  it('returns colors for unselected status', () => {
    const colors = getIconColors(false);
    expect(colors).toEqual({
      primary: N40,
      secondary: N40,
    });
  });

  it('returns colors for undefined status', () => {
    const colors = getIconColors(undefined);
    expect(colors).toEqual({
      primary: N40,
      secondary: N40,
    });
  });
});
