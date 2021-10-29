import React from 'react';

import { FormattedMessage } from 'react-intl';

import { UIAnalyticsEvent, useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import {
  FireScreenAnalytics,
  fireUIAnalytics,
  MODAL,
} from '@atlassian/analytics-bridge';

import {
  ANALYTICS_LEARN_MORE_BUTTON_ID,
  ANALYTICS_OK_BUTTON_ID,
  MODERNIZED_PLAN_SELECTION_PROJECT,
  ScreenType,
} from '../../common/constants';
import { ModalScreenBoundary } from '../../common/ui/modal-boundary';
import { ModalHeader } from '../../common/ui/modal-header';
import type { ModalHeaderProps } from '../../common/ui/modal-header/types';
import { ModalSkeleton } from '../../common/ui/modal-skeleton';
import { AnalyticsProvider } from '../../common/utils/analytics-provider';
import { AnalyticsProps, ModernizedPlanSelectionProps } from '../../types';

import CheckCircle from './assets/check-circle-outline.svg';
import { featureToImageMap, ImagesArray } from './constants';
import { messages } from './messages';
import {
  BodyRoot,
  ButtonWrapper,
  FeatureList,
  FeatureListItem,
  FeatureTextStyling,
  FooterStyling,
  ModalButtonsContainer,
  Root,
} from './styled';

interface BodyTypes {
  featureListItems: FormattedMessage.MessageDescriptor[];
}

interface FooterTypes {
  urlMessage: FormattedMessage.MessageDescriptor;
  linkButtonText: FormattedMessage.MessageDescriptor;
  okButtonText: FormattedMessage.MessageDescriptor;
  onCloseHandler: () => void;
  analyticsAttributes: {
    sourceScreen: string;
    chromaExperiment: string;
    [key: string]: string;
  };
}

export const ModernizedPlanSelectionImagePreloader: React.FC = () => {
  ImagesArray.forEach(image => {
    const img = new Image();
    img.src = image;
  });
  return null;
};

export const ModernizedPlanSelectionModal: React.FC<
  ModernizedPlanSelectionProps &
    AnalyticsProps & { onCloseHandler?: () => void }
> = ({
  analyticsOriginProduct,
  analyticsPlatformClient,
  onCloseHandler = () => {},
  ...props
}) => {
  const { featureModal, product, edition } = props;

  const analyticsAttributes = {
    sourceScreen: analyticsOriginProduct,
    chromaExperiment: MODERNIZED_PLAN_SELECTION_PROJECT,
    product: product,
    featureModal: featureModal,
    currentEdition: edition ? edition : '',
  };

  const {
    heading,
    subHeading,
    featureListItems,
    okButtonText,
    linkButtonText,
    urlMessage,
  } = GetModernizedPlanSelectionModalData(featureModal);

  const imageSrc = featureToImageMap[featureModal];

  return (
    <AnalyticsProvider
      analyticsPlatformClient={analyticsPlatformClient}
      analyticsOriginProduct={analyticsOriginProduct}
    >
      <ModalScreenBoundary
        sourceType={MODAL}
        sourceId={analyticsOriginProduct}
        attributes={analyticsAttributes}
      >
        <Root>
          <ModalSkeleton
            modalHeader={() =>
              Header({
                onClose: onCloseHandler,
                imageSrc: imageSrc,
                heading: heading,
                subheading: subHeading,
                analyticsAttributes: analyticsAttributes,
              })
            }
            modalBody={() => Body({ featureListItems })}
            modalFooter={() =>
              Footer({
                okButtonText,
                linkButtonText,
                urlMessage,
                analyticsAttributes,
                onCloseHandler,
              })
            }
            closeOnOverlayClick={true}
            onCloseModal={onCloseHandler}
          />
        </Root>
        <FireScreenAnalytics
          key={ScreenType.MODERNIZED_PLAN_SELECTION_MODAL}
          attributes={analyticsAttributes}
        />
      </ModalScreenBoundary>
    </AnalyticsProvider>
  );
};

const Header = ({
  imageSrc,
  heading,
  subheading,
  analyticsAttributes,
  onClose,
}: ModalHeaderProps): React.ReactElement => {
  return (
    <ModalHeader
      imageSrc={imageSrc}
      heading={heading}
      subheading={subheading}
      onClose={onClose}
      analyticsAttributes={analyticsAttributes}
    />
  );
};

const Body = ({ featureListItems }: BodyTypes) => {
  return (
    <BodyRoot>
      <FeatureList>
        {featureListItems.map(listItem => {
          return (
            <FeatureListItem>
              <img src={CheckCircle} style={{ width: '24px' }} />
              <FeatureTextStyling>
                <FormattedMessage {...listItem} />
              </FeatureTextStyling>
            </FeatureListItem>
          );
        })}
      </FeatureList>
    </BodyRoot>
  );
};

const Footer = ({
  okButtonText,
  linkButtonText,
  urlMessage,
  onCloseHandler,
  analyticsAttributes,
}: FooterTypes): React.ReactElement => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const onDoneClick = (event: any, analyticsEvent: UIAnalyticsEvent) => {
    let ae = analyticsEvent;
    if (!ae) {
      ae = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'button',
        source: analyticsAttributes.sourceScreen,
      });
    }
    fireUIAnalytics(ae, ANALYTICS_OK_BUTTON_ID, analyticsAttributes);
    onCloseHandler();
  };
  const onLearnMoreClick = (event: any, analyticsEvent: UIAnalyticsEvent) => {
    let ae = analyticsEvent;
    if (!ae) {
      ae = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'button',
        source: analyticsAttributes.sourceScreen,
      });
    }
    fireUIAnalytics(ae, ANALYTICS_LEARN_MORE_BUTTON_ID, analyticsAttributes);
  };

  return (
    <FooterStyling>
      <ModalButtonsContainer>
        {urlMessage ? (
          <Button
            appearance="link"
            target="_blank"
            href={urlMessage.defaultMessage}
            onClick={onLearnMoreClick}
          >
            <FormattedMessage {...linkButtonText} />
          </Button>
        ) : null}
        <ButtonWrapper>
          <Button appearance="primary" target="_top" onClick={onDoneClick}>
            <FormattedMessage {...okButtonText} />
          </Button>
        </ButtonWrapper>
      </ModalButtonsContainer>
    </FooterStyling>
  );
};

export const GetModernizedPlanSelectionModalData = (feature: string) => {
  const heading = messages[`${feature}Heading`];
  const subHeading = messages[`${feature}Subheading`];
  const featureOne = messages[`${feature}FeatureOne`];
  const featureTwo = messages[`${feature}FeatureTwo`];
  const featureThree = messages[`${feature}FeatureThree`];
  const okButtonText = messages[`okButton`];

  //linkButtonText and url are usually UNDEFINED since they don't show up in most modals.
  const linkButtonText = messages[`${feature}LinkButtonText`];
  const urlMessage = messages[`${feature}Url`];

  const featureListItems = [featureOne, featureTwo, featureThree];
  return {
    heading,
    subHeading,
    featureListItems,
    okButtonText,
    linkButtonText,
    urlMessage,
  };
};

export const isMPSDefinedFeature = (feature: string) =>
  Object.keys(featureToImageMap).includes(feature);
