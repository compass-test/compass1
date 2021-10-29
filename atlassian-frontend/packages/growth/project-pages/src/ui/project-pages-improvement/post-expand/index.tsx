import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  TemplateProvider,
  usePreloadPreviews,
} from '../../../controllers/template';
import { MainContainer, MainContent } from '../styled';
import Content from './content';
import TemplatesSidebar from '../templates-sidebar';
import { Template, TemplateType } from '../../../controllers/template/types';
import {
  Manager as PopperManager,
  Reference as PopperReference,
} from '@atlaskit/popper';
import HoverPreview from './hover-preview';
import { postExpandTemplates } from '../constants';
import { Props } from './types';
import { CONFTREE_CONNECT_SPACE } from '../../../state/ui/types';
import messages from '../messages';
import crossJoinMessages from '../../cross-join/messages';
import { AccessRequestCapabilityType } from '../../../state/confluence/access-request-capabilities/types';
import { createNewDraft } from './utils';
import {
  JoinProductTemplateParams,
  getRequestAccessUrl,
  getJoinProductUrl,
} from '../../../ui/cross-join/utils';
import {
  isConfluenceTemplate,
  isBlankPageTemplate,
} from '../../../controllers/template/utils';
import { useFeatureFlags } from '../../../controllers/feature-flags';
import { useCreateEmbeddedPage } from '../../../controllers/embedded-page/utils';

const HIDE_DELAY_MS = 250;

