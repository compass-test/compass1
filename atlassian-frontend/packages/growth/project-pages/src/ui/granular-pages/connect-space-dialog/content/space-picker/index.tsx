import React, { useState, FunctionComponent } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import debounce from 'debounce-promise';
import { AsyncSelect, components, OptionProps } from '@atlaskit/select';
import { layers } from '@atlaskit/theme/constants';

import { IconWrapper } from './styled';
import { PageIcon, SpaceIcon } from '../../../common/styled';
import { ComponentWithAnalytics } from '../../../../../common/analytics/util';
import {
  CrossProductSearchSpaceResult,
  searchConfluencePages,
  searchConfluenceSpaces,
} from '../../../../../state/epics/requests';
import messages from '../../../../../view/connect-space-dialog/content/space-picker/messages';
import granularPagesMessages from './messages';
import { Props } from './types';
import { Container, Instructions } from './styled';
import { ConfluenceSearchResultWithLinks } from '../../../../../state/confluence/types';

type PageSearchResult = Pick<
  ConfluenceSearchResultWithLinks,
  'results' | '_links'
>;

type BaseOption = {
  label: string;
  value: {
    isPage: boolean;
    spaceKey: string;
    spaceName: string;
    spaceUrl: string;
  };
};

const Option: FunctionComponent<OptionProps<BaseOption>> = ({
  children,
  ...props
}) => (
  <components.Option {...props}>
    <IconWrapper>
      {props.value?.isPage ? (
        <PageIcon />
      ) : (
        <SpaceIcon iconPath={props.value?.iconPath} />
      )}
    </IconWrapper>
    {children}
  </components.Option>
);

const mapPageAndSpaceOptions = (
  spaceSearch: CrossProductSearchSpaceResult,
  pageSearch: PageSearchResult,
) => {
  const spaceOptions = spaceSearch?.scopes?.[0]?.results?.map(
    ({ title, space, baseUrl, url }) => ({
      label: title,
      value: {
        spaceKey: space?.key,
        spaceName: title,
        spaceUrl: `${baseUrl}${url}`,
        iconPath: `${baseUrl}${space?.icon?.path}`,
        isPage: false,
      },
    }),
  );

  const pageOptions = pageSearch?.results?.map(
    ({ title, space, id, _links }) => ({
      label: title,
      value: {
        spaceKey: space.key,
        spaceName: space.name,
        linkedPageId: id,
        linkedPageTitle: title,
        isPage: true,
        linkedPageUrl: `${pageSearch._links?.base}${_links?.webui}`,
      },
    }),
  );

  return [
    {
      label: 'Spaces',
      options: spaceOptions,
    },
    {
      label: 'Pages',
      options: pageOptions,
    },
  ];
};

const SPACES_MAX_RESULTS = 5;

const SpacePicker = ({
  intl: { formatMessage },
  onSelected,
  isDisconnectedTemplatesClick,
  isConnectingSpace,
  cloudId,
}: Props & InjectedIntlProps) => {
  const [defaultOptions, setDefaultOptions] = useState<Array<any> | Boolean>(
    true,
  );
  const [defaultOptionsAreLoaded, setDefaultOptionsAreLoaded] = useState<
    Boolean
  >(false);

  const fetchPageAndSpaceOptions = async (inputValue: string) => {
    const pageSearch: Pick<
      ConfluenceSearchResultWithLinks,
      'results' | '_links'
    > = await searchConfluencePages(inputValue);
    let spaceSearch: CrossProductSearchSpaceResult = await searchConfluenceSpaces(
      {
        cloudId,
        limit: SPACES_MAX_RESULTS, // Limit displayed spaces to give room for pages results
        searchString: inputValue,
      },
    );
    const options = mapPageAndSpaceOptions(spaceSearch, pageSearch);

    if (!defaultOptionsAreLoaded && !inputValue) {
      // Save initial results to return them when no input is passed
      setDefaultOptionsAreLoaded(true);
      setDefaultOptions(options);
    }

    return options;
  };

  const debouncedOptions = debounce(fetchPageAndSpaceOptions, 300);

  return (
    <Container>
      <Instructions>
        {isDisconnectedTemplatesClick
          ? formatMessage(messages['disconnected-templates-description'])
          : formatMessage(granularPagesMessages.description)}
      </Instructions>
      <AsyncSelect<BaseOption>
        // When AsyncSelect defaultOptions prop is set to `false`, `loadOptions` is called on render to populate defaultOptions.
        defaultOptions={defaultOptions}
        loadOptions={debouncedOptions}
        isSearchable
        placeholder={formatMessage(granularPagesMessages.placeholder)}
        isDisabled={isConnectingSpace}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: layers.modal() }),
          option: (base) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }),
        }}
        components={{ Option }}
        onChange={(result, { action }) => {
          if (result && action === 'select-option') {
            const { value } = result;
            onSelected(value);
          }
        }}
      />
    </Container>
  );
};

export default ComponentWithAnalytics('spacePicker', {
  onSelected: 'selected',
})(injectIntl(SpacePicker));
