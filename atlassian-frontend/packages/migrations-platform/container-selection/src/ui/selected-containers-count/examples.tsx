import React from 'react';

import { IntlProvider } from 'react-intl';

import SelectedContainersCount from './index';

export default { title: 'container-selection/elements' };

export const SelectedContainersCountForSpacesExample = () => {
  return (
    <IntlProvider locale="en">
      <SelectedContainersCount containerUnit="space" total={50} selected={5} />
    </IntlProvider>
  );
};

export const SelectedContainersCountForNoPlansSelectedExample = () => {
  return (
    <IntlProvider locale="en">
      <SelectedContainersCount containerUnit="plan" total={15} selected={0} />
    </IntlProvider>
  );
};

export const SelectedContainersCountPlansSelectedExample = () => {
  return (
    <IntlProvider locale="en">
      <SelectedContainersCount containerUnit="plan" total={15} selected={6} />
    </IntlProvider>
  );
};

export const SelectedContainersCountOneOfOneProjectSelectedExample = () => {
  return (
    <IntlProvider locale="en">
      <SelectedContainersCount containerUnit="project" total={1} selected={1} />
    </IntlProvider>
  );
};
