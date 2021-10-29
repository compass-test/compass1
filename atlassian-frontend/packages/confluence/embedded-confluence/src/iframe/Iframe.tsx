import React, { useRef, useContext } from 'react';
import styled from '@emotion/styled';

import { ExperienceTrackerContext } from '@atlassian/experience-tracker';

import { useIframeCommunicateEPReactProps } from './useIframeCommunicateEPProps';
import type {
  IframeElement,
  IframePassThroughProps,
} from './IframeElementType';
import { setExperiencesForwarding } from '../experience-tracker';

const StyledIframe = styled.iframe({
  border: 'none',
  width: '100%',
  height: '100%',
});

type Props = {
  src: string;
} & Omit<IframePassThroughProps, 'setExperiencesForwarding'>;

export const Iframe: React.FC<Props> = ({ src, ...passThroughProps }) => {
  const iframeRef = useRef<IframeElement>(null);
  const experienceTracker = useContext(ExperienceTrackerContext);

  useIframeCommunicateEPReactProps(iframeRef, src, {
    ...passThroughProps,
    setExperiencesForwarding: (
      fromExperienceTracker: Parameters<typeof setExperiencesForwarding>[0],
    ) => setExperiencesForwarding(fromExperienceTracker, experienceTracker),
  });

  return (
    <StyledIframe
      title="confluence-article-iframe"
      data-testid="confluence-page-iframe"
      ref={iframeRef}
      // Grant features to iframe (Currently the same as smart card iframe's granted features)
      allow="autoplay; fullscreen; encrypted-media; clipboard-write"
      // Same as "fullscreen" in "allow" attribute but it's considered a legacy attribute. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-allowfullscreen
      // Need it in case the browser doesn't support "fullscreen" feature policy.
      allowFullScreen
      {...passThroughProps}
    />
  );
};
