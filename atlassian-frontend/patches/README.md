# Patches

These patches are applied with the [`patch-package`](https://github.com/ds300/patch-package) tool as
part of `postinstall`.

You should not be creating new patches without talking to the AFP team first.

## Current patches

### watchpack

Added by Michael B

Patches some `close` related code that was throwing uncaught exceptions related to trying to close a directory that had already been closed. This surfaced
when trying to close webpack dev server as part of VR & webdriver test execution.
Since the close code is event emitter based and purely async, it's impossible to catch without listening to `uncaughtException` which is quite untenable to use and
prevents subsequent code from executing in certain cases.

### concurrently

Added by Michael B

This patch exposes the `kill` option via the programmatic API so that we can use it to override concurrently's default `kill` behaviour.
The default behaviour errors out in CI as it uses `ps` which is not installed in our docker image. The `kill` function is used to kill other
concurrent commands when one fails.

### @types/concurrently

Added by Michael B

Updates the types for concurrently to include the `kill` option as patched above. It was attempted to use module augmentation to update this in user land without
a patch but couldn't get it working.

### @changesets/apply-release-plan

Added by Michael B

Export getNewChangelogEntry function so we can use it directly for generating release notes.

### @changesets/cli

Added by Michael B

Reduce concurrency limit on npm requests to 5 to prevent npm rate limiting failures when publishing a large amount of packages.

Added by Jack G

Change the error message when the `.changeset/` folder doesn't work so that developers know to execute the changeset command from the root of the repo instead of trying to initialise the folder themselves.

### eslint-plugin-import

Added by Michael B

Fixes a performance regression in the plugin that was causing linting to become incredibly slow, https://github.com/benmosher/eslint-plugin-import/issues/1943. This is a
quick fix that bypasses the function causing the slowdown.

### app-root-path

Added by Jack G

Fixes typeorm not working in the backend of services where the `browser-shim` is not required.

### flowgen

Added by Max H

### request

Added by Andrew C

SHA1 hash is not safe for use, for more details see https://product-fabric.atlassian.net/wiki/spaces/AFP/pages/1799816164/DACI+How+to+solve+Vulnerability+in+request?focusedCommentId=1812168826#comment-1812168826

### node-worker-threads-pool

Added by Max H

### @atlaskit/navigation

Added by Alex H

Removes usage of `@atlaskit/theme/math` to aid our deprecation.
