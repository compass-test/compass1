import React from 'react';

type CsvDownloadLinkProps = {
  filename: string;
  csvContent: string;
};

export const CsvDownloadLink: React.FC<CsvDownloadLinkProps> = ({
  filename,
  csvContent,
  children,
}) => {
  // From: https://stackoverflow.com/a/14966131/311792
  const url = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
  return (
    <a href={url} download={filename}>
      {children}
    </a>
  );
};
