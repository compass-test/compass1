# Codebase Evolutions

All the packages in this repo have a special status in the workspace.
These packages are installed in atlassian-frontend under aliases, to let Renovate manage their upgrades.
As a result we can use these packages to roll-out cross-sweeping changes across the repo.

To do so, the package will have to be modified and released to npm, after which Renovate will pick up the new version
and create upgrade PR's for all the aliases.
