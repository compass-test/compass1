# ESLint Tests

This package contains tests for eslint to guard against eslint rules silently failing.

## How it works

Within the `/files` directory, there are files with specific eslint violations in them that have been suppressed with `eslint-disable-next-line <rule_name>`. To test that eslint rules are turned on, we can run eslint over the files with the `--report-unused-disable-directives` flag. An error indicates that there are unused disable directives as a result of a linting rule being unexpectantly turned off. There are also tests for

There are also files with lines that do not violate the tested eslint rules - these are used for testing for false positives.

## Local testing

Steps to add a test for a new eslint rule:

1. Add a new files under `/files` which violates the eslint rule.
2. Run linting with `yarn test-eslint` and ensure it detects the violation and fails.
3. Use an eslint disable comment to suppress the violation.
4. Run linting and ensure it passes.
5. Turn the eslint rule off using an override in `.eslintrc`.
6. Run linting and ensure it detects the unused disable and fails.
7. Remove the override from `.eslintrc`.

[**Jira Ticket link**](https://product-fabric.atlassian.net/jira/software/projects/AFP/boards/484?selectedIssue=AFP-2246)
