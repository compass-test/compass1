/** @jsx jsx */

import React, { useEffect, useMemo } from 'react';
import { useResource, useRouter } from 'react-resource-router';
import { jsx, css } from '@emotion/core';
import Select from '@atlaskit/select';

import { servicesResource } from '../../resources/services';

const overrides = css`
  margin-top: 7px;
  min-width: 200px;
`;

export const ServiceSelector: React.FC = () => {
  const [{ match }, { push }] = useRouter();
  const { loading, error, data, refresh } = useResource(servicesResource);

  const {
    params: { service },
  } = match;
  const { services } = data ?? {};

  // Since the Header is not a route the resource isn't loaded by the router
  // so we need to manually trigger the fetch
  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () =>
      service
        ? {
            value: service,
            label: service,
          }
        : null,
    [service],
  );

  if (error) {
    console.error(error);
    alert(
      'Auth has expired, please reload the page. If this problem persists contact AFP.',
    );
  }

  return (
    <Select
      css={overrides}
      className="single-select"
      classNamePrefix="react-select"
      options={
        services &&
        services.map(service => ({
          label: service,
          value: service,
        }))
      }
      onChange={option => push(`/${option?.value}`)}
      isLoading={loading}
      value={value}
      placeholder="Select a service"
    />
  );
};
