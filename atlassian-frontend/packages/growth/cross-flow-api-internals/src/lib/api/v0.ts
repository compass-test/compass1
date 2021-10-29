import { OnOpen, Options, CompletionStatus } from '../types';

/**
 * Version 0 of public Cross Flow API
 */
export interface APIv0 {
  open(options: Options): Promise<CompletionStatus>;
}

export const VERSION = 0;

export const createAPIv0 = (onOpen: OnOpen): APIv0 => ({
  open(options) {
    return onOpen(options);
  },
});
