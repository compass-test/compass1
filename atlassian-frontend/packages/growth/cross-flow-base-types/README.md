# Cross Flow Base

Package to define base classes and types supporting the architecture of plugins and extensions that are used within Cross Flow packages.

This is not a dumping ground for all types for all things in `cross-flow-*` packages. The intention is for this package to be relatively stable, requiring very infrequent updates. Please consider options very carefully before adding new types or classes in here.

This package is owned and maintained by the Cross Flow Essentials team.

For information and advice about defining new extensions or plugins, please consult with the Cross Flow Essentials team.

Slack: #team-cross-flow-essentials

This package should only be a direct dependency of other `cross-flow-*` packages.

## Note about Extensions

Applications should not construct extension objects using `CrossFlowExtensions` directly, but should instead create extensions using the factory functions defined in `@atlassiansox/cross-flow-extensions`.
