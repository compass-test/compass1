import React from 'react';

import StatusIcon from '../src';

export default () => (
  <div id="status-icons" style={{ width: 200 }}>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon status="PENDING" />
    </div>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon status="SUCCESSFUL" />
    </div>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon status="FAILED" />
    </div>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon status="PAUSED" />
    </div>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon status="HALTED" />
    </div>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon status="STOPPED" />
    </div>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon status="IN_PROGRESS" />
    </div>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon status="REDEPLOY" />
    </div>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon status="RERUN" />
    </div>
    <h3>Without Label</h3>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon status="SUCCESSFUL" isLabelHidden />
    </div>
    <h3>With Tooltip</h3>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon status="IN_PROGRESS" tooltipContent="In progress" />
    </div>
    <div style={{ margin: '15px 0' }}>
      <StatusIcon
        status="SUCCESSFUL"
        isLabelHidden
        tooltipContent="Successful"
      />
    </div>
  </div>
);
