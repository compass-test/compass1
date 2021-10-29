import { B300, G300, R300, Y300 } from '@atlaskit/theme/colors';

import { getColorForProgress } from './index';

describe('ProgressBar tests', () => {
  let colorProgress: string | undefined;

  it('Should display gray for 0%', () => {
    colorProgress = getColorForProgress(0);

    expect(colorProgress).toBe('#C4C4C4');
  });

  it('Should display red for <=40%', () => {
    colorProgress = getColorForProgress(34);

    expect(colorProgress).toBe(R300);
  });

  it('Should display yellow for >40% and <=60%', () => {
    colorProgress = getColorForProgress(57);

    expect(colorProgress).toBe(Y300);
  });

  it('Should display blue for >60% and <=80%', () => {
    colorProgress = getColorForProgress(65);

    expect(colorProgress).toBe(B300);
  });

  it('Should display green for >80% and <=100%', () => {
    colorProgress = getColorForProgress(90);

    expect(colorProgress).toBe(G300);
  });
});
