// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useEffect, useState } from 'react';

import { useCommerceFetch } from '../src';
import {
  clientFailure,
  CommerceMockedEnvironment,
  error,
  ok,
  Scenario,
  serverFailure,
  url,
} from '../src/mocks';

const CommerceComponent1 = () => {
  const fetch = useCommerceFetch();
  const [state, setState] = useState('fetching...');

  useEffect(() => {
    setState('fetching...');
    fetch('/test1')
      .then((f) => f.json())
      .then((result) => setState(result))
      .catch((e) => setState('failure: ' + e.message));
  }, [fetch]);

  return <div> component 1: {state}</div>;
};

const CommerceComponent2 = () => {
  const fetch = useCommerceFetch();
  const [state, setState] = useState('fetching...');

  useEffect(() => {
    setState('fetching...');
    fetch('/test2')
      .then((f) => f.json())
      .then((result) => setState(result))
      .catch((e) => setState('failure' + e.message));
  }, [fetch]);

  return <div> component 2: {state}</div>;
};

const scenarios = {
  component1Ok: {
    request: url('/test1'),
    response: ok('component 1 ok'),
  },
  component1Error: {
    request: url('/test1'),
    response: error('component 1 error'),
  },
  component1Failure: {
    request: url('/test1'),
    response: serverFailure('component 1 server failure'),
  },
  component2Ok: {
    request: url('/test2'),
    response: ok('component 2 ok'),
  },
  component2Error: {
    request: url('/test2'),
    response: error('component 2 error'),
  },
  component2Failure: {
    request: url('/test2'),
    response: clientFailure('component 2 client failure'),
  },
};

export default () => {
  const [scenario1, setScenario1] = useState<Scenario>(scenarios.component1Ok);
  const [scenario2, setScenario2] = useState<Scenario>(scenarios.component2Ok);

  return (
    <>
      <label>
        <input
          type="radio"
          checked={scenario1 === scenarios.component1Ok}
          onChange={() => setScenario1(scenarios.component1Ok)}
        />
        ok component1
      </label>
      <label>
        <input
          type="radio"
          checked={scenario1 === scenarios.component1Error}
          onChange={() => setScenario1(scenarios.component1Error)}
        />
        error component1
      </label>
      <label>
        <input
          type="radio"
          checked={scenario1 === scenarios.component1Failure}
          onChange={() => setScenario1(scenarios.component1Failure)}
        />
        fail component1
      </label>
      <br />
      <label>
        <input
          type="radio"
          checked={scenario2 === scenarios.component2Ok}
          onChange={() => setScenario2(scenarios.component2Ok)}
        />
        ok component2
      </label>
      <label>
        <input
          type="radio"
          checked={scenario2 === scenarios.component2Error}
          onChange={() => setScenario2(scenarios.component2Error)}
        />
        error component2
      </label>
      <label>
        <input
          type="radio"
          checked={scenario2 === scenarios.component2Failure}
          onChange={() => setScenario2(scenarios.component2Failure)}
        />
        fail component2
      </label>

      <CommerceMockedEnvironment scenarios={[scenario1, scenario2]}>
        <CommerceComponent1 />
        <CommerceComponent2 />
      </CommerceMockedEnvironment>
    </>
  );
};
