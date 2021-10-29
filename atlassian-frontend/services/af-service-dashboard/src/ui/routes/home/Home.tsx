/** @jsx jsx */

import React from 'react';
import { jsx } from '@emotion/core';

import { homeContainer, mainImage, intextImage } from './styles';
import { center } from '../../styles';

// eslint-disable-next-line import/no-unresolved
import balloons from 'images/balloons.svg';
// eslint-disable-next-line import/no-unresolved
import deployment from 'images/deployment-card.png';

export const Home = () => {
  return (
    <React.Fragment>
      <div css={homeContainer}>
        <div css={center}>
          <div>
            <img css={mainImage} src={balloons} alt={'status balloons'} />
          </div>
          <h1>Service Dashboard</h1>
        </div>
        <h2>Introduction</h2>
        <p>
          The Service Dashboard displays deployment history and information for
          services within the Atlassian Frontend Monorepo.
        </p>
        <p> As a developer or service owner you can use this dashboard to:</p>
        <ul>
          <li>
            Easily view information about a service's deployment history,
            status, and metadata.
          </li>
          <li>Quickly roll back a deployment, to minimise service downtime.</li>
          <li>
            Pause/unpause deployments for services, to prevent overriding a
            rolled back service.
          </li>
        </ul>
        <h2>Getting Set-up</h2>
        <p>
          See the{' '}
          <a href="https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/05-service-support/">
            Service Support docs
          </a>{' '}
          for configuring your service so that its deployments can be displayed
          within the Service Dashboard.
        </p>
        <h2>Viewing Deployment History</h2>
        <p>
          Use the selector at the top of the page to navigate to your service's
          dashboard page and view its deployment history.
        </p>
        <p>
          Deployment cards are organised by environment and display each
          deployment's build number, upload date and time, and status. A link to
          the deployment pipeline and if relevant, the uploaded Statlas
          artefact, will also be displayed on the card.
        </p>
        <div css={center}>
          <img css={intextImage} src={deployment} alt={'deployment card'} />
        </div>
        <h3>Actions</h3>
        <p>
          There are two main actions that can be taken from the Service
          Dashboard:
        </p>
        <ol>
          <li>
            <b>Pause Deployments:</b> The 'Lock Deployment' toggle located at
            the top of the service's page can be used to pause deployments for
            this service. All deployment attempts will fail the service
            deployment pipeline while this toggle is checked.
          </li>
          <li>
            <b>Rollback:</b> Each successful deployment of a static service from
            master will also upload your built service as a Statlas artefact.
            This artefact can then be used to rollback to that deployment using
            the 'Rollback' button located on the deployment card.
          </li>
        </ol>
      </div>
    </React.Fragment>
  );
};
