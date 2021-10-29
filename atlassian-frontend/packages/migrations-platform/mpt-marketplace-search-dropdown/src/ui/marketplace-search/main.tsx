import React, { FC, useCallback, useEffect } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import SearchIcon from '@atlaskit/icon/glyph/search';
import Select, { SelectProps } from '@atlaskit/select';
import { N500 } from '@atlaskit/theme/colors';

import type { App, CloudProduct } from '../../common/types';
import useSearchApps from '../../controllers/use-search-apps';
import useSelectApp from '../../controllers/use-select-app';

import messages from './messages';
import * as S from './styled';

export type Props = {
  cloudProduct: CloudProduct;
  selectedAppKey?: string;
  onSelectApp: (app: App | null) => void;
  onLoadApp?: (app: App | null) => void;
};

type RequiredSelectProps = Required<SelectProps<App>>;

const formatOptionLabel: RequiredSelectProps['formatOptionLabel'] = ({
  name,
  logoUrl,
}) => {
  return (
    <S.Wrapper>
      <S.Icon style={{ backgroundImage: `url(${logoUrl})` }} />
      <S.Label>{name}</S.Label>
    </S.Wrapper>
  );
};

const getOptionValue: RequiredSelectProps['getOptionValue'] = ({ key }) => {
  return key;
};

const MarketplaceSearch: FC<Props & InjectedIntlProps> = ({
  intl,
  cloudProduct,
  selectedAppKey,
  onSelectApp,
  onLoadApp,
}) => {
  const [selectLoading, app, selectApp] = useSelectApp(selectedAppKey);
  const [searchLoading, apps, searchApps] = useSearchApps(cloudProduct);

  // Dispatch app data when app is changed
  useEffect(() => {
    if (app && onLoadApp) {
      onLoadApp(app);
    }
  }, [app, onLoadApp]);

  const onChange = useCallback<RequiredSelectProps['onChange']>(
    (value, { action }) => {
      if (action === 'select-option') {
        // TS doesn't play nice when you try to refine the ValueType
        const marketApp = value as App;

        selectApp(marketApp);
        onSelectApp(marketApp);
      } else if (action === 'clear') {
        selectApp(null);
        onSelectApp(null);
      }
    },
    [selectApp, onSelectApp],
  );
  const onInputChange = useCallback<RequiredSelectProps['onInputChange']>(
    (newValue, { action }) => {
      if (action === 'input-change') {
        searchApps(newValue);
      }
    },
    [searchApps],
  );

  return (
    <Select
      isClearable
      isDisabled={selectLoading}
      isLoading={searchLoading}
      components={{
        DropdownIndicator: () => {
          return (
            <SearchIcon
              label={intl.formatMessage(messages.selectAlternativeApps)}
              primaryColor={N500}
              size="small"
            />
          );
        },
      }}
      value={app}
      options={apps}
      formatOptionLabel={formatOptionLabel}
      getOptionValue={getOptionValue}
      noOptionsMessage={() => {
        return intl.formatMessage(messages.noAppsFound);
      }}
      placeholder={intl.formatMessage(messages.selectAlternativeApps)}
      onChange={onChange}
      onInputChange={onInputChange}
    />
  );
};

export default injectIntl(MarketplaceSearch);
