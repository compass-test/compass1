const animation = require('./animation');
const circularDependencies = require('./circular-dependencies');
const codeStructure = require('./code-structure');
const dragAndDrop = require('./drag-and-drop');
const experienceReliability = require('./experience-reliability');
const featureFlags = require('./feature-flags');
const flags = require('./flags');
const importStructure = require('./import-structure');
const loadingCodeWhenRequired = require('./loading-code-when-required');
const packageBoundaries = require('./package-boundaries');
const routing = require('./routing');
const securityChecks = require('./security-checks');
const sharedState = require('./shared-state');
const styling = require('./styling');
const treeShaking = require('./tree-shaking');
const typeSafety = require('./type-safety');
const unitTestingComponents = require('./unit-testing-components');

module.exports = [
  typeSafety,
  codeStructure,
  packageBoundaries,
  circularDependencies,
  importStructure,
  treeShaking,
  routing,
  loadingCodeWhenRequired,
  styling,
  animation,
  dragAndDrop,
  flags,
  unitTestingComponents,
  experienceReliability,
  securityChecks,
  sharedState,
  featureFlags,
];
