import React, { useState, FunctionComponent } from 'react';
import AkFeedbackCollector, {
  FeedbackFlag,
} from '@atlaskit/feedback-collector';
import { FlagGroup } from '@atlaskit/flag';
import { useABTest } from '../ab-test-provider';
import { useUser } from '../user-context';
import { useActiveProduct, usePrimaryProduct } from '../product-context';
import { FeedbackButton } from './feedback-button';
import { BUILD_VERSION } from '../../buildVersion';

const EMBEDDABLE_KEY = '85dc6027-c074-4800-ba54-4ecb844b29f8';
const REQUEST_TYPE_ID = '182';
const FEEDBACK_CONTEXT_CF = 'customfield_10047';

const FeedbackCollector: FunctionComponent = () => {
  const { name, email } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [displayFlag, setDisplayFlag] = useState(false);
  const abTest = useABTest();
  const product = useActiveProduct().toLowerCase();
  const primaryProduct = usePrimaryProduct()?.toLowerCase();
  const feedbackContext = `experimentId: ${abTest.experimentId}, abTestId: ${abTest.abTestId}, frontendVersion: ${BUILD_VERSION}, product: ${product}, primaryProduct: ${primaryProduct}`;

  return (
    <>
      <FeedbackButton
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      />
      {isOpen ? (
        <AkFeedbackCollector
          onClose={() => setIsOpen(false)}
          onSubmit={() => setDisplayFlag(true)}
          email={email}
          name={name}
          requestTypeId={REQUEST_TYPE_ID}
          embeddableKey={EMBEDDABLE_KEY}
          additionalFields={[
            {
              id: FEEDBACK_CONTEXT_CF,
              value: feedbackContext,
            },
          ]}
        />
      ) : null}
      {displayFlag && (
        <FlagGroup onDismissed={() => setDisplayFlag(false)}>
          <FeedbackFlag />
        </FlagGroup>
      )}
    </>
  );
};

export default FeedbackCollector;
