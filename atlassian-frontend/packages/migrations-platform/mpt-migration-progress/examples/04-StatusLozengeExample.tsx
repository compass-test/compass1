import React from 'react';

import { IntlProvider } from 'react-intl';

import { StatusLozenge } from '../src';

export default function StatusLozengeExample() {
  return (
    <IntlProvider locale="en">
      <>
        <div>
          <StatusLozenge status="COMPLETE" />
        </div>
        <div>
          <StatusLozenge status="FAILED" />
        </div>
        <div>
          <StatusLozenge status="INCOMPLETE" />
        </div>
        <div>
          <StatusLozenge status="READY" />
        </div>
        <div>
          <StatusLozenge status="RUNNING" />
        </div>

        <div>
          <StatusLozenge status="ARCHIVED" />
        </div>
        <div>
          <StatusLozenge status="CHECKING" />
        </div>
        <div>
          <StatusLozenge status="EXPIRED" />
        </div>
        <div>
          <StatusLozenge status="SAVED" />
        </div>
        <div>
          <StatusLozenge status="QUEUED" />
        </div>
        <div>
          <StatusLozenge status="UNKNOWN" />
        </div>
        <div>
          <StatusLozenge status="STOPPED" />
        </div>
        <div>
          <StatusLozenge status="STOPPING" />
        </div>
        <div>
          <StatusLozenge status="TIMED_OUT" />
        </div>
      </>
    </IntlProvider>
  );
}
