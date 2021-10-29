import React from 'react';
import { featureFlags } from '../../../feature-flags';
import useAxios from 'axios-hooks';
import { serviceUrl } from '../../../../server/constants';
import { IntegratorHistoryGet } from '../../../../server/routes/integrator-history';
import moment from 'moment-timezone';
import Lozenge from '@atlaskit/lozenge';

const heading = <td>Product Integrator:</td>;

const showResult = (
  lozengeText: string,
  lozengeAppearance: string,
  message: any,
) => {
  return (
    <tr>
      {heading}
      <td>
        <Lozenge appearance={lozengeAppearance}>{lozengeText}</Lozenge>{' '}
        {message}
      </td>
    </tr>
  );
};

const buildLink = (buildNumber: string, message: string) => (
  <a
    target={'_blank'}
    href={
      'https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/results/' +
      buildNumber
    }
  >
    {message}
  </a>
);

export const ProductIntegratorPipeline = () => {
  const [{ loading, data, error }] = useAxios<IntegratorHistoryGet>(
    `${serviceUrl()}/api/v1/integrator-history`,
  );
  if (!featureFlags().productFabricStatus_integratorStatus) {
    return null;
  }
  if (loading) {
    return (
      <tr>
        {heading}
        <td>Loading</td>
      </tr>
    );
  }
  if (error) {
    return (
      <tr>
        {heading}
        <td>Error</td>
      </tr>
    );
  }
  if (data) {
    if (!data.lastSuccess && data.lastFailure) {
      return showResult(
        'failed',
        'removed',
        buildLink(
          data.lastFailure?.buildNumber,
          `${moment(data.lastFailure?.pipelineTimestamp).fromNow()}`,
        ),
      );
    }
    if (!data.lastFailure && data.lastSuccess) {
      return showResult(
        'success',
        'success',
        buildLink(
          data.lastSuccess.buildNumber,
          `${moment(data.lastSuccess?.pipelineTimestamp).fromNow()}`,
        ),
      );
    }
    if (data.lastSuccess && data.lastFailure) {
      if (
        moment(data.lastSuccess.pipelineTimestamp).isAfter(
          data.lastFailure.pipelineTimestamp,
        )
      ) {
        return showResult(
          'success',
          'success',
          buildLink(
            data.lastSuccess.buildNumber,
            `${moment(data.lastSuccess.pipelineTimestamp).fromNow()}`,
          ),
        );
      }
      if (
        moment(data.lastFailure.pipelineTimestamp).isAfter(
          data.lastSuccess.pipelineTimestamp,
        )
      ) {
        const message = (
          <>
            {buildLink(
              data.lastFailure.buildNumber,
              `${moment(data.lastFailure.pipelineTimestamp).fromNow()}`,
            )}{' '}
            <br />
            <span data-testid="prev-success-build">
              {`Last successful sync was `}
              {buildLink(
                data.lastSuccess.buildNumber,
                `${moment(data.lastSuccess.pipelineTimestamp).fromNow()}`,
              )}
            </span>
          </>
        );
        return showResult('failed', 'removed', message);
      }
    }
  }
  return (
    <tr>
      {heading}
      <td>No data</td>
    </tr>
  );
};
