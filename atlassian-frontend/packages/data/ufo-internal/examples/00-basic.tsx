import React, { memo, useEffect } from 'react';

import { initUFO } from '../example-helper/setup-publisher';
import {
  ExperiencePerformanceTypes,
  ExperienceTypes,
  UFOExperience,
} from '../src';

initUFO();

const metric = new UFOExperience('example', {
  type: ExperienceTypes.Operation,
  performanceType: ExperiencePerformanceTypes.Custom,
});

export default memo(() => {
  metric.start();
  useEffect(() => {
    setTimeout(() => metric.success(), 100);
  }, []);
  return <div>look in the console</div>;
});
