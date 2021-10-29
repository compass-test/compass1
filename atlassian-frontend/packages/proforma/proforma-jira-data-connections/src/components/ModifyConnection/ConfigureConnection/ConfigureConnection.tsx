import React from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import SectionMessage from '@atlaskit/section-message';
import Select from '@atlaskit/select';
import TextArea from '@atlaskit/textarea';
import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import { FormField } from '@atlassian/proforma-common-core/jira-common';

import { DataConnectionStore } from '../../../stores/DataConnectionStore';
import {
  DataConnectionsMessage,
  IntlDataConnectionsMessages,
} from '../../DataConnectionsMessages.intl';
import { Footer } from '../Footer';
import { WizardSection } from '../styled';

import {
  ConfigureConnectionMessage,
  IntlConfigureConnectionMessages,
} from './ConfigureConnectionMessages.intl';

interface ConfigureConnectionProps {
  dataConnectionStore: DataConnectionStore;
  previousWizardStep: () => void;
  nextWizardStep: () => void;
}

export const ConfigureConnection = injectIntl(
  observer(
    ({
      dataConnectionStore,
      previousWizardStep,
      nextWizardStep,
      intl,
    }: ConfigureConnectionProps & InjectedIntlProps) => {
      const name = dataConnectionStore.name;
      const itemLocationsResponse =
        dataConnectionStore.testItemLocationsResponse;
      const itemLocationPath = dataConnectionStore.detailsStore?.getItemLocationPath();
      const itemId = dataConnectionStore.detailsStore?.getItemId();
      const itemLabel = dataConnectionStore.detailsStore?.getItemLabel();

      const itemLocationOptions = itemLocationsResponse?.itemLocations.map(l =>
        toOption(l.name),
      );
      let itemIds: SelectOption[] = [];
      let itemLabels: SelectOption[] = [];
      let selectedItemLocation: SelectOption | undefined;
      let contentTypeSupported = false;
      let parsedResponseData: string | undefined;
      if (itemLocationsResponse) {
        if (itemLocationPath) {
          const itemLocation = itemLocationsResponse.itemLocations.find(
            i => i.name === itemLocationPath,
          );
          if (itemLocation) {
            itemIds = itemLocation.idNames.map(toOption);
            itemLabels = itemLocation.labelNames.map(toOption);
            selectedItemLocation = toOption(itemLocation.name);
          }
        }
        if (
          itemLocationsResponse.contentType
            .toLowerCase()
            .indexOf('application/json') !== -1
        ) {
          contentTypeSupported = true;
          if (itemLocationsResponse.data) {
            try {
              parsedResponseData = JSON.stringify(
                JSON.parse(itemLocationsResponse.data),
                null,
                2,
              );
            } catch {
              // eslint-disable-next-line no-console
              console.log(
                intl.formatMessage(
                  IntlConfigureConnectionMessages[
                    ConfigureConnectionMessage.ParseJsonErrorLog
                  ],
                ),
              );
            }
          }
        }
      }
      const selectedItemId = itemId
        ? itemIds?.find(o => o.label === itemId)
        : undefined;
      const selectedItemLabel = itemLabel
        ? itemLabels?.find(o => o.label === itemLabel)
        : undefined;

      const disableNextStep =
        !selectedItemId || !selectedItemLabel || !contentTypeSupported;

      return (
        <>
          <WizardSection>
            <h2>{name}</h2>
            {!contentTypeSupported && (
              <>
                <br />
                <SectionMessage
                  appearance="warning"
                  title={intl.formatMessage(
                    IntlConfigureConnectionMessages[
                      ConfigureConnectionMessage.ContentTypeNotSupportedTitle
                    ],
                  )}
                >
                  <FormattedMessage
                    {...IntlConfigureConnectionMessages[
                      ConfigureConnectionMessage.ContentTypeNotSupportedMessage
                    ]}
                  />
                </SectionMessage>
              </>
            )}
            {contentTypeSupported && (
              <>
                {!parsedResponseData && (
                  <>
                    <br />
                    <SectionMessage appearance="warning">
                      <FormattedMessage
                        {...IntlConfigureConnectionMessages[
                          ConfigureConnectionMessage.UnableToParseDataMessage
                        ]}
                      />
                    </SectionMessage>
                  </>
                )}
                {parsedResponseData && (
                  <>
                    <p>
                      <FormattedMessage
                        {...IntlConfigureConnectionMessages[
                          ConfigureConnectionMessage
                            .ConfigureItemsToRetrieveMessage
                        ]}
                      />
                    </p>
                    <TextArea
                      appearance="standard"
                      minimumRows={20}
                      maxHeight="1000px"
                      resize="none"
                      isCompact={false}
                      isDisabled={false}
                      isReadOnly={true}
                      isRequired={true}
                      isInvalid={false}
                      isMonospaced={true}
                      value={parsedResponseData}
                      defaultValue={undefined}
                      spellCheck={false}
                      theme={undefined}
                      onBlur={undefined}
                      onChange={undefined}
                      onFocus={undefined}
                    />
                  </>
                )}
                {itemLocationOptions && (
                  <FormField
                    label={
                      <FormattedMessage
                        {...IntlConfigureConnectionMessages[
                          ConfigureConnectionMessage.ItemsLabel
                        ]}
                      />
                    }
                    required={true}
                  >
                    <Select
                      placeholder={
                        <FormattedMessage
                          {...IntlConfigureConnectionMessages[
                            ConfigureConnectionMessage.ItemsPlaceholder
                          ]}
                        />
                      }
                      value={selectedItemLocation}
                      onChange={selection =>
                        selection &&
                        dataConnectionStore.detailsStore?.setItemLocationPath(
                          selection.value,
                        )
                      }
                      options={itemLocationOptions}
                    />
                  </FormField>
                )}
                {itemIds && itemLabels && selectedItemLocation && (
                  <div>
                    <FormField
                      label={
                        <FormattedMessage
                          {...IntlDataConnectionsMessages[
                            DataConnectionsMessage.IdLabel
                          ]}
                        />
                      }
                      required={true}
                    >
                      <Select<SelectOption>
                        placeholder={
                          <FormattedMessage
                            {...IntlConfigureConnectionMessages[
                              ConfigureConnectionMessage.ItemsPlaceholder
                            ]}
                          />
                        }
                        value={selectedItemId}
                        onChange={selection =>
                          selection &&
                          dataConnectionStore.detailsStore?.setItemId(
                            selection.value,
                          )
                        }
                        options={itemIds}
                      />
                    </FormField>
                    <FormField
                      label={
                        <FormattedMessage
                          {...IntlDataConnectionsMessages[
                            DataConnectionsMessage.LabelLabel
                          ]}
                        />
                      }
                      required={true}
                    >
                      <Select<SelectOption>
                        placeholder={
                          <FormattedMessage
                            {...IntlConfigureConnectionMessages[
                              ConfigureConnectionMessage.LabelPlaceholder
                            ]}
                          />
                        }
                        value={selectedItemLabel}
                        onChange={selection =>
                          selection &&
                          dataConnectionStore.detailsStore?.setItemLabel(
                            selection.value,
                          )
                        }
                        options={itemLabels}
                      />
                    </FormField>
                  </div>
                )}
              </>
            )}
          </WizardSection>
          <Footer
            previousWizardStep={previousWizardStep}
            nextWizardStep={nextWizardStep}
            disableNextStep={disableNextStep}
          />
        </>
      );
    },
  ),
);

const toOption = (value: string): SelectOption => {
  return { label: value, value: value };
};
