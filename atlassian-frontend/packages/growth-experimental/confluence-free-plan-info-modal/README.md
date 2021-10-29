# ConfluenceFreePlanInfoModal

Info modal used in the JSW -> Confluence Silent Bundling project. Read more about it here: https://hello.atlassian.net/wiki/spaces/PGT/pages/995525646/JSW+-%3E+Confluence%3A+Silent+Bundling

Shows information detailing the features & benefits of Confluence free. This will be triggered in adminhub on the manage subscriptions page, as well as project pages - triggered by an experimental banner. Both are feature flagged as part of this experiment.

## Usage

import React, { useState } from 'react';

import ConfluenceFreePlanInfoModal from '@atlassiansox/confluence-free-plan-info-modal';

export default function Basic() {
const [open, setOpen] = useState(false);

const mockCallback = () => setOpen(false);

return (
<>
<button onClick={() => setOpen(true)}>Open Modal</button>
<ConfluenceFreePlanInfoModal
        isOpen={open}
        onClose={mockCallback}
        onPrimaryActionClick={mockCallback}
        onSecondaryActionClick={mockCallback}
      />
</>
);
}
