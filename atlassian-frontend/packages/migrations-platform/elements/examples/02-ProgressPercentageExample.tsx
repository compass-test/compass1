import React from 'react';

import { IntlProvider } from 'react-intl';

import { ProgressPercentage } from '../src';

export default function ProgressPercentageExample() {
  return (
    <IntlProvider locale="en">
      <>
        <div>
          <ProgressPercentage status="READY" progress={0} />
        </div>
        <div>
          <ProgressPercentage status="RUNNING" progress={0} />
        </div>
        <div>
          <ProgressPercentage status="RUNNING" progress={50} />
        </div>
        <div>
          <ProgressPercentage status="COMPLETE" progress={100} />
        </div>
        <div>
          <ProgressPercentage status="INCOMPLETE" progress={80} />
        </div>
        <div>
          <ProgressPercentage status="FAILED" progress={75} />
        </div>
        <div>
          <ProgressPercentage status="TIMED_OUT" progress={75} />
        </div>
      </>
    </IntlProvider>
  );
}
