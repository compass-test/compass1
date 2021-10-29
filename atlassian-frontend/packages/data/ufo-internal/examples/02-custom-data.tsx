import React, { memo, useEffect } from 'react';

import {
  ExperiencePerformanceTypes,
  ExperienceTypes,
  UFOExperience,
} from '@atlassian/ufo-experimental';

import { initUFO } from '../example-helper/setup-publisher';

initUFO();

const metric = new UFOExperience('example-3', {
  type: ExperienceTypes.Operation,
  performanceType: ExperiencePerformanceTypes.Custom,
});

export default memo(() => {
  metric.start();
  metric.addMetadata({ started: true });
  useEffect(() => {
    setTimeout(() => metric.addMetadata({ fromTimeout: 4 }));
    setTimeout(
      () => metric.success({ metadata: { extraPart: 'example' } }),
      100,
    );
  }, []);
  return <div>look in the console</div>;
});
