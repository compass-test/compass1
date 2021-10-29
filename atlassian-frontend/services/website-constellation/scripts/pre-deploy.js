/* eslint-disable no-console */
const writeResolutionMap = require('./write-resolution-map');

writeResolutionMap()
  .then(() => {
    console.log('✅ Gatsby pre-setup complete!');
    process.exitCode = 0;
  })
  .catch((error) => {
    console.log('❌', error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
