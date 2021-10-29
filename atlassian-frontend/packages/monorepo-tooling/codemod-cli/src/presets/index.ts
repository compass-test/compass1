import path from 'path';

/**
 * Manually import presets to make sure typescript includes them
 * in the final bundle
 */
import './styled-to-emotion/styled-to-emotion';

const presets = ['styled-to-emotion'].map((preset) =>
  path.join(__dirname, preset, `${preset}.@(ts|js)`),
);

export default presets;
