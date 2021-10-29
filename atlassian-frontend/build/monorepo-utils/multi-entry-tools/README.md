# multi-entry-tools

Generate path resolution maps for TypeScript and bundlers in `atlassian-frontend`.

Primary use cases are generating `tsconfig.entry-points.json` and enabling local module resolution in webpack.

## CLI usage

```sh
# Emit the path resolution map as JSON on stdout
node build/monorepo-utils/multi-entry-tools/cli/get-multi-entry-map.js

# Emit tsconfig paths as JSON on stdout
node build/monorepo-utils/multi-entry-tools/cli/get-tsconfig-path.js
```

## API usage

```ts
import { moduleResolveMapBuilder } from '@atlaskit/multi-entry-tools';

async function main() {
  const resolveMap = await moduleResolveMapBuilder();
}
```
