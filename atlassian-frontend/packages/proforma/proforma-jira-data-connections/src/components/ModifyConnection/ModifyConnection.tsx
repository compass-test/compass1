import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import {
  FormattedMessage,
  InjectedIntl,
  InjectedIntlProps,
  injectIntl,
} from 'react-intl';

import PageHeading from '@atlaskit/page-header';
import { ProgressTracker, Stage } from '@atlaskit/progress-tracker';
import Spinner from '@atlaskit/spinner';

import { DataConnectionStore } from '../../stores/DataConnectionStore';
import { DataConnectionsUtils } from '../../utils/DataConnectionsUtils';

import { ConfigureConnection } from './ConfigureConnection/ConfigureConnection';
import { ConfirmConnection } from './ConfirmConnection/ConfirmConnection';
import { ConnectionDetails } from './ConnectionDetails/ConnectionDetails';
import {
  IntlModifyConnectionMessages,
  ModifyConnectionMessage,
} from './ModifyConnectionMessages.intl';
import { CenterColumn } from './styled';
import { TestConnection } from './TestConnection/TestConnection';

enum WizardStep {
  Connect,
  Test,
  Configure,
  Confirm,
}

class NewDataConnectionClass {
  private static instance: NewDataConnectionClass;
  private constructor() {}
  public static get Instance(): NewDataConnectionClass {
    return this.instance || (this.instance = new this());
  }
}
export const NewDataConnection = NewDataConnectionClass.Instance;
export class ExistingDataConnection {
  constructor(public readonly connectionId: string) {}
}
export type DataConnection = NewDataConnectionClass | ExistingDataConnection;

interface ModifyConnectionProps {
  dataConnection: DataConnection;
  dataConnectionsUtils: DataConnectionsUtils;
  clearDataConnection: () => void;
}

export const ModifyConnection = injectIntl(
  observer(
    ({
      dataConnection,
      dataConnectionsUtils,
      clearDataConnection,
      intl,
    }: ModifyConnectionProps & InjectedIntlProps) => {
      const [dataConnectionStore, setDataConnectionStore] = useState<
        DataConnectionStore
      >();
      const [wizardStep, setWizardStep] = useState(WizardStep.Connect);

      useEffect(() => {
        if (dataConnection instanceof ExistingDataConnection) {
          dataConnectionsUtils
            .loadDataConnectionStore(dataConnection.connectionId)
            .then(loadedDataConnectionStore => {
              setDataConnectionStore(loadedDataConnectionStore);
            });
        } else {
          setDataConnectionStore(
            dataConnectionsUtils.createDataConnectionStore(),
          );
        }
      }, [dataConnection, dataConnectionsUtils]);

      const previousWizardStep = (): void => {
        if (wizardStep > WizardStep.Connect) {
          setWizardStep(wizardStep - 1);
        } else {
          clearDataConnection();
        }
      };
      const nextWizardStep = (): void => {
        if (wizardStep < WizardStep.Confirm) {
          setWizardStep(wizardStep + 1);
        } else if (!dataConnectionStore) {
          // eslint-disable-next-line no-console
          console.error(
            'Trying to finish the wizard, but `dataConnectionStore === undefined`.',
          );
        } else {
          dataConnectionStore.save().then(succeeded => {
            if (succeeded) {
              clearDataConnection();
            }
          });
        }
      };

      const editing = dataConnection instanceof ExistingDataConnection;

      return (
        <div>
          <PageHeading>
            {editing ? (
              <FormattedMessage
                {...IntlModifyConnectionMessages[
                  ModifyConnectionMessage.EditConnectionsHeader
                ]}
              />
            ) : (
              <FormattedMessage
                {...IntlModifyConnectionMessages[
                  ModifyConnectionMessage.AddConnectionsHeader
                ]}
              />
            )}
          </PageHeading>
          <ProgressTracker items={buildWizardNav(wizardStep, intl)} />
          <CenterColumn>
            {!dataConnectionStore || dataConnectionStore.loading ? (
              <Spinner />
            ) : wizardStep === WizardStep.Connect ? (
              <ConnectionDetails
                dataConnectionStore={dataConnectionStore}
                previousWizardStep={previousWizardStep}
                nextWizardStep={nextWizardStep}
              />
            ) : wizardStep === WizardStep.Test ? (
              <TestConnection
                dataConnectionStore={dataConnectionStore}
                previousWizardStep={previousWizardStep}
                nextWizardStep={nextWizardStep}
              />
            ) : wizardStep === WizardStep.Configure ? (
              <ConfigureConnection
                dataConnectionStore={dataConnectionStore}
                previousWizardStep={previousWizardStep}
                nextWizardStep={nextWizardStep}
              />
            ) : wizardStep === WizardStep.Confirm ? (
              <ConfirmConnection
                dataConnectionStore={dataConnectionStore}
                editing={editing}
                previousWizardStep={previousWizardStep}
                nextWizardStep={nextWizardStep}
              />
            ) : (
              <div>
                <FormattedMessage
                  {...IntlModifyConnectionMessages[
                    ModifyConnectionMessage.WizardStepUnrecognised
                  ]}
                  values={{ wizardStep }}
                />
              </div>
            )}
          </CenterColumn>
        </div>
      );
    },
  ),
);

const buildWizardNav = (
  wizardStep: WizardStep,
  intl: InjectedIntl,
): Stage[] => {
  return [
    buildWizardNavStep(
      WizardStep.Connect,
      intl.formatMessage(
        IntlModifyConnectionMessages[
          ModifyConnectionMessage.WizardStepConnectLabel
        ],
      ),
      wizardStep,
      intl,
    ),
    buildWizardNavStep(
      WizardStep.Test,
      intl.formatMessage(
        IntlModifyConnectionMessages[
          ModifyConnectionMessage.WizardStepTestLabel
        ],
      ),
      wizardStep,
      intl,
    ),
    buildWizardNavStep(
      WizardStep.Configure,
      intl.formatMessage(
        IntlModifyConnectionMessages[
          ModifyConnectionMessage.WizardStepConfigureLabel
        ],
      ),
      wizardStep,
      intl,
    ),
    buildWizardNavStep(
      WizardStep.Confirm,
      intl.formatMessage(
        IntlModifyConnectionMessages[
          ModifyConnectionMessage.WizardStepConfirmLabel
        ],
      ),
      wizardStep,
      intl,
    ),
  ];
};

const buildWizardNavStep = (
  navStep: WizardStep,
  label: string,
  currentStep: WizardStep,
  intl: InjectedIntl,
): Stage => {
  let percent;
  let status: 'unvisited' | 'visited' | 'current' | 'disabled'; // This is `StatusType` but it is not exported.
  if (currentStep < navStep) {
    percent = 0;
    status = 'unvisited';
  } else if (currentStep > navStep) {
    percent = 100;
    status = 'visited';
  } else {
    percent = 0;
    status = 'current';
  }

  return {
    id: `step-${navStep}`,
    label: label,
    percentageComplete: percent,
    status: status,
    noLink: true,
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log(
        intl.formatMessage(
          IntlModifyConnectionMessages[ModifyConnectionMessage.WizardStepLog],
          { label },
        ),
      );
    },
  };
};
