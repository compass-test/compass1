import React, { useEffect, useRef } from 'react';

import {
  CreditCardFormBreadcrumb,
  useErrorBoundaryEventDispatch,
} from '../../common/utils/events';
import { FormStartTimeRecorder } from '../../common/utils/start-time';
import { RequestState } from '../../common/utils/state/types';
import { useCreditCardState } from '../../controllers/hooks/use-credit-card-state';
import {
  useElementsAreReady,
  useElementsDidFail,
} from '../../controllers/hooks/use-elements-state';

import { Form } from './edit';
import { ErrorCreditCard } from './error';
import { FrameBreaker } from './frame-breaker';
import { LoadingCreditCard } from './loading';
import { FormSection } from './styled';

export type CreditCardFormProps = {
  /**
   * class name to be used on the element
   */
  className?: string;
  /**
   * enabled automatic autofocusing on CC number
   */
  autoFocus?: boolean;
  /**
   * controls "frame embedding mitigation", required for PCI compliance
   * - if enabled(default) - prevents {children} to be rendered inside IFrames
   * - if disabled - then Application __has__ to provide another way(X-Frame-Options or CSP)
   * to prevent being iframed in production environment.
   * @default false
   */
  frameEmbeddingMitigation?: boolean;
  /**
   * reports on the state change
   * @param {'loading' | 'error' | 'complete' }state
   */
  onStateChange?(state: RequestState): void;
};

/**
 * Renders a CreditCard form
 * Has to be wrapped with {@link CreditCardFormState}
 * @test-id commerce-creditcard.{'loading' | 'error' | 'complete'}-state
 */
export const CreditCardForm = ({
  className,
  autoFocus,
  onStateChange,
  frameEmbeddingMitigation = true,
}: CreditCardFormProps) => {
  const state = useCreditCardState();
  const elementsReady = useElementsAreReady();
  const elementsFailed = useElementsDidFail();
  const isLoading = state === 'loading' || !elementsReady;
  const isError = state === 'error' || elementsFailed;

  const errorBoundaryEventDispatch = useErrorBoundaryEventDispatch();

  const didErrorRef = useRef(isError);
  didErrorRef.current = didErrorRef.current || isError;
  const { current: didError } = didErrorRef;

  useEffect(() => {
    if (didError) {
      // TODO: Get the real error
      errorBoundaryEventDispatch(
        new Error('An error was caught by the error boundary'),
      );
    }
  }, [errorBoundaryEventDispatch, didError]);

  // TODO: Better state composition
  const displayState = state === 'complete' && isLoading ? 'loading' : state;

  useEffect(() => {
    onStateChange && onStateChange(displayState);
  }, [displayState, onStateChange]);

  return (
    <FrameBreaker disabled={!frameEmbeddingMitigation}>
      <FormStartTimeRecorder />
      <FormSection data-testid={`commerce-creditcard.${displayState}-state`}>
        {didError ? (
          <ErrorCreditCard />
        ) : (
          <CreditCardFormBreadcrumb>
            <Form className={className} autoFocus={autoFocus} />
            <LoadingCreditCard visible={isLoading} />
          </CreditCardFormBreadcrumb>
        )}
      </FormSection>
    </FrameBreaker>
  );
};
