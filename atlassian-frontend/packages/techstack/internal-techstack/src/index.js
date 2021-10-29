const analytics = require('./analytics');
const deprecation = require('./deprecation');
const designSystem = require('./design-system');
const isolatedComponentDevelopment = require('./isolated-component-development');
const styling = require('./styling');
const theming = require('./theming');
const treeShaking = require('./tree-shaking');
const uiComponents = require('./ui-components');

module.exports = [
  analytics,
  designSystem,
  deprecation,
  isolatedComponentDevelopment,
  uiComponents,
  styling,
  theming,
  treeShaking,
];
