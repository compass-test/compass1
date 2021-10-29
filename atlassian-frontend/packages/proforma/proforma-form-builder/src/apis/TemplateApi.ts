import { TemplateForm } from '@atlassian/proforma-common-core/form-system-models';
import { Locale } from '@atlassian/proforma-translations';

export type LanguageCode =
  | 'en'
  | 'ar'
  | 'cs'
  | 'da'
  | 'de'
  | 'es'
  | 'et'
  | 'fi'
  | 'fr'
  | 'el'
  | 'hu'
  | 'is'
  | 'it'
  | 'ja'
  | 'ko'
  | 'nl'
  | 'no'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sv'
  | 'vi'
  | 'zh';

export interface TemplateMetadata {
  id: string;
  group: string | null;
  subGroup: string[];
  name: string;
  lang: LanguageCode | null;
  locale?: Locale;
  new?: boolean;
  description?: string; // hidden description used for search
  faIcon?: {
    faKey: string;
    fgColor?: string;
    bgColor?: string;
  };
  customIcon?: string; // URL for custom icon
}

export interface TemplatesIndex {
  templates: TemplateMetadata[];
  metadata: GlobalMetadata;
}

export interface GlobalMetadata {
  subGroups: {
    name: string;
    description: string;
  }[];
  featuredGroups?: string[];
}

export interface TemplateApi {
  getTemplatesList(): Promise<TemplatesIndex>;

  getTemplate(templateId: string): Promise<TemplateForm>;
}
