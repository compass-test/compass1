import React, { FunctionComponent } from 'react';
import Lozenge from '@atlaskit/lozenge';
import Tooltip from '@atlaskit/tooltip';
import { ReleaseStatus } from '../../../db/entities/Release';

const TOOLTIP_POSITION = 'bottom';
const TOOLTIP_ELEMENT = 'span';

const CONFIRMATION_MSG =
  '\n\nClick into the release page to confirm which product(s).';

const TOOLTIP_MSG_PLANNED = `This release is upcoming and hasn't started yet.`;
const TOOLTIP_MSG_DEV = `This release is under active development.
  \nproduct-fabric typically represents this release.
  \nConsult 'Product Fabric Dogfooding' on the dashboard homepage to confirm. In some cases if it's stale for an extended duration that may not be accurate.`;
const TOOLTIP_MSG_STABILISING = `A release candidate has been created and is undergoing quality assurance checks. This release is imminent.
  \nProduct Fabric no longer represents this release.`;
const TOOLTIP_MSG_NPM = `This release has occured and is ready for product adoption, but it hasn't been adopted by any products yet.
  \nThe release manager is actively working with products to get it adopted.`;
const TOOLTIP_MSG_ADOPTED_FIRST = `This release has been adopted by at least one product.${CONFIRMATION_MSG}`;
const TOOLTIP_MSG_ADOPTED_ALL = `This release has been adopted by all products that intended to upgrade to it.${CONFIRMATION_MSG}`;

export const ReleaseStatusLozenge: FunctionComponent<{
  status: ReleaseStatus;
}> = ({ status }) => {
  switch (status) {
    case ReleaseStatus.planned:
      return (
        <Tooltip
          content={TOOLTIP_MSG_PLANNED}
          position={TOOLTIP_POSITION}
          tag={TOOLTIP_ELEMENT}
        >
          <Lozenge>Planned</Lozenge>
        </Tooltip>
      );
    case ReleaseStatus.development:
      return (
        <Tooltip
          content={TOOLTIP_MSG_DEV}
          position={TOOLTIP_POSITION}
          tag={TOOLTIP_ELEMENT}
        >
          <Lozenge appearance="moved">Development</Lozenge>{' '}
          <Lozenge appearance="new" isBold>
            PF
          </Lozenge>
        </Tooltip>
      );
    case ReleaseStatus.stabilising:
      return (
        <Tooltip
          content={TOOLTIP_MSG_STABILISING}
          position={TOOLTIP_POSITION}
          tag={TOOLTIP_ELEMENT}
        >
          <Lozenge appearance="inprogress">Stabilising</Lozenge>
        </Tooltip>
      );
    case ReleaseStatus['released-to-npm']:
      return (
        <Tooltip
          content={TOOLTIP_MSG_NPM}
          position={TOOLTIP_POSITION}
          tag={TOOLTIP_ELEMENT}
        >
          <Lozenge appearance="inprogress" isBold>
            Released to NPM
          </Lozenge>
        </Tooltip>
      );
    case ReleaseStatus['adopted-by-one-product']:
      return (
        <Tooltip
          content={TOOLTIP_MSG_ADOPTED_FIRST}
          position={TOOLTIP_POSITION}
          tag={TOOLTIP_ELEMENT}
        >
          <Lozenge appearance="success">Adopted by one Product</Lozenge>
        </Tooltip>
      );
    case ReleaseStatus['adopted-by-all-products']:
      return (
        <Tooltip
          content={TOOLTIP_MSG_ADOPTED_ALL}
          position={TOOLTIP_POSITION}
          tag={TOOLTIP_ELEMENT}
        >
          <Lozenge appearance="success" isBold>
            Adopted by all Products
          </Lozenge>
        </Tooltip>
      );
  }
};
