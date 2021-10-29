import { CrossFlowExtensionsOptions } from './types';

export class CrossFlowExtensions {
  constructor(options: CrossFlowExtensionsOptions) {
    Object.assign(this, options);
    Object.freeze(this);
  }
}
