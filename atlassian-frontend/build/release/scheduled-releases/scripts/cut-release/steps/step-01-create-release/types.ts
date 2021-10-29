import { StepFunction } from '../../types';

interface StepCreateReleaseOpts {
  currRelease: string;
  nextRelease: string;
}
export type StepCreateRelease = StepFunction<StepCreateReleaseOpts>;
