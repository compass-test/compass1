import React, { useEffect } from 'react';

import Globalize from 'globalize';
import {
  addLocaleData,
  InjectedIntl,
  injectIntl,
  IntlProvider,
} from 'react-intl';

import { DefaultExtensionProvider } from '@atlaskit/editor-common/extensions';
import { Editor, EditorActions } from '@atlaskit/editor-core';
import Select from '@atlaskit/select';
import { referentialityPlugin } from '@atlassian/editor-referentiality';

import { ExampleTable } from '../example-helpers/example-table';
import languages from '../src/i18n/languages';
import { buildManifest } from '../src/manifest';

const parseNumber = (locale: string) => (num: string) => {
  // although we can pass { percentage } format
  // but it doesn't recognise decimal percentages
  // console.log('parsing', num, 'as locale', locale);

  let res = (Globalize as any)('en').parseNumber(num);
  if (!Number.isNaN(res)) {
    return res;
  }

  // try locale dependent
  res = (Globalize as any)(locale).parseNumber(num);
  if (!Number.isNaN(res)) {
    return res;
  }

  if (num.endsWith('%')) {
    return Number(num.slice(0, -1));
  }

  return null;
};

export const extensionProvider = (
  intl: InjectedIntl,
  editorActions?: EditorActions,
) => {
  const manifest = buildManifest(intl, editorActions, parseNumber(intl.locale));

  if (manifest?.modules?.nodes?.default) {
    (manifest as any).modules.nodes.default.__hideFrame = true;
  }
  return new DefaultExtensionProvider([manifest]);
};

type EditorProps = {
  languagePicker: React.ReactElement;
};

const EditorWithIntl = injectIntl<EditorProps>(({ intl, languagePicker }) => (
  <Editor
    appearance="full-page"
    allowTables={{
      advanced: true,
      allowColumnSorting: true,
      stickyHeaders: true,
      tableCellOptimization: true,
      allowColumnResizing: true,
    }}
    allowExtension={{
      allowAutoSave: true,
      allowExtendFloatingToolbars: true,
    }}
    dangerouslyAppendPlugins={{
      __plugins: [referentialityPlugin()],
    }}
    extensionProviders={(editorActions) => [
      extensionProvider(intl, editorActions),
    ]}
    allowExpand={{
      allowInsertion: true,
    }}
    allowLayouts
    defaultValue={{
      version: 1,
      type: 'doc',
      content: [ExampleTable],
    }}
    primaryToolbarComponents={[languagePicker]}
  />
));

const EditorExample = () => {
  const languageOptions = Object.keys(languages).map((langCode) => ({
    value: langCode,
    label: languages[langCode as keyof typeof languages],
  }));

  const [locale, setLocale] = React.useState('en');

  useEffect(() => {
    Globalize.load(require('cldr-core/supplemental/likelySubtags.json'));
  });

  useEffect(() => {
    try {
      // eslint-disable-next-line import/dynamic-import-chunkname
      const localeData = import(`react-intl/locale-data/${locale}`);
      localeData.then((resolvedImport) =>
        addLocaleData(resolvedImport.default),
      );
    } catch (ex) {
      console.warn(ex);
    }
  }, [locale]);

  useEffect(() => {
    try {
      // eslint-disable-next-line import/dynamic-import-chunkname
      const messages = import(`../src/i18n/${locale}`);
      messages.then((resolvedMessages) =>
        setMessages(resolvedMessages.default),
      );
    } catch (ex) {
      setMessages({});
    }

    Globalize.load(require(`cldr-numbers-modern/main/${locale}/numbers.json`));
  }, [locale]);

  const [messages, setMessages] = React.useState({});

  const languagePicker = (
    <div style={{ width: 250 }}>
      <Select
        options={languageOptions}
        defaultValue={languageOptions.find((opt) => opt.value === locale)}
        onChange={async (value) => {
          if (!value) {
            return;
          }

          const locale = value.value;
          setLocale(locale);
        }}
      ></Select>
    </div>
  );

  return (
    <IntlProvider locale={locale} messages={messages}>
      <EditorWithIntl languagePicker={languagePicker} />
    </IntlProvider>
  );
};

export default () => <EditorExample />;
