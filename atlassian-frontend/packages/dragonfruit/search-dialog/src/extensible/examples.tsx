import React, { FunctionComponent, useState } from 'react';
import { SearchDialog } from '@atlassian/search-dialog';
import { IntlProvider } from 'react-intl';
import { useDialogExpansionContext } from './dialog-expansion-context';
import ActiveProductSearchInput, {
  ChildrenProps as InputChildrenProps,
} from './active-product-search-input/active-product-search-input';
import { ProductSearchInput } from '../common/product-search-input';
import { AsyncProduct, ProductTabs } from './product-router';
import { SearchSessionProvider } from '../common/search-session-provider';
import { KeyboardWrapper } from './focus-and-keyboard-wrapper/focus-and-keyboard-wrapper';
import { mergeRefCallback } from '../utils/merge-ref-callback';
import { MetaContextProvider } from './meta-context-provider';

const Example: FunctionComponent<{
  forwardRef: React.Ref<HTMLInputElement>;
}> = ({ forwardRef }) => {
  const { isExpanded, setIsExpanded } = useDialogExpansionContext();

  return (
    <SearchSessionProvider sessionKey="abc123">
      <KeyboardWrapper
        isExpanded={isExpanded}
        onClose={() => {
          setIsExpanded(false);
        }}
      >
        {(setRef) => {
          const ref = mergeRefCallback(setRef, forwardRef);
          return (
            <>
              <ActiveProductSearchInput forwardRef={ref}>
                {({
                  activeProductId,
                  query: value,
                  setQuery: setValue,
                  forwardRef,
                  onOpen,
                }: InputChildrenProps) => {
                  const commonProps = {
                    onInput: setValue,
                    isLoading: false,
                    debounceTime: 250,
                    onNavigate: () => {},
                    forwardRef,
                    value,
                    isExpanded,
                    onOpen,
                  };

                  switch (activeProductId) {
                    case 'confluence':
                      return (
                        <ProductSearchInput
                          {...commonProps}
                          advancedSearchURL={'advanced/search/url'}
                          actionSubjectId={'confluence'}
                          expandedPlaceholder={'Search Connie'}
                          collapsedPlaceholder={'Confluence'}
                        />
                      );
                    case 'jira':
                      return (
                        <ProductSearchInput
                          {...commonProps}
                          advancedSearchURL={'advanced/search/url'}
                          actionSubjectId={'jira'}
                          expandedPlaceholder={'Search Jira'}
                          collapsedPlaceholder={'Jira'}
                        />
                      );
                    default:
                      return (
                        <ProductSearchInput
                          {...commonProps}
                          advancedSearchURL={'advanced/search/url'}
                          actionSubjectId={'generic-product'}
                          expandedPlaceholder={'Search in the dynamic product'}
                          collapsedPlaceholder={'Search'}
                        />
                      );
                  }
                }}
              </ActiveProductSearchInput>
              <SearchDialog>
                <ProductTabs />
                <AsyncProduct
                  id="confluence"
                  title="conflugoo"
                  sections={[
                    {
                      id: 'confluence.page,blogpost,attachment',
                      title: 'Confluence pages',
                    },
                  ]}
                >
                  <div>Confluencie</div>
                </AsyncProduct>
                <AsyncProduct
                  id="jira"
                  title="jyra"
                  sections={[{ id: 'jira.issue', title: 'Jira Issue' }]}
                >
                  <div>gyra</div>
                </AsyncProduct>
                <AsyncProduct
                  id="bitbucket"
                  title="buttbucket"
                  sections={[
                    {
                      id: 'bitbucket.repository',
                      title: 'Bitbucket Repository',
                    },
                  ]}
                >
                  <div>boitbuckle</div>
                </AsyncProduct>
              </SearchDialog>
            </>
          );
        }}
      </KeyboardWrapper>
    </SearchSessionProvider>
  );
};

export const Basic = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div style={{ paddingLeft: '800px' }}>
      <MetaContextProvider
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      >
        <Example forwardRef={null} />
      </MetaContextProvider>
    </div>
  );
};

export default {
  title: 'Extensible/Full example',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">{story()}</IntlProvider>
    ),
  ],
};
