// eslint-disable-next-line import/no-extraneous-dependencies
import { initPlugin } from 'cypress-plugin-snapshots/plugin';
import tokensPlugin from './plugin-tokens';

// @ts-ignore
module.exports = (on, config) => {
  tokensPlugin(on, config);
  initPlugin(on, config);
  return config;
};
