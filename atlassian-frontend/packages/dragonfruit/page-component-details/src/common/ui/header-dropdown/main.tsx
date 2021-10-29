import React, { useCallback, useState } from 'react';

import {
  FormattedHTMLMessage,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl,
} from 'react-intl';
import { useRouterActions } from 'react-resource-router';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import DropdownMenu, { DropdownItem } from '@atlaskit/dropdown-menu';
import { useFlags } from '@atlaskit/flag';
import MoreIcon from '@atlaskit/icon/glyph/more';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import { MenuGroup, Section } from '@atlaskit/menu';
import { N200 } from '@atlaskit/theme/colors';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
  DeleteModal,
} from '@atlassian/dragonfruit-common-ui';
import {
  checkCompassMutationSuccess,
  CompassMutationError,
  DeleteComponentHandledErrors,
  useDeleteComponent,
} from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { ApplyScorecardModal } from '@atlassian/dragonfruit-scorecards';
import { openInNewTab, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ANALYTICS_PACKAGE_NAME } from '../../constants';

import messages from './messages';
import { IconSpacer } from './styled';

type HeaderDropdownProps = {
  componentId: string;
  componentManaged: boolean;
  externalSourceURL: string | null;
  componentName: string;
};

function HeaderDropdown(props: HeaderDropdownProps & InjectedIntlProps) {
  const {
    componentName,
    componentId,
    componentManaged,
    externalSourceURL,
    intl,
  } = props;
  const { formatMessage } = intl;
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const [isApplyScorecardModalOpen, setIsApplyScorecardModalOpen] = useState<
    boolean
  >(false);
  const openApplyScorecardModal = () => {
    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'link',
    });

    fireUIAnalytics(event, 'applyScorecard', {
      componentId: componentId,
      componentName: componentName,
      componentManaged: componentManaged,
    });

    setIsApplyScorecardModalOpen(true);
  };
  const closeApplyScorecardModal = () => {
    setIsApplyScorecardModalOpen(false);
  };

  const { showFlag } = useFlags();
  const [handleMutate] = useDeleteComponent();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const { replace } = useRouterActions();

  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();

  const showDeleteComponentErrorFlag = useCallback(
    (description: FormattedMessage.MessageDescriptor) => {
      showFlag({
        ...BaseErrorFlagProps,
        title: formatMessage(messages.removeComponentErrorFlagTitle),
        description: (
          <FormattedHTMLMessage
            {...description}
            values={{
              componentName,
            }}
          />
        ),
      });
    },
    [formatMessage, showFlag, componentName],
  );

  const onSubmit = useCallback(() => {
    closeDeleteModal();
    return handleMutate({
      id: componentId,
    })
      .then((mutationResult) => {
        // Throws MutationError if mutation unsuccessful
        checkCompassMutationSuccess(
          mutationResult?.data?.compass?.deleteComponent,
        );
        // Redirect to list view page
        replace(routes.COMPONENTS());
      })
      .catch((error) => {
        if (error instanceof CompassMutationError) {
          const errorType = error.getFirstErrorType();
          if (errorType === DeleteComponentHandledErrors.COMPONENT_NOT_FOUND) {
            showDeleteComponentErrorFlag(messages.componentNotFound);
            return;
          }
          fireCompassMutationErrorAnalytics({
            error,
            componentName: 'HeaderDropdown',
            packageName: ANALYTICS_PACKAGE_NAME,
          });
        }
        showDeleteComponentErrorFlag(
          messages.removeComponentErrorFlagDescription,
        );
      });
  }, [
    componentId,
    fireCompassMutationErrorAnalytics,
    handleMutate,
    replace,
    showDeleteComponentErrorFlag,
  ]);

  function onCopyID() {
    navigator.clipboard
      .writeText(componentId)
      .then(function () {
        showFlag({
          ...BaseSuccessFlagProps,
          id: 'dragonfruitCopyIdSuccess',
          title: formatMessage(messages.copyIdFlagSuccessTitle),
          description: `${componentId.substring(0, 30)}...`,
        });
      })
      .catch(function () {
        showFlag({
          ...BaseErrorFlagProps,
          id: 'dragonfruitCopyIdFailure',
          title: formatMessage(CommonMessages.error),
          description: formatMessage(messages.copyIdFlagFailureDescription),
        });
      });
  }

  const externalSourceLink = (
    <Section>
      <DropdownItem
        data-testid="dragonfruit.header-dropdown.external-link"
        elemAfter={
          <ShortcutIcon label={'shortcut'} size={'small'} primaryColor={N200} />
        }
        onClick={() => {
          openInNewTab(externalSourceURL || '');
        }}
      >
        {formatMessage(messages.compassYmlLinkText)}
        <IconSpacer />
      </DropdownItem>
    </Section>
  );

  return (
    <>
      <DropdownMenu
        triggerType="button"
        triggerButtonProps={{
          iconAfter: <MoreIcon label="Actions" />,
        }}
        position="bottom right"
        testId={'pollinator.header-dropdown-menu'}
      >
        <MenuGroup>
          {componentManaged && externalSourceURL !== null && externalSourceLink}

          <Section>
            <DropdownItem
              onClick={openApplyScorecardModal}
              data-testid="dragonfruit.header-dropdown.apply-scorecard-to-component-id"
            >
              {formatMessage(messages.applyScorecardToComponentButtonText)}
            </DropdownItem>

            <DropdownItem
              onClick={onCopyID}
              data-testid="dragonfruit.header-dropdown.copy-component-id"
            >
              {formatMessage(messages.copyComponentIdButtonText)}
            </DropdownItem>
          </Section>

          {!componentManaged && (
            <Section hasSeparator>
              <DropdownItem
                onClick={openDeleteModal}
                data-testid="pollinator.header-dropdown-menu.remove-component"
              >
                {formatMessage(messages.removeComponentButtonText)}
              </DropdownItem>
            </Section>
          )}
        </MenuGroup>
      </DropdownMenu>

      {isDeleteModalOpen && (
        <DeleteModal
          heading={formatMessage(messages.removeComponentDeleteModalTitle)}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onSubmit={onSubmit}
        >
          <FormattedHTMLMessage
            {...messages.removeComponentDeleteModalDescription}
            values={{ componentName }}
          />
        </DeleteModal>
      )}

      {isApplyScorecardModalOpen && (
        <ApplyScorecardModal
          componentId={componentId}
          onCancel={closeApplyScorecardModal}
          onClose={closeApplyScorecardModal}
        />
      )}
    </>
  );
}

export default withErrorBoundary(injectIntl(HeaderDropdown), {
  componentName: 'headerDropdown',
});
