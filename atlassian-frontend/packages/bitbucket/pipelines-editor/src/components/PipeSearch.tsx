import React from 'react';

import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import SearchIcon from '@atlaskit/icon/glyph/search';
import Textfield from '@atlaskit/textfield';

import { PipeSearchIcon, PipeSearchWrapper } from './styled';

type Props = {
  value: string;
  placeholder?: string;
  onChange: (evt: any) => void;
  onClear: () => void;
};

const PipeSearch: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
  onClear,
}) => {
  return (
    <PipeSearchWrapper>
      <form onSubmit={(evt) => evt.preventDefault()}>
        <Textfield
          appearance="standard"
          isCompact
          type="text"
          placeholder={placeholder || 'Search'}
          value={value}
          onChange={onChange}
          elemAfterInput={
            <PipeSearchIcon>
              {value ? (
                <Button
                  onClick={onClear}
                  iconBefore={<CrossIcon label="close" size="medium" />}
                  spacing="none"
                  appearance="subtle"
                />
              ) : (
                <SearchIcon label="search" size="medium" />
              )}
            </PipeSearchIcon>
          }
        />
      </form>
    </PipeSearchWrapper>
  );
};

export default React.memo(PipeSearch);
