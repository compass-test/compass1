import React, { MouseEvent } from 'react';
import { ClassNames } from '@emotion/core';

import { ExperienceTrackerContext } from '@atlassian/experience-tracker';

import { withAnalyticsListener } from '../analytics';
import {
  EMBEDDED_CONFLUENCE_MODE,
  EMBEDDED_PARENT_PRODUCTS,
  Footer,
  PageCommonProps,
  useUrl,
} from '../page-common';
import { Iframe } from '../iframe';
import {
  useExperienceTracker,
  useSetUpExperience,
  ExperienceNames,
} from '../experience-tracker';

const StyledEmbeddedPageContainer = ({
  children,
  className = '',
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <ClassNames>
    {({ css, cx }) => (
      <div
        className={cx(
          css({
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }),
          className,
        )}
      >
        {children}
      </div>
    )}
  </ClassNames>
);

export type ViewPageProps = PageCommonProps & {
  contentId: string;
  parentProduct: string;
  className?: string;
  hasByLineContributors?: boolean;
  hasByLineExtensions?: boolean;
  hasComments?: boolean;
  /**
   * Currently the view component supports JSM's two views - Portal and Agent View.
   * There is a concern with both the footer at the bottom and the `powered by` being shown in portal view but not in agent view.
   * But Embedded Component wants people to see the Confluence branding.
   * In order to circumvent that we have introduced a property `hasFooterLogo` to be used by JSM portal view.
   */
  hasFooterLogo?: boolean;
  hasLikes?: boolean;
  /** @deprecated  Use `navigationPolicy` to handle the navigation instead. */
  onEdit?: (e: MouseEvent) => void;
  showEdit?: boolean;
  showDelete?: boolean;
};

const ViewPageImpl: React.FC<ViewPageProps> = (props) => {
  const {
    className,
    contentId,
    hasFooterLogo = true,
    parentProduct,
    spaceKey,
    ...passThroughProps
  } = props;

  const experienceTracker = useExperienceTracker();

  useSetUpExperience({
    experienceTracker,
    contentId,
    spaceKey,
    experience: ExperienceNames.VIEW_PAGE,
    ccExperience: ExperienceNames.CC_VIEW_PAGE,
  });

  const { standaloneConfluenceUrl, embeddedConfluenceUrl } = useUrl({
    ...props,
    mode: EMBEDDED_CONFLUENCE_MODE.VIEW_MODE,
  });

  /**
   * Currently footer is hidden for the JSM Portal view which passes
   * hasFooterLogo prop as false and shown for all other views
   */
  const showFooter = !(
    parentProduct === EMBEDDED_PARENT_PRODUCTS.JSM && !hasFooterLogo
  );

  return (
    <ExperienceTrackerContext.Provider value={experienceTracker}>
      <StyledEmbeddedPageContainer className={className}>
        {embeddedConfluenceUrl && (
          <Iframe
            parentProduct={parentProduct}
            src={embeddedConfluenceUrl}
            {...passThroughProps}
          />
        )}
        {showFooter && <Footer url={standaloneConfluenceUrl} />}
      </StyledEmbeddedPageContainer>
    </ExperienceTrackerContext.Provider>
  );
};

export const ViewPage = withAnalyticsListener(ViewPageImpl);
