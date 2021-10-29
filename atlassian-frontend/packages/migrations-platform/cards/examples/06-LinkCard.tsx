import React from 'react';

import { LinkCard } from '../src';

export default function LinkCardExample() {
  return (
    <div style={{ width: 300, margin: '1% auto' }}>
      <LinkCard
        href="https://atlassian.com"
        imageUrl="https://images.ctfassets.net/8j5aqoy0ts8s/3V650c91OiNdKFEHshpKMs/e3913190d8e406b3acf0fa13b6055c63/atlassian-blue-logo.png"
        title="Test title"
      />
    </div>
  );
}
