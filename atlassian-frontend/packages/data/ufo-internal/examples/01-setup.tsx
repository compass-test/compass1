import React, { memo, useEffect } from 'react';

import {
  ExperiencePerformanceTypes,
  ExperienceTypes,
  UFOExperience,
  ufologger,
} from '@atlassian/ufo-experimental';

import { payloadPublisher } from '../src/core/publisher/publisher';
import { TenantType } from '../src/types';

const metric = new UFOExperience('example-2', {
  type: ExperienceTypes.Operation,
  performanceType: ExperiencePerformanceTypes.Custom,
});

export default memo(() => {
  ufologger.enable();
  metric.start();
  useEffect(() => {
    setTimeout(() => metric.success(), 100);
    setTimeout(() => {
      payloadPublisher.setup({
        product: 'my-product',
        gasv3: { sendOperationalEvent: () => {} },
        tenantType: TenantType.Synthetic,
        app: {
          version: {
            web: 'custom-example-version',
          },
        },
      });
    }, 1000);
  }, []);
  return <div>look in the console</div>;
});
