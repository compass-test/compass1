# @atlassian/af-product-integration

## 1.0.17

### Patch Changes

- [`5ff63e39dc3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ff63e39dc3) - Remove ec2 compute from lambda services

## 1.0.16

### Patch Changes

- [`f3799e8cb2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3799e8cb2a) - Update organisation field in service descriptor

## 1.0.15

### Patch Changes

- [`4787db30df1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4787db30df1) - Update `@af/af-product-integration`, especially, the routes of the `/integrator-status` to adapt and use data from Bitbucket pipelines instead of Bamboo.

## 1.0.14

### Patch Changes

- [`2c4e828530f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c4e828530f) - Bump `aws-sdk` from `2.631.0` to `2.897.0` to fix a vulnerability [issue](fix https://sca.analysiscenter.veracode.com/vulnerability-database/vulnerabilities/29033).

  See this [ticket](https://asecurityteam.atlassian.net/browse/VULN-386209), for further information.

## 1.0.13

### Patch Changes

- [`13d8a3b16d6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/13d8a3b16d6) - Upgrade @atlassian/micros-serverless-platform dependency to 0.0.9 to fix a security vulnerability in transitive aws-sdk dependency

## 1.0.12

### Patch Changes

- [`bdd159c6cb8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdd159c6cb8) - Remove unused code, dependencies and replace by the new product integrator logic.

## 1.0.11

### Patch Changes

- [`3c9b461e68d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c9b461e68d) - Remove unused code, improve deployment and replace by the new product integrator logic.

## 1.0.10

### Patch Changes

- [`f8c71d947c5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f8c71d947c5) - Revert to previous deployment command (was changed accidentally).

## 1.0.9

### Patch Changes

- [`7783aedafde`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7783aedafde) - Add ip_whitelist attribute to the globaledge resource.

## 1.0.8

### Patch Changes

- [`6d614bafdc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6d614bafdc) - Fix for SOX deployment part 2.

## 1.0.7

### Patch Changes

- [`155ff88ef5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/155ff88ef5) - Fix deployment to use MICROS_ENV

## 1.0.6

### Patch Changes

- [`79886bf7ae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/79886bf7ae) - Add Jira branch deploy link to afp-bot comment

## 1.0.5

### Patch Changes

- [`cf08a85e91`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf08a85e91) - Update Jira (spinner only) to Jira.

## 1.0.4

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 1.0.3

### Patch Changes

- Updated dependencies

## 1.0.2

### Patch Changes

- [`64e7f3f077`](https://bitbucket.org/atlassian/atlassian-frontend/commits/64e7f3f077) - Bump dependency query-string to ^5.1.0

## 1.0.1

### Patch Changes

- Updated dependencies

## 1.0.0

### Major Changes

- [`f013f4aaa6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f013f4aaa6) - Initial version of af-product-integration service

### Patch Changes

- Updated dependencies
