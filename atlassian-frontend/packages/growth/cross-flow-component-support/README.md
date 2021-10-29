# Cross Flow Component Support

This package provides access to Cross Flow API for touch points
defined outside of product codebase.

It loosely depends on `@atlassiansox/cross-flow-api-internals` (contains Cross Flow context) to
mitigate the potential issue when multiple versions of the context instantiated,
leading to the situation when correct instance of context is inaccessible by consumers.
Consequently, this moves responsibility of shipping correct API version (and shape) from NPM
(during package installation) to Cross Flow API Provider (during runtime).

## Limitations and assumptions

1. Cross Flow Support related packages maintain strict backwards compatibility for their public APIs
   until proper API versioning solution is implemented.

## Who should be using this

1. A/F Components that need to be directly integrated with Cross Flow,
   but expected to be consumed by apps that don't enforce specific A/F
   build for all their A/F dependencies.

2. Components hosted outside A/F

## Who should NOT be using this

1. Applications that want to provide Cross Flow capabilities should use `@atlassiansox/cross-flow-support` to both mount
   the provider and to get access to it's API.
