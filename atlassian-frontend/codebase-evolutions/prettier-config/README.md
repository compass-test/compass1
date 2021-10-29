# Prettier-config

This is the prettier-config used by the atlassian-frontend monorepo.
To facilitate changes to this file, it is only supposed to be depended on as an alias.
Look at the other packages for an example. It can be added by running:

```
bolt add @atlassian/atlassian-frontend-prettier-config-1.0.0
```

If there is a newer version available Renovate will create a upgrade PR for the packages your team owns.

Changes to the prettier-config don't affect the repo immediately. Instead they are published to npm
first using the regular changesets tooling. Renovate will then create upgrade PR's split by teams
.
