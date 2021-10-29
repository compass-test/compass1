# react/disallow-unstable-values

> Refrain from using functions that lead to unstable values.

## Rationale

Using these certaim fuctions may lead to unstable rendering between server and client. This means that the markup rendered on the server does not match the DOM rendered on the client.

## How the rule works

The rule tests for calls to functions that may lead to unstable values. This includes:
- Date()
- uuid()
- Math.random()
- uid()
- Date.now()
