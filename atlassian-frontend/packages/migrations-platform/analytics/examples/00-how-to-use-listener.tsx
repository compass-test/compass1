import React from 'react';

import { AnalyticsListener, ScreenEvent, TrackEvent, UIEvent } from '../src';

type AllPage = 'PageA' | 'PageB' | 'PageC';

const createScreenEvent = async (event: ScreenEvent<AllPage>) => {
  console.log('createScreenEvent');
};
const createTrackEvent = async (event: TrackEvent<AllPage>) => {
  console.log('createTrackEvent');
};
const createUIEvent = async (event: UIEvent<AllPage>) => {
  console.log('createUIEvent');
};

export default () => {
  return (
    <AnalyticsListener<AllPage>
      createScreenEvent={createScreenEvent}
      createTrackEvent={createTrackEvent}
      createUIEvent={createUIEvent}
      fallbackSourceScreen="PageB"
    >
      <p>Hello World! All the events on this page will be captured!</p>
      <p>Click the source code button to learn more</p>
    </AnalyticsListener>
  );
};
