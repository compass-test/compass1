import React from 'react';
import Badge from './index';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

export function Basic() {
  return (
    <>
      <Badge text="∞" />
      <Badge appearance="added" text="+27" />
      <Badge appearance="removed" text="-10" />
      <Badge appearance="important" text="3" />
      <Badge appearance="primary" text="7" />
      <Badge appearance="default" text="∞" />
    </>
  );
}
