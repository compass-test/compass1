# Contracts

Commerce shared components contract testing support

# Usage
## Step 1 - generate a contract
- for a single package
  - run `yarn contract:billing-details` for example
  - After running a single command contract will be configured to run contract check for a single, last, consumer
  
- for all packages
  - run `yarn contract:all` to update contracts for all projects  
  - run `yarn generate:all` to prepare contract for all projects

## Step 2 - validate
- `yarn validate`

# Reading output
In case of having an error - keep calm and carefully compare the generated mocks and swagger documentation.
No other way.
