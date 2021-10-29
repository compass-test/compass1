import React from 'react';
import messages from './messages';
import EmptyPageTree from '../../common/empty-page-tree';
import mountTrackerFactory from '../../../../common/analytics/mount-tracker-factory';
import BaseUnknownError from '../../common/base-unknown-error';

const MountTracker = mountTrackerFactory('PageTreeUnknownError');

const PageTreeUnknownError = () => (
  <>
    {/* TODO EMBED-110 remove EmptyPageTree */}
    <EmptyPageTree />
    <BaseUnknownError messages={messages} />
    <MountTracker />
  </>
);

export default PageTreeUnknownError;
