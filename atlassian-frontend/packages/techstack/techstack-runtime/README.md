# Techstack runtime

## Using Techstack CLI to update the techstack in the repository

The _techstack-runtime_ node package comes with a CLI tool to perform operations on the techstack using the CLI. The available options are:

- Validating the techstack in the repository
- Add/ Remove a solution from repository techstack, default techstack or package techstack

### Techstack validation using the CLI

To validate the usage of techstack (i.e. the inheritance model of defining techstack), you can run

```
bolt techstack validate
```

This would validate your default and package techstacks against the repository techstack. The idea here is that default and package techstacks can only be a subset of repository techstack.

### Adding a solution to the techstack using the CLI

Addition of solution to the repository, default or package techstack can be done using the cli. You need to run

```
bolt techstack update add

? Where would you need to add the use case? (Use arrow keys)
❯ repository
  default
  specific package

? Which definition is the use case present? (Use arrow keys)
❯ @atlassian/frontend

? Select the use case (Use arrow keys)
❯ animation
  typing
  code-structure
  package-boundaries
  circular-dependencies
  import-structure
  routing

? Select the solution (Use arrow keys)
❯ atlaskit-motion

Solution atlaskit-motion added to repository techstack.
```

### Removing a solution from the techstack using the CLI

A solution can be removed from repository, default or package techstack using the cli. You need to run

```
bolt techstack update remove
? Where would you need to add/remove the use case? (Use arrow keys)
❯ repository
  default
  specific package

? Which definition is the use case present? (Use arrow keys)
❯ @atlassian/frontend

? Select the use case
  animation
  typing
  code-structure
❯ package-boundaries
  circular-dependencies
  import-structure
  routing
(Move up and down to reveal more choices)

? Select the solution (Use arrow keys)
❯ linting

Solution linting removed from repository techstack.
```

### CLI Help

To see the options available in the CLI, you can run

```
bolt techstack --help

Usage: techstack [options][command]

Options:
-h, --help output usage information

Commands:
update|u <operation> Update a use case and solution for repository/ default or package techstack
validate|v Validate the techstack in the repository
```
