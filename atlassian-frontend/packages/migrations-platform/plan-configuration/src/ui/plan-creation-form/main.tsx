import React from 'react';

import { PlanNameValidation, ProductMeta } from '../../common/types';

import CloudSiteField from './cloud-site-field-select';
import { CloudSite } from './cloud-site-field-select/types';
import PlanNameField from './plan-name-field';
import { FieldContainer, Form, Legend } from './styled';

export type Props = {
  productMeta: ProductMeta;
  planName: string;
  planNameValidation: PlanNameValidation;
  plansUrl: string;
  cloudSite?: CloudSite;
  cloudSiteOptions: CloudSite[];
  isCloudSiteLoading: boolean;
  onCloudSiteChange: (cloudSite?: CloudSite) => void;
  onPlanNameChange: (planName: string) => void;
  getMigrationGatewayUrl: () => Promise<string>;
  getCloudTrialUrl: () => Promise<string>;
};

const PlanCreationForm = ({
  productMeta,
  planName,
  planNameValidation,
  plansUrl,
  cloudSiteOptions,
  cloudSite,
  isCloudSiteLoading,
  onCloudSiteChange,
  onPlanNameChange,
  getMigrationGatewayUrl,
  getCloudTrialUrl,
}: Props) => (
  <>
    <Legend>
      Name your migration and sign in to your Atlassian cloud site that you{"'"}
      re migrating to. If you don{"'"}t have a site yet, choose{' '}
      <strong>{`Get ${productMeta.productName} Cloud trial`}</strong>.
    </Legend>
    <Form>
      <FieldContainer>
        <PlanNameField
          value={planName}
          validation={planNameValidation}
          isRequired
          onChange={onPlanNameChange}
        />
      </FieldContainer>
      <FieldContainer>
        <CloudSiteField
          options={cloudSiteOptions}
          defaultOption={cloudSite}
          onChange={onCloudSiteChange}
          isLoading={isCloudSiteLoading}
          productMeta={productMeta}
          plansUrl={plansUrl}
          isRequired
          getMigrationGatewayUrl={getMigrationGatewayUrl}
          getCloudTrialUrl={getCloudTrialUrl}
        />
      </FieldContainer>
    </Form>
  </>
);

export default PlanCreationForm;
