# flow-cli

Creates flow declarations based with flowgen and adds custom modifications.

Author: @mheinz

## RUN

```
yarn run flow-cli create --source ./node_modules/@atlaskit/analytics-next/dist/esm/index.d.ts --destination ./src/packages/platform/repo-tools/flowtype/src/definitions/@atlaskit/analytics-next/index.js.flow
```

For more help run: `yarn run flow-cli`

Debug:

```
DEBUG=* yarn run flow-cli create --source ./node_modules/@atlaskit/analytics-next/dist/esm/index.d.ts --destination ./src/packages/platform/repo-tools/flowtype/src/definitions/@atlaskit/analytics-next/index.js.flow
```
