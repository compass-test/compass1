# @af/cache

Small caching library for fetching and storing built outputs of packages in a bolt monorepo

It is heavily inspired by https://github.com/microsoft/backfill, and also borrows some ideas from https://nx.dev/latest/react/core-concepts/computation-caching.

Differences are:

- Works with bolt
- Hashing algorithm that:
  - can exclude arbitrary glob files
  - can exclude devDependencies
  - can include declared implicit dependencies
- Custom remote caching
- Programmatic API only

Further information on the decision to create our own custom caching library: https://hello.atlassian.net/wiki/spaces/AFP/pages/1022309426/Backfill+vs+Nx+vs+Bazel

## API

See [./src/index.ts](./src/index.ts)

## Hashing

The hashing of a package is the core of the library as it keys the cache of a package and therefore determines whether a valid cache exists for a package or not.

The hash of a package is comprised of the following:

1. The file contents of the package

   - All checked in files underneath the package root according to git
   - Excluding files matching globs defined in `excludeGlobs` config

2. External dependencies of the package

   - package.json `dependencies` resolved to their version in `yarn.lock`
   - and all of their transitive dependencies

3. Internal dependencies of a package

   - The hashes of internal dependencies in the repo, i.e. other workspaces in the repo
   - Defined as per package.json `dependencies`
   - Includes transitive dependencies

4. Implicit dependencies

   - Packages and/or files declared in `implicitDependencies` config
   - These are dependencies that aren't explicitly listed under `dependencies` (or `devDependencies` if using `includeDevDependencies` config option)
   - Packages here are hashed using the same hashing algorithm, so includes transitive dependencies as well

5. Custom salt

   - Arbitrary array of strings used to salt the hash
   - Typically used for build command or runtime arguments
