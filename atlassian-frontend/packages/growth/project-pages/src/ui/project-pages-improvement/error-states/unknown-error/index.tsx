import React from 'react';
import messages from './messages';
import EmptyPageTree from '../../common/empty-page-tree';
import BaseUnknownError from '../../common/base-unknown-error';

const UnknownError = () => (
  <>
    {/* TODO EMBED-110 remove EmptyPageTree */}
    <EmptyPageTree />
    <BaseUnknownError messages={messages} />
  </>
);

export default UnknownError;
