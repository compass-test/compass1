import React, { useState } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
import { MenuGroup } from '@atlaskit/menu';
import Select from '@atlaskit/select';
import Textfield from '@atlaskit/textfield';
import { N300 } from '@atlaskit/theme/colors';
import {
  SelectOption,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { usePfAnalyticsUtils } from '@atlassian/proforma-common-core/jira-common-context';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';
import {
  DEFAULT_LOCALE,
  Locale,
  localeNamesMap,
  parseLanguageTag,
} from '@atlassian/proforma-translations';

import { GlobalMetadata, TemplateMetadata } from '../../../apis/TemplateApi';
import {
  extractTemplateGroups,
  filterForms,
  groupFormsBySubGroup,
} from '../../helpers/templateHelpers';
import { SideBarSelectStyles } from '../styles';

import { TemplateGroupPicker } from './TemplateGroupPicker';
import { TemplatePreview } from './TemplatePreview';
import { TemplateSidebarEntry } from './TemplateSidebarEntry';
import {
  IntlTemplateSidebarMessages,
  TemplateSidebarMessage,
} from './TemplateSidebarMessages.intl';

interface TemplateSidebarProps {
  templates: TemplateMetadata[];
  subGroupMeta: GlobalMetadata['subGroups'];
  featured?: GlobalMetadata['featuredGroups'];
  insertTemplate: (templateForm: TemplateForm) => void;
}

export const TemplatesSidebar = injectIntl(
  ({
    templates,
    subGroupMeta,
    featured,
    insertTemplate,
    intl,
  }: TemplateSidebarProps & InjectedIntlProps) => {
    const analyticsUtils = usePfAnalyticsUtils();

    const [locale, setLocale] = useState<Locale>(parseLanguageTag(intl.locale));
    const [group, setGroup] = useState<string | undefined>();
    const [searchText, setSearchText] = useState<string | undefined>();

    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [currentTemplateId, setCurrentTemplateId] = useState<
      string | undefined
    >();

    const { formsFilteredByLocale, filteredForms } = filterForms(
      templates,
      locale,
      group,
      searchText,
    );
    const { locales, groups, subGroups } = extractTemplateGroups(
      templates,
      formsFilteredByLocale,
      filteredForms,
    );
    const displayForms = groupFormsBySubGroup(
      filteredForms,
      subGroups,
      subGroupMeta,
      locale,
    );

    const localeChoices: SelectOption<Locale>[] = locales.map(locale => {
      const localeName = localeNamesMap.get(locale);
      if (!localeName) {
        // eslint-disable-next-line no-console
        console.error(
          'Locale does not have a name in `localeNamesMap`.',
          locale,
        );
      }
      return {
        label: localeName || '',
        value: locale,
      };
    });
    const selectedLocaleChoice = localeChoices.find(
      option => option.value === locale,
    );
    if (locales.length > 0 && !selectedLocaleChoice) {
      setLocale(DEFAULT_LOCALE);
    }

    const handleUpdateLocale = (choice: any) => {
      setLocale(choice.value);
      setGroup(undefined);
      analyticsUtils.track(AnalyticsEventName.BuilderFilterTemplates, {
        templateLanguage: choice.value,
      });
    };

    const handleUpdateGroup = (newGroup: string) => {
      if (newGroup === 'All') {
        setGroup(undefined);
      } else {
        setGroup(newGroup);
        analyticsUtils.track(AnalyticsEventName.BuilderFilterTemplates, {
          templateCategory: newGroup,
        });
      }
    };

    const handlePreviewTemplate = (templateId: string) => {
      setCurrentTemplateId(templateId);
      setShowPreview(true);
      analyticsUtils.track(AnalyticsEventName.BuilderPreviewTemplate, {
        templateLanguage: locale,
        templateCategory: group,
        templateId,
      });
    };

    const handleInsertTemplate = (templateForm: TemplateForm) => {
      insertTemplate(templateForm);
      setShowPreview(false);
      analyticsUtils.track(AnalyticsEventName.BuilderInsertTemplate, {
        templateLanguage: locale,
        templateCategory: group,
        templateId: currentTemplateId,
      });
    };

    return (
      <Wrapper>
        <LocaleHeader>
          <FormattedMessage
            {...IntlTemplateSidebarMessages[TemplateSidebarMessage.Language]}
          />
        </LocaleHeader>
        <Select
          options={localeChoices}
          value={selectedLocaleChoice}
          onChange={handleUpdateLocale}
          styles={SideBarSelectStyles}
        />

        <GroupPickerWrapper>
          <TemplateGroupPicker
            groups={groups}
            selectedGroup={group || 'All'}
            updateGroup={handleUpdateGroup}
            featured={featured}
          />
        </GroupPickerWrapper>

        <Textfield
          placeholder={intl.formatMessage(
            IntlTemplateSidebarMessages[TemplateSidebarMessage.SearchTemplates],
          )}
          isCompact
          elemBeforeInput={<EditorSearchIcon label="search icon" />}
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
        />

        <TemplateListWrapper>
          <MenuGroup>
            {displayForms.map(entry => (
              <TemplateSidebarEntry
                subGroup={entry}
                onClick={handlePreviewTemplate}
              />
            ))}
          </MenuGroup>
        </TemplateListWrapper>
        {showPreview && currentTemplateId && (
          <TemplatePreview
            onClose={() => setShowPreview(false)}
            templateId={currentTemplateId}
            insertTemplate={handleInsertTemplate}
          />
        )}
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  display: block;
  width: 100%;
`;

const TemplateListWrapper = styled.div`
  margin-top: 10px;
`;

const LocaleHeader = styled.h6`
  color: ${N300};
  margin-top: 10px !important;
`;

const GroupPickerWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
