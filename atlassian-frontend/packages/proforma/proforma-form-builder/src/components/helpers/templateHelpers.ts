import Fuse from 'fuse.js';

import {
  DEFAULT_LOCALE,
  Locale,
  toLanguageTag,
} from '@atlassian/proforma-translations';

import { GlobalMetadata, TemplateMetadata } from '../../apis/TemplateApi';

export interface TemplateGroup {
  name: string;
  numForms: number;
}

function flatten(a: any[]): string[] {
  return [].concat.apply([], a);
}

function extractLocale(template: TemplateMetadata): Locale | undefined {
  if (template.locale) {
    return template.locale;
  }
  switch (template.lang) {
    case 'en':
      return Locale.en_US;
    case 'ja':
      return Locale.ja_JP;
  }
  return undefined;
}

export function filterForms(
  forms: TemplateMetadata[],
  localeOpt?: Locale,
  group?: string,
  searchText?: string,
): {
  formsFilteredByLocale: TemplateMetadata[];
  filteredForms: TemplateMetadata[];
} {
  let filteredForms = forms;
  let formsFilteredByLocale = forms;

  if (localeOpt) {
    filteredForms = formsFilteredByLocale = forms.filter(form => {
      const formLocale = extractLocale(form);
      return (
        (!formLocale && localeOpt === DEFAULT_LOCALE) ||
        (formLocale && localeOpt === formLocale)
      );
    });
  }

  if (group) {
    filteredForms = filteredForms.filter(form => form.group === group);
  }

  if (searchText) {
    const fuse = new Fuse(filteredForms, {
      keys: ['name', 'description'],
      threshold: 0.2,
      ignoreLocation: true,
    });

    filteredForms = fuse.search(searchText);
  }

  // Sort forms taking into account different locales
  const locale = localeOpt || DEFAULT_LOCALE;
  filteredForms = filteredForms.sort((a, b) =>
    new Intl.Collator(toLanguageTag(locale)).compare(a.name, b.name),
  );

  return { formsFilteredByLocale, filteredForms };
}

export interface GroupedFormsIndex {
  subGroup: string;
  items: TemplateMetadata[];
  description?: string;
}

export function groupFormsBySubGroup(
  forms: TemplateMetadata[],
  subGroups: string[],
  subGroupMeta: GlobalMetadata['subGroups'],
  localeOpt?: Locale,
): GroupedFormsIndex[] {
  // Create subgroups
  const groupedForms = subGroups.map(
    subGroup => ({ subGroup, items: [] } as GroupedFormsIndex),
  );

  const otherGroup: GroupedFormsIndex = {
    subGroup: 'other',
    items: [],
  };

  forms.forEach(form => {
    if (form.subGroup.length > 0) {
      form.subGroup.forEach(subGroup => {
        const groupIndex = groupedForms.findIndex(
          group => group.subGroup === subGroup,
        );
        if (groupIndex >= 0) {
          const duplicate = groupedForms[groupIndex].items.find(
            groupedForm => groupedForm.name === form.name,
          );
          if (!duplicate) {
            groupedForms[groupIndex].items.push(form);
          }
        }
        if (subGroup === null) {
          otherGroup.items.push(form);
        }
      });
    } else {
      otherGroup.items.push(form);
    }
  });

  if (otherGroup.items.length > 0) {
    groupedForms.push(otherGroup);
  }

  // Sort alphabetically
  const locale = localeOpt || DEFAULT_LOCALE;
  groupedForms.sort((a, b) =>
    new Intl.Collator(toLanguageTag(locale)).compare(a.subGroup, b.subGroup),
  );

  // Add meta info
  subGroupMeta.forEach(metaInfo => {
    const groupedFormIndex = groupedForms.findIndex(
      group => group.subGroup === metaInfo.name,
    );
    if (groupedFormIndex !== -1) {
      groupedForms[groupedFormIndex].description = metaInfo.description;
    }
  });

  return groupedForms;
}

export function extractTemplateGroups(
  fullFormsList: TemplateMetadata[],
  formsFilteredByLocale: TemplateMetadata[],
  filteredForms: TemplateMetadata[],
  localeOpt?: Locale,
): {
  locales: Locale[];
  groups: TemplateGroup[];
  subGroups: string[];
} {
  const locales = Array.from(
    new Set(
      fullFormsList
        .filter(form => !!extractLocale(form))
        .map(form => extractLocale(form)!),
    ),
  );
  // If there is at least one locale, then ensure the default locale is included
  if (locales.length > 0 && !locales.includes(DEFAULT_LOCALE)) {
    locales.unshift(DEFAULT_LOCALE);
  }

  // Remove duplicate forms when doing the count for the ALL group
  const noDuplicates = formsFilteredByLocale.filter((form, index, self) => {
    const duplicateIndex = self.findIndex(f => f.name === form.name);
    return !(duplicateIndex !== -1 && duplicateIndex !== index);
  });
  const allGroup = {
    name: 'All',
    numForms: noDuplicates.length,
  };

  // Get number of forms per group
  const uniqueGroupNames = Array.from(
    new Set(
      formsFilteredByLocale
        .filter(formIndex => !!formIndex.group)
        .map(formIndex => formIndex.group!),
    ),
  );
  const groups = uniqueGroupNames.map(group => ({
    name: group,
    numForms: formsFilteredByLocale.filter(form => form.group === group).length,
  }));

  // Sort the groups alphabetically
  const locale = localeOpt || DEFAULT_LOCALE;
  groups.sort((a, b) =>
    new Intl.Collator(toLanguageTag(locale)).compare(a.name, b.name),
  );

  // Prepend the ALL group so that it is always first
  groups.unshift(allGroup);

  const subGroups = Array.from(
    new Set(flatten(filteredForms.map(form => form.subGroup))),
  ).filter(subGroup => !!subGroup);

  return { locales, groups, subGroups };
}
