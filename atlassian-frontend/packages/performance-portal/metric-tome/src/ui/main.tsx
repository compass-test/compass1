/* eslint-disable relay/generated-flow-types */
import React from 'react';

import { graphql, useLazyLoadQuery } from 'react-relay';

import Button, { ButtonGroup } from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import AKModal, {
  ModalTransition as AKModalTransition,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import SectionMessage from '@atlaskit/section-message';
import { SendScreenEvent } from '@atlassian/performance-portal-analytics';
import { Loading } from '@atlassian/performance-portal-common';

import type { mainTomeModalQuery } from './__generated__/mainTomeModalQuery.graphql';
import { Container, StyledFooter } from './styled';

export interface Props {
  experienceId: string;
  isOpen: boolean;
  closeModalHandler: () => void | Promise<void>;
}

const MODAL_HEADING_TITLE = 'TOME Capability SLOs';

const headerCellsMap: Record<string, any> = {
  PAGE_LOAD: {
    cells: [
      {
        key: 'metric',
        content: 'Metric',
        isSortable: true,
      },
      {
        key: 'pageLoadType',
        content: 'Page Load Type',
        isSortable: true,
      },
      {
        key: 'cohort',
        content: 'Cohort',
        isSortable: true,
      },
      {
        key: 'tomeLink',
        isSortable: false,
      },
    ],
  },
};

export const TomeModal = ({
  experienceId,
  isOpen,
  closeModalHandler,
}: Props) => {
  const data = useLazyLoadQuery<mainTomeModalQuery>(
    graphql`
      query mainTomeModalQuery($experienceId: ID!) {
        experience(experienceId: $experienceId) {
          experienceType
          populations(sloEnabled: true, onlySLOConfigured: true) {
            metric
            pageLoadType
            cohort
            sloConfiguration {
              tomeUrl
            }
          }
        }
      }
    `,
    { experienceId },
    { fetchPolicy: 'network-only', networkCacheConfig: { force: true } },
  );

  const populations = data?.experience?.populations;
  const hasConfiguredSlos = populations && populations.length > 0;

  const rows = hasConfiguredSlos
    ? populations!.map((population) => {
        const keyPrefix = `${population.metric}_${population.pageLoadType}_${population.cohort}`;
        return {
          cells: [
            {
              key: `${keyPrefix}_metric`,
              content: population.metric,
              width: 50,
            },
            {
              key: `${keyPrefix}_pageLoadType`,
              content: population.pageLoadType,
            },
            {
              key: `${keyPrefix}_cohort`,
              content: population.cohort,
            },
            {
              key: `${keyPrefix}_tomeLink`,
              content: (
                <Button
                  appearance="subtle-link"
                  href={population.sloConfiguration?.tomeUrl}
                  target="_blank"
                  iconBefore={<SettingsIcon label="Settings icon" />}
                />
              ),
            },
          ],
        };
      })
    : [];

  return (
    <AKModalTransition>
      {isOpen && (
        <AKModal width="auto">
          <ModalHeader>
            <ModalTitle>{MODAL_HEADING_TITLE}</ModalTitle>
          </ModalHeader>

          <ModalBody>
            <Container>
              {hasConfiguredSlos ? (
                <DynamicTable
                  head={headerCellsMap[data?.experience!.experienceType]}
                  rows={rows}
                  loadingSpinnerSize="large"
                  defaultSortKey="metric"
                />
              ) : (
                <SectionMessage title="No SLOs are configured">
                  <p>There are no SLOs are configured for this experience.</p>
                  <br />
                  <Button
                    appearance="primary"
                    href="https://tome.prod.atl-paas.net/"
                    target="_blank"
                  >
                    Create SLO
                  </Button>
                </SectionMessage>
              )}
              <StyledFooter>
                <ButtonGroup>
                  <Button onClick={closeModalHandler}>Close</Button>
                </ButtonGroup>
              </StyledFooter>
              <SendScreenEvent name="tome" />
            </Container>
          </ModalBody>
        </AKModal>
      )}
    </AKModalTransition>
  );
};

export const TomeModalLoading = () => {
  return (
    <AKModalTransition>
      <AKModal width="auto">
        <ModalHeader>
          <ModalTitle>{MODAL_HEADING_TITLE}</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Loading />
        </ModalBody>
      </AKModal>
    </AKModalTransition>
  );
};
