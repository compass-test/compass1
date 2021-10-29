# Generate types

## What is it?

Generates a dictionary of types mapped to imports at ./types.tsx, which is used to support dynamic imports.

Types are generated from the icons that are available at Atlaskit's icon package. We will need to run this script from time to time, for example when Atlaskit icons are added or removed.

### Run:

From the `packages/forge/core/src/components/icon` directory:

```
$ ./scripts/generate-types
```

Expected output: file created/updated at `./types.tsx`.
