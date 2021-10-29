# Use cases

This documents some end to end workflows surrounding this service.

# /integrator-status

Our integrator build sends a POST /integrator-status to our service in its 'final' stage with status

## Pull request exists for the specified branch and latest commit matches

Service posts a PR comment with the status detailing the product, branch link, branch deploy link and integrator build link.

## Pull request does not exist for the specified branch or the latest commit of the PR does not match

Do not post a PR comment

## Integrator build succeeded but did not install any packages

Do not post a PR comment as no branch would be created in the product and adds unnecessary noise.

## Matching PR exists and has an existing comment for another product's integrator build for the latest commit

Existing PR comment is deleted and a new one is created that contains both the existing integrator status for the other product plus the new one

## Matching PR exists and has an existing comment for the same product's integrator build for a previous commit

Replaces existing PR comment with the integrator status for the new integrator build

# Open questions

## Matching PR exists and has an existing comment for both the same product and a different product on a previous commit

Currently overrides both.
