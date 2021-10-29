import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Select from '@atlaskit/select';

import { Template } from '../types';
import { getTemplates } from '../utils/getTemplates';

import { TemplateListWrapper } from './styled';

type Props = {
  onChange: (template: string) => void;
  code?: string;
};

const TemplateList: React.FC<Props> = ({ onChange, code }) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [templates, setTemplates] = useState<Template[]>([]);
  useEffect(() => {
    getTemplates().then((allTemplates: Template[]) => {
      setTemplates(allTemplates);
    });
  }, []);

  const onSelectChange = useCallback(
    (option: any) => {
      if (option) {
        onChange(option.value);
        // https://data-portal.us-east-1.prod.public.atl-paas.net/analytics/registry/28028
        createAnalyticsEvent({
          action: 'changed',
          actionSubject: 'configurationTemplate',
          attributes: { template: option.template.language },
        }).fire();
      }
    },
    [createAnalyticsEvent, onChange],
  );

  const createOption = useCallback((template: Template) => {
    return {
      label: template.name,
      value: template.yml,
      template,
    };
  }, []);

  const options = useMemo(() => templates.map(createOption), [
    templates,
    createOption,
  ]);

  return (
    <TemplateListWrapper>
      <p>
        The templates allow you to configure your pipeline using your preferred
        language. The template will override any configuration content.
      </p>
      {templates.length > 0 ? (
        <Select
          onChange={onSelectChange}
          options={options}
          defaultValue={options.find((option) => option.value === code)}
          position="bottom left"
          defaultOptions
        />
      ) : null}
    </TemplateListWrapper>
  );
};

export default React.memo(TemplateList);
