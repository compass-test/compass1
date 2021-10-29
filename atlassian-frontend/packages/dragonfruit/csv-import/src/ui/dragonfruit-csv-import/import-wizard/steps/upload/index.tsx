import React, { useState } from 'react';

import Papa from 'papaparse';

import Button from '@atlaskit/button';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  Description,
  Heading,
  MainWrapper,
} from '../../../../../common/ui/wizard/styled';
import { useCsvImportContext } from '../../../../../controllers/csv-import-controller';
import { InitialStep } from '../../../../../services/csv-import-reducer/types';

import { CsvDownloadLink } from './csv-download-link';
import { Dropzone } from './dropzone';
import messages from './messages';
import { DownloadLinkWrapper } from './styled';

type UploadStepProps = { state: InitialStep; devMode: boolean };

const exampleCsv = `
name,type,description
Component 1,SERVICE,My first component
Component 2,LIBRARY,My second component
Component 3,APPLICATION,My third component
`.trim();

// Exported for tests.
export const uploadStepTestId = 'dragonfruit-csv-import-upload-step';

export const UploadStep = ({ devMode }: UploadStepProps) => {
  const { formatMessage } = useIntl();

  const { importParsedCsv } = useCsvImportContext();

  const [isParsing, setIsParsing] = useState(false);

  function continueWithDummyData() {
    const parsedExampleData = Papa.parse(exampleCsv, {
      header: true,
    });

    importParsedCsv(parsedExampleData);
  }

  function handleFileChange(file: File | undefined) {
    if (!file) {
      return;
    }

    setIsParsing(true);

    // Start parsing in the next tick
    setTimeout(() => {
      Papa.parse(file, {
        header: true,
        complete: results => {
          setIsParsing(false);
          importParsedCsv(results);
        },
      });
    }, 0);
  }

  return (
    <MainWrapper data-testid={uploadStepTestId}>
      <Heading>{formatMessage(messages.heading)}</Heading>

      <Description>{formatMessage(messages.description)}</Description>

      <Dropzone onChange={handleFileChange} disabled={isParsing} />

      <DownloadLinkWrapper>
        <CsvDownloadLink
          csvContent={exampleCsv}
          filename="compass_example_import.csv"
        >
          {formatMessage(messages.downloadExampleCSV)}
        </CsvDownloadLink>
      </DownloadLinkWrapper>

      {devMode && (
        <div>
          <Button onClick={() => continueWithDummyData()}>
            Use dummy data
          </Button>
        </div>
      )}
    </MainWrapper>
  );
};