const PostExpand = ({
  children,
  redirectToConfluenceTemplate,
  showError,
  blueprints,
  areTemplatesEnabled,
  projectPagesContent,
  origin,
  accessRequestCapability,
  project,
  accountId,
  cloudId,
  spaceKey,
  contentId,
  isPostJoin,
}: Props) => {
  const [template, setTemplate] = useState<Template | undefined>(undefined);
  const containerRef = useRef<HTMLElement>(null);
  const hidePreviewTimer = useRef<number | null>(null);
  const {
    isProjectPagesProductionisation,
    isEmbeddedPagesExperiment,
  } = useFeatureFlags();

  usePreloadPreviews(postExpandTemplates, true);

  const cancelHidePreview = useCallback(() => {
    if (hidePreviewTimer.current) {
      clearTimeout(hidePreviewTimer.current);
      hidePreviewTimer.current = null;
    }
  }, []);

  const startHidePreview = useCallback(() => {
    if (hidePreviewTimer.current) {
      return;
    }
    hidePreviewTimer.current = window.setTimeout(() => {
      hidePreviewTimer.current = null;
      setTemplate(undefined);
    }, HIDE_DELAY_MS);
  }, []);

  const showPreview = useCallback(
    (tmpl: Template) => {
      if (tmpl.type !== TemplateType.Confluence) {
        startHidePreview();
        return;
      }
      cancelHidePreview();
      setTemplate(tmpl);
    },
    [cancelHidePreview, startHidePreview],
  );

  const getJoinProductUrlFromTemplate = useCallback(
    (tmpl: Template) => {
      const tmplParams: JoinProductTemplateParams = {};
      if (isConfluenceTemplate(tmpl) && !isBlankPageTemplate(tmpl)) {
        tmplParams['blueprintModuleCompleteKey'] =
          tmpl.blueprintModuleCompleteKey;
      } else if (isBlankPageTemplate(tmpl) || tmpl.type === TemplateType.More) {
        tmplParams['createBlank'] = true;
      }
      return getJoinProductUrl({
        ...tmplParams,
        projectKey: project.key,
        projectName: project.name,
        origin,
        cloudId,
        accountId,
      });
    },
    [project, origin, cloudId, accountId],
  );

  const createEmbeddedPage = useCreateEmbeddedPage(spaceKey);

  const handleTemplateClick = useCallback(
    (tmpl: Template) => {
      switch (accessRequestCapability) {
        case AccessRequestCapabilityType.REQUEST_ACCESS:
          window.open(
            getRequestAccessUrl({
              projectKey: project.key,
              origin,
              cloudId,
              accountId,
            }),
            '_blank',
            'noopener noreferrer',
          );
          return;
        case AccessRequestCapabilityType.DIRECT_ACCESS:
          window.open(
            getJoinProductUrlFromTemplate(tmpl),
            '_blank',
            'noopener noreferrer',
          );
          return;
      }
      if (!areTemplatesEnabled) {
        return;
      }
      if (tmpl.type === TemplateType.Link) {
        window.open(origin ? origin.addToUrl(tmpl.url) : tmpl.url, '_blank');
        return;
      }
      if (isEmbeddedPagesExperiment && tmpl.type === TemplateType.Confluence) {
        if (!tmpl.blueprintModuleCompleteKey) {
          // create blank
          createEmbeddedPage(contentId || undefined, true);
          return;
        }
        const blueprint = blueprints.find(
          (blueprint) =>
            blueprint.blueprintModuleCompleteKey ===
            tmpl.blueprintModuleCompleteKey,
        );
        if (!blueprint) {
          // site probably has this template turned off, we need to show an error
          showError();
          return;
        }
        createEmbeddedPage(contentId || undefined, true, blueprint);
      } else {
        createNewDraft(tmpl, blueprints, redirectToConfluenceTemplate);
      }
    },
    [
      accessRequestCapability,
      areTemplatesEnabled,
      isEmbeddedPagesExperiment,
      project.key,
      origin,
      cloudId,
      accountId,
      getJoinProductUrlFromTemplate,
      blueprints,
      createEmbeddedPage,
      contentId,
      showError,
      redirectToConfluenceTemplate,
    ],
  );

  // on unmount, clear any pending timers to prevent operations on unmounted components
  useEffect(
    () => () => {
      if (hidePreviewTimer.current) {
        clearTimeout(hidePreviewTimer.current);
      }
    },
    [],
  );

  let sidebarEnabled = areTemplatesEnabled;
  switch (accessRequestCapability) {
    case AccessRequestCapabilityType.DIRECT_ACCESS:
    case AccessRequestCapabilityType.REQUEST_ACCESS:
      sidebarEnabled = true;
  }

  const templates = useMemo<Template[]>(() => {
    const getTooltip = (tmpl: Template) => {
      if (projectPagesContent === CONFTREE_CONNECT_SPACE) {
        return messages.connectSpaceTooltip;
      } else if (
        accessRequestCapability ===
          AccessRequestCapabilityType.REQUEST_ACCESS ||
        accessRequestCapability === AccessRequestCapabilityType.DIRECT_ACCESS
      ) {
        // special tooltip consideration for specific cross-join scenarios
        switch (accessRequestCapability) {
          case AccessRequestCapabilityType.REQUEST_ACCESS:
            return crossJoinMessages.requestAccessTemplatesTooltip;
          case AccessRequestCapabilityType.DIRECT_ACCESS:
            return crossJoinMessages.joinProductTemplatesTooltip;
        }
      } else if (!areTemplatesEnabled) {
        return undefined;
      } else if (
        isEmbeddedPagesExperiment &&
        tmpl.type === TemplateType.Confluence
      ) {
        // don't show the "Create this page in Confluence" tooltip for Embedded Pages
        return undefined; // when productionised, we should just remove the tooltip from postExpandTemplates
      } else {
        return tmpl.tooltip;
      }
    };
    // when fully rolled out, we should simply replace the constant in ui/project-pages-improvement/constants.tsx and remove all the TemplateType.More logic
    const overrideProductionisedMoreTemplates = (tmpl: Template): Template =>
      isProjectPagesProductionisation && tmpl.type === TemplateType.More
        ? {
            ...tmpl,
            type: TemplateType.Link,
            url: `/wiki/templates?space=${spaceKey}`,
            renderShortcutIcon: true,
          }
        : tmpl;
    return postExpandTemplates
      .map<Template>(overrideProductionisedMoreTemplates)
      .map<Template>((tmpl) => ({
        ...tmpl,
        tooltip: getTooltip(tmpl),
      }));
  }, [
    projectPagesContent,
    accessRequestCapability,
    areTemplatesEnabled,
    isEmbeddedPagesExperiment,
    isProjectPagesProductionisation,
    spaceKey,
  ]);

  const sidebarHeadings = useMemo(() => {
    let subtitle = messages.templatesPostExpandSubtitle;
    if (
      accessRequestCapability &&
      [
        AccessRequestCapabilityType.REQUEST_ACCESS,
        AccessRequestCapabilityType.DIRECT_ACCESS,
      ].includes(accessRequestCapability)
    ) {
      subtitle =
        accessRequestCapability === AccessRequestCapabilityType.REQUEST_ACCESS
          ? crossJoinMessages.requestAccessTemplatesSubtitle
          : crossJoinMessages.joinProductTemplatesSubtitle;
    }
    return {
      title: messages.templatesPostExpandTitle,
      subtitle,
    };
  }, [accessRequestCapability]);

  return (
    <>
      <MainContainer
        innerRef={containerRef}
        data-test-id="confluence-project-pages.post-expand.template-container"
      >
        <MainContent>
          <TemplateProvider value={template}>
            <Content isPostJoin={isPostJoin}>{children}</Content>
          </TemplateProvider>
        </MainContent>
      </MainContainer>
      <PopperManager>
        <PopperReference>
          {({ ref }) => (
            <TemplatesSidebar
              templates={templates}
              onTemplateClick={handleTemplateClick}
              onTemplateMouseEnter={showPreview}
              onMouseLeave={startHidePreview}
              hoverRef={ref}
              isDisabled={!sidebarEnabled}
              origin={origin}
              {...sidebarHeadings}
            />
          )}
        </PopperReference>
        <HoverPreview
          template={template}
          boundaryRef={containerRef}
          onMouseEnter={cancelHidePreview}
          onMouseLeave={startHidePreview}
        />
      </PopperManager>
    </>
  );
};

export default PostExpand;
