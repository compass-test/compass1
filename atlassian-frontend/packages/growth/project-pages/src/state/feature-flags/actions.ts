import { FeatureFlagsState } from './types';

// set

export const SET = 'feature-flags.SET';
export type SetPayload = FeatureFlagsState;
export type SetAction = {
  type: typeof SET;
  payload: SetPayload;
};
export const set = (payload: SetPayload): SetAction => ({
  type: SET,
  payload,
});
