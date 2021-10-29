import React from 'react';
import FeedbackCollector from './feedback-collector';
import { ABTestProvider, DEFAULT_AB_TEST } from '../ab-test-provider';
import { SharedClient } from '../clients';
import { UserProvider } from '../user-context';
import { Products, ProductProvider } from '../product-context';

const MockSharedClient: SharedClient = {
  getAbTestData: () => Promise.resolve(DEFAULT_AB_TEST),
  getProductPermissions: async () => [],
};

export const Basic = () => <FeedbackCollector />;

export default {
  title: 'Confluence Search Dialog/Feedback Collector',
  decorators: [
    (story: () => React.ElementType) => (
      <ABTestProvider searchClient={MockSharedClient}>
        <ProductProvider products={[Products.confluence]}>
          <UserProvider
            name="test_user_feedback_collector_story"
            email="storybook_test_email@atlassian.com"
          >
            {story()}
          </UserProvider>
        </ProductProvider>
      </ABTestProvider>
    ),
  ],
};
