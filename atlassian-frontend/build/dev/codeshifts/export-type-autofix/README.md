# Export type autofix

This is a codeshift that fixes all violations of "TS1205 Cannot re-export a type when the --isolatedModules flag is provided" error
by exporting types via the "export type" keyword.

This leverages the in-built TS codefix by running typescript programatically. There is a few issues with the codefix though that require the `./typescript+3.9.6.patch` file
to be applied before running.

For one-off fixes, execute the codefix through VS Code directly. This codeshift is for executing the codefix across all files in the repo.
