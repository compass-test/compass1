import { IntlProvider } from 'react-intl';

export type MessageFile = {
  default: Record<string, string>;
};

export type FetchLanguageFile = (locale: string) => Promise<MessageFile>;

export interface CustomIntlProviderProps extends IntlProvider.Props {
  children: React.ReactNode;
  fetchLanguageFile: FetchLanguageFile;
}
