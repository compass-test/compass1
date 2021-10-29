# 💸 Commerce CreditCard form

A standalone credit card (CC) form

## Requirements

- Written in React, but does not require target application to be also be written in React

## Installation

```
yarn add @atlassian/commerce-credit-card-base
```

## Examples

The most up to date usage can be seen in examples:

- See the [/examples](./examples)

## Quick start

```jsx
import { CCPCreditCardFormState, CreditCardForm, useCCPCreatePaymentMethodAndConfirmCardSetup } from '@atlassian/commerce-credit-card-ccp';

const SubmitButton = () => {
  const confirm = useCCPCreatePaymentMethodAndConfirmCardSetup();
  return (
    <button onClick={() => {
      const result = await confirm();
      console.log("You'll need to send data in this payload to CCP", result);
    }}>Submit</button>
  )
};

export const CreditCardExample = () => {
  return (
    <CCPCreditCardFormState accountId="This is CCP's transaction account ID">
      <CreditCardForm />
    </CCPCreditCardFormState>
  );
}
```

## Usage without JSX

Just mount React to where it is needed. For example:

```jsx
import React from 'react';
import { render } from 'react-dom';

render(
  React.createElement(
    CCPCreditCardFormState, // component
    { accountId: 'testGroup' }, //props
    React.createElement(CreditCardForm), // children
  ),
  document.getElementById(
    'the-id-of-the-element-you-want-to-render-your-CC-in',
  ),
);
```
