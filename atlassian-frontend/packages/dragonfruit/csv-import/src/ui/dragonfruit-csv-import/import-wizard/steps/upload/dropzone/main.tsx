/** @jsx jsx */
import React, { ChangeEvent, useState } from 'react';

import { jsx } from '@emotion/core';

import Spreadsheet16Icon from '@atlaskit/icon-file-type/glyph/spreadsheet/16';
import Spreadsheet48Icon from '@atlaskit/icon-file-type/glyph/spreadsheet/48';
import Spinner from '@atlaskit/spinner';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import {
  DropzoneInner,
  DropzoneInnerText,
  SpinnerWrapper,
  StyledInput,
  Wrapper,
} from './styled';

type DropzoneProps = {
  onChange: (file: File | undefined) => void;
  disabled?: boolean;
};

export default React.forwardRef<HTMLInputElement, DropzoneProps>(
  function Dropzone(props, ref) {
    const { formatMessage } = useIntl();

    const [file, setFile] = useState<File | undefined>();

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
      const { files } = e.target;

      if (files && files.length) {
        const file = files[0]; // Only accept the first file
        setFile(file);
        props.onChange(file);
      }
    }

    return (
      <Wrapper>
        {!file && (
          <DropzoneInner>
            <Spreadsheet48Icon label="" />
            <DropzoneInnerText>
              {formatMessage(messages.innerText)}
            </DropzoneInnerText>
          </DropzoneInner>
        )}

        {file && (
          <DropzoneInner>
            <Spreadsheet48Icon label="" />
            <DropzoneInnerText>
              <Spreadsheet16Icon label="" /> {file.name}
            </DropzoneInnerText>
          </DropzoneInner>
        )}

        {props.disabled && (
          <SpinnerWrapper>
            <Spinner size="large" />
          </SpinnerWrapper>
        )}

        <StyledInput
          data-testid={'csv-import-input'}
          ref={ref as any}
          type="file"
          accept=".csv"
          title=""
          value=""
          onChange={handleOnChange}
          disabled={props.disabled}
        />
      </Wrapper>
    );
  },
);
